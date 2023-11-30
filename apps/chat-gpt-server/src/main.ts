import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { ChatGptServerModule } from './chat-gpt-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ChatGptServerModule, {
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
