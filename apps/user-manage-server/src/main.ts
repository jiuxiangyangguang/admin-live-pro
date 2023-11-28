import { AllExceptionsFilter } from '@app/core/mop/allExceptionsFilter'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { UserManageServerModule } from './user-manage-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserManageServerModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      password: '123456',
    },
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // 是否删除Dto中未定义的属性
      transform: true,
    }),
  ) // 注册管道运算符
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen()
}
bootstrap()
