import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { LiveService } from './live-server.service'

@Controller()
export class LiveServerController {
  constructor(private readonly liveServerService: LiveService) {}

  @MessagePattern('live:start')
  startStreaming(streamName: string) {
    return this.liveServerService.createStream(streamName)
  }

  @MessagePattern('live:list')
  livelist() {
    return this.liveServerService.livelist()
  }
}
