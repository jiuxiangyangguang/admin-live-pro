import { Module } from '@nestjs/common'
import { LiveServerController } from './live-server.controller'
import { LiveServerService } from './live-server.service'

@Module({
  imports: [],
  controllers: [LiveServerController],
  providers: [LiveServerService],
})
export class LiveServerModule {}
