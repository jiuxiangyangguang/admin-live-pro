import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { NotifyServerModule } from './notify-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotifyServerModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      password: '123456',
    },
  })

  await app.listen()
}
bootstrap()
