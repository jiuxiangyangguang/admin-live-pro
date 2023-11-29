import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Job } from 'bull'
import { RedisCacheService } from '../redis-cache/redis-cache.service'

@Processor('shopping')
export class ShoppingProcessor {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @Process({ name: 'transcode' })
  async transcode(job: Job<unknown>) {
    // 从缓存中获取产品信息
    const product = await this.redisCacheService.cacheGet(`product`)

    if (product && product * 1 > 0) {
      // 扣减库存，生成订单等操作

      await this.redisCacheService.cacheSet(
        `product`,
        String(product - 1),
        60 * 60 * 24,
      )
      return '购买成功: 剩余数量' + (product - 1)
    } else {
      throw new HttpException('库存不足', HttpStatus.BAD_REQUEST)
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    // 在这里添加你需要在任务开始时执行的代码
  }
}
