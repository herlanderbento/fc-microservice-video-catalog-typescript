import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_SCHEMA_TYPE, ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

    // const db_vendor = app
    //   .get<ConfigService<CONFIG_SCHEMA_TYPE>>(ConfigService)
    //   .get<CONFIG_SCHEMA_TYPE['DB_VENDOR']>('DB_VENDOR');

    // console.log({ db_vendor });
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
