// src/filter/any-exception.filter.ts
/**
 * 捕获所有异常
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const status = HttpStatus.BAD_REQUEST
    const response = ctx.getResponse()
    // 创建一个错误响应
    const errorResponse = {
      status: status,
      timestamp: new Date().toISOString(),
      ...exception.response,
    }

    // 将错误响应发送给客户端
    response.status(status).json(errorResponse)
  }
}
