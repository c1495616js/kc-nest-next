import { Controller, Get } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/private')
  getPrivate(): string {
    return 'this is private!';
  }
}
