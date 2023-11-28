import { NestFactory } from '@nestjs/core'
import { LiveServerModule } from './live-server.module'

async function bootstrap() {
  const app = await NestFactory.create(LiveServerModule)
  await app.listen(3000)
}
bootstrap()
