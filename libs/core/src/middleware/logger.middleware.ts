// src/middleware/logger.middleware.ts
import { Logger } from '@app/config/log4js'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode // 响应状态码
    next()
    // 组装日志信息
    const logFormat = ` 
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      Status code: ${code}
      Parmas: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
      Body: ${JSON.stringify(req.body)} 
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    `
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat)
    } else if (code >= 400) {
      Logger.warn(logFormat)
    } else {
      Logger.access(logFormat)
      Logger.log(logFormat)
    }
  }
}

// 注意全局中间件只能使用函数模式 案例可以做白名单拦截之类的
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode // 响应状态码
  next()
  // 组装日志信息
  const logFormat = ` 
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat)
  } else if (code >= 400) {
    Logger.warn(logFormat)
  } else {
    Logger.access(logFormat)
    Logger.log(logFormat)
  }
}
