import { Module } from '@nestjs/common'
import { ShoppingServerController } from './shopping-server.controller'
import { ShoppingServerService } from './shopping-server.service'

@Module({
  imports: [],
  controllers: [ShoppingServerController],
  providers: [ShoppingServerService],
})
export class ShoppingServerModule {}
