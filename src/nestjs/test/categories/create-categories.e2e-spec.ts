import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { CategoryRepository } from '@fc/micro-videos/src/category/domain';
import { CATEGORIES_PROVIDER } from '../../src/categories/categories.provider';
import request from 'supertest';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  let categoryRepository: CategoryRepository.Repository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    categoryRepository = moduleFixture.get<CategoryRepository.Repository>(
      CATEGORIES_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST/categories', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Movie' })
      .expect(201);

    expect(Object.keys(response.body)).toStrictEqual([
      'id',
      'name',
      'description',
      'is_active',
      'created_at',
    ]);

    const category = await categoryRepository.findById(response.body.id);
    expect(response.body.id).toBe(category.id);
    expect(response.body.created_at).toBe(category.created_at.toISOString());
    expect(response.body).toMatchObject({
      name: category.name,
      description: category.description,
      is_active: category.is_active,
    });
  });
});
