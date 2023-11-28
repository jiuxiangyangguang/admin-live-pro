import { Global, Module } from '@nestjs/common'
import { RedlockService } from './redis-lock.service'

@Global()
@Module({
  providers: [RedlockService],
  exports: [RedlockService],
})
export class RedlockModule {}
