import { ConfigModules } from '@app/config'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStorage } from './jwt.strategy'

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
  imports: [ConfigModules, PassportModule, jwtModule],
  providers: [ConfigService, JwtStorage],
  exports: [jwtModule],
})
export class JwtMyModule {}
