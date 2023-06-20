import request from 'supertest';
import { CategoryRepository } from '@fc/micro-videos/src/category/domain';
import { startApp } from '../../src/@share/testing/helpers';
import { CATEGORIES_PROVIDER } from '../../src/categories/categories.provider';
import { ListCategoriesFixture } from '../../src/categories/fixtures';
import { instanceToPlain } from 'class-transformer';
import { CategoriesController } from '../../src/categories/categories.controller';

describe('CategoriesController (e2e)', () => {
  describe('/categories (GET)', () => {
    describe('should return categories sorted by created_at when request query is empty', () => {
      let categoryRepo: CategoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
          CATEGORIES_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(CategoriesController.categoryToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    describe('should return categories using paginate, filter and sort', () => {
      let categoryRepo: CategoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

      beforeEach(async () => {
        categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
          CATEGORIES_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each([arrange[0]])(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(CategoriesController.categoryToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });
  });
});
