import { RedisCacheModule } from '@app/redis/redis-cache/redis-cache.module'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'apps/user-manage-server/src/user/entities/user.entity'
import { UserModule } from 'apps/user-manage-server/src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStorage } from './jwt.strategy'
import { LocalStorage } from './local.strategy'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '12h' },
    }
  },
})

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    jwtModule,
    RedisCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule],
})
export class AuthModule {}
