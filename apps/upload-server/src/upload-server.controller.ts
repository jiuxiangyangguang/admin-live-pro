import { Controller, Get } from '@nestjs/common'
import { UploadServerService } from './upload-server.service'

@Controller()
export class UploadServerController {
  constructor(private readonly uploadServerService: UploadServerService) {}

  @Get()
  getHello(): string {
    return this.uploadServerService.getHello()
  }
}
