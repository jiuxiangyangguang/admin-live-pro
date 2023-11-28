import { Module } from '@nestjs/common'
import { ChatGptServerController } from './chat-gpt-server.controller'
import { ChatGptServerService } from './chat-gpt-server.service'

@Module({
  imports: [],
  controllers: [ChatGptServerController],
  providers: [ChatGptServerService],
})
export class ChatGptServerModule {}
