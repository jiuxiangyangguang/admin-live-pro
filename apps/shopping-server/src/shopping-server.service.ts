import { RedisCacheService } from '@app/redis/redis-cache/redis-cache.service'
import { InjectQueue } from '@nestjs/bull'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Injectable()
export class ShoppingServerService {
  constructor(
    @InjectQueue('shopping')
    private shoppingQueue: Queue,
    private redisCacheService: RedisCacheService,
  ) {}

  // 单实例-队列
  async addToCart(product: any) {
    const jobCounts = await this.shoppingQueue.getJobCounts()
    const totalJobs = jobCounts.waiting + jobCounts.active + jobCounts.delayed

    // 从缓存中获取产品信息
    const productQuantity = await this.redisCacheService.cacheGet(`product`)

    // 检查队列长度是否超过商品总数量
    if (totalJobs >= productQuantity) {
      throw new HttpException('系统忙,请稍后重试!', HttpStatus.BAD_REQUEST)
    }
    try {
      // 添加任务到队列
      const job: Job = await this.shoppingQueue.add('transcode', product, {
        removeOnComplete: true,
        removeOnFail: true,
      })
      // 等待任务完成
      const result = await job.finished()
      return result
    } catch (error) {
      throw new HttpException('库存不足', HttpStatus.BAD_REQUEST)
    }
  }

  // 简单的单实例-分布式锁
  async lock(product: any) {
    const productKey = `product`
    const lockKey = `lock_${productKey}`
    let num = 0
    while (num < 30) {
      num++
      // 尝试获取锁
      const result = await this.redisCacheService.cacheSetNX(lockKey, '1', 10)
      if (result !== 'OK') {
        // 如果没有获取到锁，稍后再试
        await new Promise((resolve) => setTimeout(resolve, 100))
        continue
      }
      try {
        // 获取到锁，执行库存减少操作
        const stock = await this.redisCacheService.cacheGet(productKey)
        const num = Number(stock)
        console.log(num)
        if (num <= 0) {
          // 库存不足，抛出错误
          return '库存不足'
        }
        await this.redisCacheService.cacheDecr(productKey)
        // 操作完成，退出循环
        return '购买成功: 剩余数量' + (num - 1)
      } catch (error) {
        // 发生错误，抛出异常
        new HttpException(
          '系统忙,请稍后再试!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      } finally {
        // 无论是否发生错误，都确保锁被释放
        await this.redisCacheService.cacheDel(lockKey)
      }
    }
  }

  // 使用node-redlock
  async redlock(product: any) {
    const productKey = `product`
    const stock = await this.redisCacheService.cacheGet(productKey)
    const num = Number(stock)
    if (num <= 0) {
      return '库存不足'
    }
    await this.redisCacheService.cacheDecr(productKey)
    // 操作完成，退出循环
    return '购买成功: 剩余数量' + (num - 1)
  }
}
