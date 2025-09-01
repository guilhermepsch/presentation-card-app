import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@myorg/shared/types/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test',
    };
    return this.appService.getHello();
  }
}
