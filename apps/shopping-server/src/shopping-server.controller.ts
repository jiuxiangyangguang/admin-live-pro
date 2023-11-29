import { RedlockService } from '@app/redis/redis-lock/redis-lock.service'
import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ShoppingServerService } from './shopping-server.service'

@Controller()
export class ShoppingServerController {
  constructor(
    private readonly shoppingServerService: ShoppingServerService,
    private readonly redlockService: RedlockService,
  ) {}

  @MessagePattern('shopping:addToCart')
  addToCarts(createShoppingDto) {
    return this.shoppingServerService.addToCart(createShoppingDto)
  }

  @MessagePattern('shopping:lock')
  lock(createShoppingDto) {
    return this.shoppingServerService.lock(createShoppingDto)
  }

  @MessagePattern('shopping:redlock')
  async redlock(createShoppingDto) {
    const redislock = this.redlockService.getRedlockInstance()
    let lock = await redislock.acquire(['test'], 500000)
    try {
      lock = await lock.extend(5000)
      return await this.shoppingServerService.redlock(createShoppingDto)
    } finally {
      await lock.release()
    }
  }

  @MessagePattern('shopping:cns')
  cns() {
    return '完成'
  }
}
