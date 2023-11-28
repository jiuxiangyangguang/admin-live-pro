import { Test, TestingModule } from '@nestjs/testing'
import { UploadServerController } from './upload-server.controller'
import { UploadServerService } from './upload-server.service'

describe('UploadServerController', () => {
  let uploadServerController: UploadServerController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UploadServerController],
      providers: [UploadServerService],
    }).compile()

    uploadServerController = app.get<UploadServerController>(
      UploadServerController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(uploadServerController.getHello()).toBe('Hello World!')
    })
  })
})
