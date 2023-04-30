import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from '@fc/micro-videos/src/category/domain'
@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) { }

  @Get()
  public getHello(): string {
    const category =  new Category({
      name: 'Movie',
      description: "some description",
      is_active: true
    });
    return category as any
  }
}
