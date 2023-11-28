import { NestFactory } from '@nestjs/core'
import { UploadServerModule } from './upload-server.module'

async function bootstrap() {
  const app = await NestFactory.create(UploadServerModule)
  await app.listen(3000)
}
bootstrap()
