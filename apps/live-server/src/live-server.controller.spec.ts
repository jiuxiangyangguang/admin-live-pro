import { Test, TestingModule } from '@nestjs/testing'
import { LiveServerController } from './live-server.controller'
import { LiveServerService } from './live-server.service'

describe('LiveServerController', () => {
  let liveServerController: LiveServerController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LiveServerController],
      providers: [LiveServerService],
    }).compile()

    liveServerController = app.get<LiveServerController>(LiveServerController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(liveServerController.getHello()).toBe('Hello World!')
    })
  })
})
