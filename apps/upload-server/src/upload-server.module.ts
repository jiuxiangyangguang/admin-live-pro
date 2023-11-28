import { Module } from '@nestjs/common'
import { UploadServerController } from './upload-server.controller'
import { UploadServerService } from './upload-server.service'

@Module({
  imports: [],
  controllers: [UploadServerController],
  providers: [UploadServerService],
})
export class UploadServerModule {}
