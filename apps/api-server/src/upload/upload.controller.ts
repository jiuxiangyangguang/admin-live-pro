import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
@Controller('upload')
export class UploadController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() avatar) {
    return this.client.send('upload:file', avatar)
  }
}
