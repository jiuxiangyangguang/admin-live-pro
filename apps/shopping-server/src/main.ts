import { NestFactory } from '@nestjs/core'
import { ShoppingServerModule } from './shopping-server.module'

async function bootstrap() {
  const app = await NestFactory.create(ShoppingServerModule)
  await app.listen(3000)
}
bootstrap()
