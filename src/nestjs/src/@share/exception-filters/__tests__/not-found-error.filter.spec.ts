import { Controller, Get, INestApplication } from '@nestjs/common';
import { NotFoundErrorFilter } from '../not-found-error.filter';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NotFoundError } from '@fc/micro-videos/src/@seedwork/domain';

@Controller('stub')
class StubController {
  @Get()
  public index() {
    throw new NotFoundError('fake not found error message');
  }
}
describe('NotFoundErrorFilter', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundErrorFilter());
    await app.init();
  });
  it('should be defined', () => {
    expect(new NotFoundErrorFilter()).toBeDefined();
  });

  it('should catch a EntityValidationError', () => {
    return request(app.getHttpServer()).get('/stub').expect(404).expect({
      statusCode: 404,
      error: 'Not Found',
      message: 'fake not found error message',
    });
  });
});
