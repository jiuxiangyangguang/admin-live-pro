import { JwtMyModule } from '@app/auth/jwt.module'
import { ConfigModules } from '@app/config'
import { RedisCacheModule } from '@app/redis/redis-cache/redis-cache.module'
import { RedlockModule } from '@app/redis/redis-lock/redis-lock.module'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { NotifyController } from './notify/notify.controller'
import { LoginController } from './user/login.controller'
import { MenuController } from './user/menu.controller'
import { PosController } from './user/pos.controller'
import { RoleController } from './user/role.controller'
import { UserController } from './user/user.controller'

@Module({
  imports: [
    ConfigModules,
    RedlockModule,
    RedisCacheModule,
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          password: '123456',
        },
      },
    ]),
    JwtMyModule,
  ],
  controllers: [
    MenuController,
    PosController,
    RoleController,
    UserController,
    LoginController,
    NotifyController,
  ],
})
export class AppModule {}
