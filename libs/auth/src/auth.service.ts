import { RedisCacheService } from '@app/redis/redis-cache/redis-cache.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'apps/user-manage-server/src/user/entities/user.entity'
import { UserService } from 'apps/user-manage-server/src/user/user.service'
import * as _ from 'lodash'
import { LoginAuthDto } from './dto/create-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisCacheService: RedisCacheService,
  ) {}

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user)
  }

  async login(user: LoginAuthDto) {
    const users = await this.userService.findOne(user.username)
    const userAll = {
      ..._.omit(users, ['password']),
      role_id: user.role_id,
      pos_id: user.pos_id,
    }
    const token = this.createToken(_.omit(userAll))

    // redis 缓存token 设置过期时间3600秒
    await this.redisCacheService.cacheSet(`${users.username}`, token, 43200) // 过期时间秒
    return {
      token,
      user: userAll,
    }
  }

  async getUser(user) {
    const username = user.username
    return await this.userService.findOne(username)
  }
}
