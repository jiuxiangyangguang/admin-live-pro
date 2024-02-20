import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Injectable()
export class NotifyServerService {
  constructor(@InjectQueue('notifyJob') public notifyJob: Queue) {}

  async sendJob(data: any, expireTime) {
    const job: Job = await this.notifyJob.add('notify', data, {})
    const redisClient = this.notifyJob.client
    redisClient.expire(`bull:notifyJob:${job.id}`, expireTime)
    return job
  }
}
