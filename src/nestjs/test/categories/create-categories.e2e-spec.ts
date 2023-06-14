import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { CategoryRepository } from '@fc/micro-videos/src/category/domain';
import { CATEGORIES_PROVIDER } from '../../src/categories/categories.provider';
import {
  CategoryFixture,
  CreateCategoryFixture,
} from '../../src/categories/fixtures/index';
import { CategoriesController } from '../../src/categories/categories.controller';
import { startApp } from '../../src/@share/testing/helpers';

describe('CategoriesController (e2e)', () => {
  let categoryRepository: CategoryRepository.Repository;

  describe('/categories (POST)', () => {
    describe('should a response error with 442 request body is invalid', () => {
      const app = startApp();
      const invalidRequest = CategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('when body is $key', async ({ value }) => {
        const response = await request(app.app.getHttpServer())
          .post('/categories')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should a response error with 442 when throw EntityValidationError', () => {
      const app = startApp({
        beforeInit: (app) => {
          app['config'].globalPipes = [];
        },
      });
      const validationError =
        CreateCategoryFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(validationError).map((key) => ({
        label: key,
        value: validationError[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .post('/categories')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should create a category', () => {
      const app = startApp();
      const arrange = CategoryFixture.arrangeForSave();

      beforeEach(async () => {
        categoryRepository = app.app.get<CategoryRepository.Repository>(
          CATEGORIES_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
      });

      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const response = await request(app.app.getHttpServer())
            .post('/categories')
            .send(send_data)
            .expect(201);
          const keyInResponse = CategoryFixture.keysInResponse();
          expect(Object.keys(response.body)).toStrictEqual(['data']);
          expect(Object.keys(response.body.data)).toStrictEqual(keyInResponse);

          const id = response.body.data.id;
          const categoryCreated = await categoryRepository.findById(id);
          const presenter = CategoriesController.categoryToResponse(
            categoryCreated.toJSON(),
          );
          const serialized = instanceToPlain(presenter);
          expect(response.body.data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            ...send_data,
            ...expected,
          });
        },
      );
    });
  });
});
