import { ConfigModules } from '@app/config'
import { ShoppingProcessor } from '@app/redis/bull/audio.processor'
import { RedisCacheModule } from '@app/redis/redis-cache/redis-cache.module'
import { RedlockModule } from '@app/redis/redis-lock/redis-lock.module'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ShoppingServerController } from './shopping-server.controller'
import { ShoppingServerService } from './shopping-server.service'

@Module({
  imports: [
    ConfigModules,
    BullModule.forRootAsync({
      imports: [ConfigModule, RedisCacheModule], // 引入 RedisCacheModule
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            db: 0, //目标库,
            password: configService.get('REDIS_PASSPORT'), // 密码,没有可以不写
          },
        }
      },
    }),
    BullModule.registerQueue({
      name: 'shopping',
    }),
    RedlockModule,
    RedisCacheModule,
  ],
  controllers: [ShoppingServerController],
  providers: [ShoppingServerService, ShoppingProcessor],
})
export class ShoppingServerModule {}
