import { Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { Job } from 'bull'
import moment from 'moment'
import { Observable, Subject } from 'rxjs'
import { NotifyServerService } from './notify-server.service'

@Controller()
export class NotifyServerController {
  private userEventSources: Map<string, Subject<any>> = new Map<
    string,
    Subject<any>
  >()

  constructor(private readonly notifyServerService: NotifyServerService) {}

  @MessagePattern('notify:sendJob')
  async sendJob(data: any) {
    const now = moment()
    const end = moment(data.deadline, 'YYYY-MM-DD HH:mm:ss')
    const expireTime = Math.round(end.diff(now) / 1000)
    if (expireTime <= 0 || isNaN(expireTime)) {
      throw new RpcException({ message: '任务过期', statusCode: 400 })
    }
    const job: Job = await this.notifyServerService.sendJob(data, expireTime)
    const jobs = await this.notifyServerService.notifyJob.getJobs(['waiting'])
    const count = jobs.reduce((pre, cur) => {
      if (cur && +cur.data.role === +data.role) pre += 1
      return pre
    }, 0)
    const { role } = data
    const eventSource = this.getUserEventSource(String(role))

    if (eventSource) {
      eventSource.next({
        count: count,
        id: job.id,
        timestamp: job.timestamp,
        type: job.data.type,
        role: job.data.role,
        title: job.data.title,
        content: job.data.content,
        userId: job.data.userId,
      })
    }

    return '完成'
  }

  @MessagePattern('notify:getList')
  async getList(user: any) {
    const jobs = await this.notifyServerService.notifyJob.getJobs(['waiting'])
    const arr = jobs.filter((item) =>
      item ? +item.data.role === +user.role_id : false,
    )
    return arr
  }

  @MessagePattern('notify:sse')
  sse(data): Observable<any> {
    return this.getUserEventSource(data.id).asObservable()
  }

  @MessagePattern('notify:del')
  async del() {
    this.clearUserEventSources()
    this.notifyServerService.notifyJob.empty()
    const client = this.notifyServerService.notifyJob.client
    await client.del('bull:notifyJob:id')
    return '完成'
  }

  private getUserEventSource(userId: string): Subject<any> {
    if (!this.userEventSources.has(userId)) {
      this.userEventSources.set(userId, new Subject<any>())
    }
    return this.userEventSources.get(userId)
  }

  private clearUserEventSources(): void {
    for (const [, subject] of this.userEventSources) {
      subject.complete()
    }
    this.userEventSources.clear()
  }
}
