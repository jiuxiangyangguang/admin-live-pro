import { Controller, Inject, Post, Req } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Controller('live')
export class LiveController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('start')
  startStreaming(@Req() req) {
    return this.client.send('live:start', { streamName: 'mylive' })
  }

  @Post('list')
  livelist(@Req() req) {
    return this.client.send('live:list', {})
  }
}
