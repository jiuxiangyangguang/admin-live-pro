import { BadRequestException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'apps/user-manage-server/src/user/entities/user.entity'
import { IStrategyOptions, Strategy } from 'passport-local'
import { Repository } from 'typeorm'

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions)
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne()

    if (!user) {
      throw new BadRequestException('用户名不存在！')
    }

    // if (!compareSync(password, user.password)) {
    //   throw new BadRequestException('密码错误！')
    // }

    if (password !== user.password) {
      throw new BadRequestException('密码错误！')
    }

    return user
  }
}
