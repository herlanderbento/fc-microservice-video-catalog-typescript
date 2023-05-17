import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
