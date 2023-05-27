import { Controller, Get, INestApplication } from '@nestjs/common';
import { EntityValidationErrorFilter } from './entity-validation-error.filter';
import { EntityValidationError } from '@fc/micro-videos/src/@seedwork/domain';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

@Controller('stub')
class StubController {
  @Get()
  public index() {
    throw new EntityValidationError({
      field1: ['field1 is required'],
      field2: ['field2 is required'],
    });
  }
}
describe('EntityValidationErrorFilter', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityValidationErrorFilter());
    await app.init();
  });
  it('should be defined', () => {
    expect(new EntityValidationErrorFilter()).toBeDefined();
  });

  it('should catch a EntityValidationError', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: ['field1 is required', 'field2 is required'],
      });
  });
});
