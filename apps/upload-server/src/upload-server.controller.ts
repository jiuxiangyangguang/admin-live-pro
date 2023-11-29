import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { UploadService } from './upload-server.service'

@Controller()
export class UploadServerController {
  constructor(private readonly uploadService: UploadService) {}

  @MessagePattern('upload:file')
  uploadFile(avatar) {
    return this.uploadService.uploadFile(avatar)
  }
}
