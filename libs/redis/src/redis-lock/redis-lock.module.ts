import { ConfigModules } from '@app/config'
import { Global, Module } from '@nestjs/common'
import { RedlockService } from './redis-lock.service'

@Global()
@Module({
  imports: [ConfigModules],
  providers: [RedlockService],
  exports: [RedlockService],
})
export class RedlockModule {}
