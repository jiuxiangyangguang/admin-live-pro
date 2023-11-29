import { Module } from '@nestjs/common'
import { UploadServerController } from './upload-server.controller'
import { UploadService } from './upload-server.service'

@Module({
  imports: [],
  controllers: [UploadServerController],
  providers: [UploadService],
})
export class UploadServerModule {}
