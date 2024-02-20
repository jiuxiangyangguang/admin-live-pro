import { ConfigModules, ConfigMyService } from '@app/config'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { NotifyServerController } from './notify-server.controller'
import { NotifyServerService } from './notify-server.service'

@Module({
  imports: [
    ConfigModules,
    BullModule.forRootAsync({
      imports: [ConfigModules], // 引入 RedisCacheModule
      inject: [ConfigMyService],
      useFactory: async (configService: ConfigMyService) => {
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            db: 1, //目标库,
            password: configService.get('REDIS_PASSPORT'), // 密码,没有可以不写
          },
        }
      },
    }),
    BullModule.registerQueue({
      name: 'notifyJob',
    }),
  ],
  controllers: [NotifyServerController],
  providers: [NotifyServerService],
})
export class NotifyServerModule {}
