import { NotFoundError } from '@fc/micro-videos/src/@seedwork/domain';
import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  ListCategoriesUseCase,
  GetCategoryUseCase,
  DeleteCategoryUseCase,
} from '@fc/micro-videos/src/category/application';
import {
  Category,
  CategoryRepository,
} from '@fc/micro-videos/src/category/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../../config/config.module';
import { DatabaseModule } from '../../../database/database.module';
import { CategoriesController } from '../../categories.controller';
import { CategoriesModule } from '../../categories.module';
import { CATEGORIES_PROVIDER } from '../../categories.provider';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from '../../presenters/category.presenter';
import { CategoryFixture, ListCategoriesFixture } from '../../fixtures/index';

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;
  let repository: CategoryRepository.Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(
      CATEGORIES_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(
      CreateCategoryUseCase.UseCase,
    );
    expect(controller['updateUseCase']).toBeInstanceOf(
      UpdateCategoryUseCase.UseCase,
    );
    expect(controller['listUseCase']).toBeInstanceOf(
      ListCategoriesUseCase.UseCase,
    );
    expect(controller['getUseCase']).toBeInstanceOf(GetCategoryUseCase.UseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(
      DeleteCategoryUseCase.UseCase,
    );
  });

  describe('should create a category', () => {
    const arrange = CategoryFixture.arrangeForSave();

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.create(send_data);
        const entity = await repository.findById(presenter.id);

        expect(entity.toJSON()).toStrictEqual({
          id: presenter.id,
          created_at: presenter.created_at,
          ...send_data,
          ...expected,
        });

        expect(presenter).toEqual(new CategoryPresenter(entity));
      },
    );
  });

  describe('should updated a category', () => {
    const category = Category.fake().aCategory().build();

    beforeEach(async () => {
      await repository.insert(category);
    });

    const arrange = CategoryFixture.arrangeForSave();
    test.each(arrange)(
      'with request $request',
      async ({ send_data, expected }) => {
        const presenter = await controller.update(category.id, send_data);
        const entity = await repository.findById(presenter.id);

        expect(entity.toJSON()).toStrictEqual({
          id: presenter.id,
          created_at: presenter.created_at,
          ...expected,
          ...send_data,
        });

        expect(presenter).toEqual(new CategoryPresenter(entity));
      },
    );
  });

  it('should delete a category', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    const response = await controller.remove(category.id);
    expect(response).not.toBeDefined();
    await expect(repository.findById(category.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${category.id}`),
    );
  });

  it('should get a category', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    const presenter = await controller.findOne(category.id);

    expect(presenter.id).toBe(category.id);
    expect(presenter.name).toBe(category.name);
    expect(presenter.description).toBe(category.description);
    expect(presenter.is_active).toBe(category.is_active);
    expect(presenter.created_at).toStrictEqual(category.created_at);
  });

  describe('search method', () => {
    describe('should returns categories using query empty ordered by created_at', () => {
      const { entitiesMap, arrange } =
        ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(
            new CategoryCollectionPresenter({
              items: entities,
              ...paginationProps.meta,
            }),
          );
        },
      );
    });

    describe('should returns ouput using pagination, sort and filter', () => {
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(
            new CategoryCollectionPresenter({
              items: entities,
              ...paginationProps.meta,
            }),
          );
        },
      );
    });
  });
});

// Arquitetura em camadas

// Portas de entrada ----
// use cases
// coração do software
// infraestrutura

//Test Data Builders - Build Design Pattern
