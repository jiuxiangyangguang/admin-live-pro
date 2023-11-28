import { Controller, Get } from '@nestjs/common'
import { LiveServerService } from './live-server.service'

@Controller()
export class LiveServerController {
  constructor(private readonly liveServerService: LiveServerService) {}

  @Get()
  getHello(): string {
    return this.liveServerService.getHello()
  }
}
