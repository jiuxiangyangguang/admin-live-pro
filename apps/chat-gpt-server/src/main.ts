import { NestFactory } from '@nestjs/core'
import { ChatGptServerModule } from './chat-gpt-server.module'

async function bootstrap() {
  const app = await NestFactory.create(ChatGptServerModule)
  await app.listen(3000)
}
bootstrap()
