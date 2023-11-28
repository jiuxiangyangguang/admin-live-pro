import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateUserDto, DelUserDto, IsUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserPos } from './entities/userPos.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPos)
    private userPosRepository: Repository<UserPos>,
  ) {}

  // 注册
  async sign(createUser: CreateUserDto) {
    const { username } = createUser

    // // 锁
    // try {
    //   let resUser = null
    //   await this.redisCacheService.lockAndRun(
    //     `lock:${username}`,
    //     10,
    //     async () => {
    //       const existUser = await this.userRepository.findOne({
    //         where: { username },
    //       })
    //       if (existUser) {
    //         throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    //       }
    //       // create方法相对于new User() 会执行密码加盐的方法encryptPwd
    //       const newUser = await this.userRepository.create(createUser)
    //       newUser.userId = 'U' + String(newUser.id).padStart(5, '0')
    //       const result = await this.userRepository.save(newUser)
    //       resUser = result
    //       return `lock:${username}`
    //     },
    //   )
    //   if (resUser) {
    //     return resUser
    //   } else {
    //     throw new HttpException('用户名已存在!', HttpStatus.BAD_REQUEST)
    //   }
    // } finally {
    //   // 无论如何, 最后都要解锁
    //   await this.redisCacheService.cacheDel(`lock:${username}`)
    // }

    // 事务
    await this.userRepository.manager.transaction(
      'SERIALIZABLE',
      async (transactionalEntityManager) => {
        const userRepository = transactionalEntityManager.getRepository(User)

        const existUser = await userRepository.findOne({
          where: { username },
        })
        if (existUser) {
          throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
        }

        // create方法相对于new User() 会执行密码加盐的方法encryptPwd
        let newUser = await userRepository.create(createUser)
        newUser = await userRepository.save(newUser)

        newUser.userId = 'U' + String(newUser.id).padStart(5, '0')
        await userRepository.save(newUser)
      },
    )

    return await this.userRepository.findOne({ where: { username } })
  }
  // 更新
  async update(update: UpdateUserDto) {
    const { id } = update

    const existUser = await this.isUser({ id })
    const updatePost = await this.userRepository.merge(existUser, update)
    return (await this.userRepository.save(updatePost)).id
  }
  // 删除
  async del(del: DelUserDto) {
    const { username } = del
    const existUser = await this.isUser({ username })
    const updatePost = await this.userRepository.remove(existUser)
    return updatePost
  }
  // 获取用户列表
  async getUserList(pageInfo) {
    const { pageNum, pageSize } = pageInfo
    const skip = (pageNum - 1) * pageSize
    const take = pageSize
    const users = await this.userRepository.find({
      skip,
      take,
    })

    return users
  }
  // 用户是否存在
  async isUser(isuser: IsUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { id: isuser.id },
    })
    if (!existUser) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST)
    }
    return existUser
  }
  async findOne(username: string) {
    return await this.userRepository.findOne({ where: { username } })
  }
  async getUserPosList(pageInfo) {
    const { pageNum, pageSize } = pageInfo
    const skip = (pageNum - 1) * pageSize
    const take = pageSize
    const list = await this.userPosRepository.find({
      skip,
      take,
      relations: ['Pos', 'user'],
    })

    return list.reduce((acc, item) => {
      const existingItem = acc.find((x) => x.user_id === item.user_id)
      if (existingItem) {
        existingItem.postList.push(item.Pos)
      } else {
        acc.push({
          ...item,
          Pos: undefined, // 使用 undefined 替代 delete
          postList: [item.Pos],
        })
      }
      return acc
    }, [])
  }

  async getUserNameList(name: string) {
    const existUser = await this.userRepository.find({
      where: { username: Like(`%${name}%`) },
    })

    return existUser
  }
  async delUserPos(userpos) {
    const result = await this.userPosRepository.delete({
      user_id: userpos.user_id,
      posId: userpos.posId,
    })

    return result
  }

  async addUserPos(userpos) {
    const existingUserPos = await this.userPosRepository.findOne({
      where: {
        user_id: userpos.user_id,
        posId: userpos.posId,
      },
    })
    if (existingUserPos) {
      // 如果这条数据已经存在，那么返回一个错误信息
      throw new HttpException('无法重复添加岗位', 500)
    } else {
      // 如果这条数据不存在，那么插入新的数据
      const result = await this.userPosRepository.save({
        user_id: userpos.user_id,
        posId: userpos.posId,
      })

      return result
    }
  }
}
