import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MenuController } from './menu.controller'

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
  controllers: [MenuController],
})
export class AppModule {}
