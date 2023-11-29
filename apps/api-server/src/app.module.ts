import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MenuController } from './user/menu.controller'
import { PosController } from './user/pos.controller'
import { RoleController } from './user/role.controller'
import { UserController } from './user/user.controller'

@Module({
  imports: [
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
  ],
  controllers: [MenuController, PosController, RoleController, UserController],
})
export class AppModule {}
