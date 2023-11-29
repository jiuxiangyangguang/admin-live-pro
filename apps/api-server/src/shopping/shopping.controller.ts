import { RedisCacheService } from '@app/redis/redis-cache/redis-cache.service'
import { RedlockService } from '@app/redis/redis-lock/redis-lock.service'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Controller('shopping')
export class ShoppingController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly redlockService: RedlockService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Post('/gets')
  addToCarts(@Body() createShoppingDto) {
    return this.client.send('shopping:addToCart', createShoppingDto)
  }
  @Post('/lock')
  lock(@Body() createShoppingDto) {
    return this.client.send('shopping:lock', createShoppingDto)
  }
  @Post('/redlock')
  async redlock(@Body() createShoppingDto) {
    return this.client.send('shopping:redlock', createShoppingDto)
  }

  @Post('/cns')
  cns() {
    return this.client.send('shopping:cns', {})
  }
}
