import { Controller, Get } from '@nestjs/common'
import { ChatGptServerService } from './chat-gpt-server.service'

@Controller()
export class ChatGptServerController {
  constructor(private readonly chatGptServerService: ChatGptServerService) {}

  @Get()
  getHello(): string {
    return this.chatGptServerService.getHello()
  }
}
