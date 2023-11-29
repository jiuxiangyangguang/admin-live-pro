import { Logger } from '@app/config/log4js'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'

import { map, Observable, timeout } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req
    const response = context.switchToHttp().getResponse()
    return next
      .handle()
      .pipe(timeout(10000))
      .pipe(
        map((data) => {
          let statusCode = 200
          try {
            statusCode = data.statusCode || 200
          } catch (e) {
            statusCode = 200
          }
          // 对时间统一处理
          // const { createTime, updateTime } = data
          // if (createTime) {
          //   data.createTime = moment(createTime).format('yyyy-MM-DD HH:mm:ss')
          // }
          // if (updateTime) {
          //   data.updateTime = moment(updateTime).format('yyyy-MM-DD HH:mm:ss')
          // }
          if (!req.originalUrl.includes('/logs')) {
            const logFormat = ` 
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip}
            User: ${JSON.stringify(req.user)}
            Response data:\n ${JSON.stringify(data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
            Logger.info(logFormat)
            Logger.access(logFormat)
          }

          response.status(200)
          return {
            data,
            code: statusCode,
            msg: '请求成功',
          }
        }),
      )
  }
}
