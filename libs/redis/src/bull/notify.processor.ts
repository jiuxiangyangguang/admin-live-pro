import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('notifyJob')
export class NotifyJobProcessor {
  constructor() {}

  @Process({ name: 'notify' })
  async transcode(job: Job<unknown>) {
    console.log(12121)
  }

  @OnQueueActive()
  onActive(job: Job) {
    // 在这里添加你需要在任务开始时执行的代码
  }
}
