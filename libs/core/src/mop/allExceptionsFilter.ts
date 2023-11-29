import { Catch, ExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: RpcException) {
    const error = exception
    // 这里你可以将错误信息发送到你的网关API服务
    return throwError(error)
  }
}
