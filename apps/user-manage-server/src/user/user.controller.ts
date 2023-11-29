import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { RolesGuard } from '@app/auth/role.guard'
import { Roles } from '@app/decorators/roles.decorator'
import { PageInfo, UserPosType } from '@app/types'
import { Controller, UseGuards } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, DelUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern('user:sign')
  @ApiOperation({ summary: '注册用户' })
  @Roles(1)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(createUserDto: CreateUserDto) {
    return this.userService.sign(createUserDto)
  }

  @MessagePattern('user:update')
  @ApiOperation({ summary: '更新数据' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(update: UpdateUserDto) {
    return this.userService.update(update)
  }

  @MessagePattern('user:del')
  @ApiOperation({ summary: '删除用户' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  del(del: DelUserDto) {
    return this.userService.del(del)
  }

  @MessagePattern('user:getUserList')
  @Roles(1)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '获取用户列表' })
  getUserList(pageInfo: PageInfo) {
    return this.userService.getUserList(pageInfo)
  }

  @MessagePattern('user:getUserPosList')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '获取用户岗位列表' })
  getUserPosList(pageInfo: PageInfo) {
    return this.userService.getUserPosList(pageInfo)
  }

  @MessagePattern('user:getUserNameList')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '获取用户岗位列表' })
  getUserNameList(name: string) {
    return this.userService.getUserNameList(name)
  }

  @MessagePattern('user:delUserPos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '删除用户岗位' })
  delUserPos(userpos: UserPosType) {
    return this.userService.delUserPos(userpos)
  }

  @MessagePattern('user:addUserPos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '新增用户岗位' })
  addUserPos(userpos: UserPosType) {
    return this.userService.addUserPos(userpos)
  }
}
