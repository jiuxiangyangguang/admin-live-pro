import { Controller, Get } from '@nestjs/common'
import { ShoppingServerService } from './shopping-server.service'

@Controller()
export class ShoppingServerController {
  constructor(private readonly shoppingServerService: ShoppingServerService) {}

  @Get()
  getHello(): string {
    return this.shoppingServerService.getHello()
  }
}
