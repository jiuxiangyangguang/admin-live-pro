import { RedisCacheService } from '@app/redis/redis-cache/redis-cache.service'
import { HttpException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'apps/user-manage-server/src/user/entities/user.entity'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { Repository } from 'typeorm'
import { AuthService } from './auth.service'

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super({
      // 如何提取令牌
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 是否忽略令牌过期
      ignoreExpiration: false,
      passReqToCallback: true, // 使用Passport后，会将解析后的token信息挂载到req.user上
      secretOrKey: configService.get('SECRET'),
    } as StrategyOptions)
  }

  async validate(req, user: User) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    const cacheToken = await this.redisCacheService.cacheGet(user.username)
    if (!cacheToken) {
      // 缓存里面取token,取不到可能已过期
      throw new UnauthorizedException('token 已过期')
    }

    // 当其他地方登录时会重新生成token存储在redis中 用户传的token不正确就会挤下线
    if (token !== cacheToken) {
      // throw new UnauthorizedException('您的账号在其他地方登录，请重新登录')
      throw new HttpException('您的账号在其他地方登录，请重新登录', 401)
    }

    return user
  }
}
