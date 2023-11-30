import { JwtMyModule } from '@app/auth/jwt.module'
import { RedisCacheModule } from '@app/redis/redis-cache/redis-cache.module'
import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
@Module({
  imports: [UserModule, JwtMyModule, RedisCacheModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
