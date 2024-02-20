import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
@Controller('notify')
export class NotifyController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('send')
  addToNotify(@Body() data) {
    return this.client.send('notify:sendJob', data)
  }
  @Post('del')
  delToNotify(@Body() data) {
    return this.client.send('notify:del', data)
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  getMaxListeners(@Req() req) {
    return this.client.send('notify:getList', { ...req.user })
  }

  @Sse('info/:id')
  sse(@Param('id') id: any) {
    return this.client.send('notify:sse', { id })
  }
}
