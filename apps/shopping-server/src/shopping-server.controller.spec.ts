import { Test, TestingModule } from '@nestjs/testing'
import { ShoppingServerController } from './shopping-server.controller'
import { ShoppingServerService } from './shopping-server.service'

describe('ShoppingServerController', () => {
  let shoppingServerController: ShoppingServerController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingServerController],
      providers: [ShoppingServerService],
    }).compile()

    shoppingServerController = app.get<ShoppingServerController>(
      ShoppingServerController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shoppingServerController.getHello()).toBe('Hello World!')
    })
  })
})
