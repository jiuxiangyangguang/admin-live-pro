import { Test, TestingModule } from '@nestjs/testing'
import { ChatGptServerController } from './chat-gpt-server.controller'
import { ChatGptServerService } from './chat-gpt-server.service'

describe('ChatGptServerController', () => {
  let chatGptServerController: ChatGptServerController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatGptServerController],
      providers: [ChatGptServerService],
    }).compile()

    chatGptServerController = app.get<ChatGptServerController>(
      ChatGptServerController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatGptServerController.getHello()).toBe('Hello World!')
    })
  })
})
