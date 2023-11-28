import { AllExceptionsFilter } from '@app/core/filter/any-exception.filter'
import { HttpExceptionFilter } from '@app/core/filter/http-exception.filter'
import { TransformInterceptor } from '@app/core/interceptor/transform.interceptor'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor()) // 注册拦截成功请求
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionFilter()) // 注册拦截错误请求
  await app.listen(1103)
}
bootstrap()
