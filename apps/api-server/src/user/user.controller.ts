import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { RolesGuard } from '@app/auth/role.guard'
import { Roles } from '@app/decorators/roles.decorator'
import { PageInfo, UserPosType } from '@app/types'
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  CreateUserDto,
  DelUserDto,
} from 'apps/user-manage-server/src/user/dto/create-user.dto'
import { UpdateUserDto } from 'apps/user-manage-server/src/user/dto/update-user.dto'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('sign')
  @ApiOperation({ summary: '注册用户' })
  @Roles(1)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('user:sign', createUserDto)
  }

  @Post('update')
  @ApiOperation({ summary: '更新数据' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Body() update: UpdateUserDto) {
    return this.client.send('user:update', update)
  }

  @Post('del')
  @ApiOperation({ summary: '删除用户' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  del(@Body() del: DelUserDto) {
    return this.client.send('user:del', del)
  }

  @Post('getUserList')
  @Roles(1)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户列表' })
  getUserList(@Body('pageInfo') pageInfo: PageInfo) {
    return this.client.send('user:getUserList', pageInfo)
  }

  @Post('getUserPosList')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '获取用户岗位列表' })
  getUserPosList(@Body('pageInfo') pageInfo: PageInfo) {
    return this.client.send('user:getUserPosList', pageInfo)
  }

  @Post('getUserNameList')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '获取用户岗位列表' })
  getUserNameList(@Body('name') name: string) {
    return this.client.send('user:getUserNameList', { name: name })
  }

  @Post('delUserPos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '删除用户岗位' })
  delUserPos(@Body('userpos') userpos: UserPosType) {
    return this.client.send('user:delUserPos', userpos)
  }

  @Post('addUserPos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '新增用户岗位' })
  addUserPos(@Body('userpos') userpos: UserPosType) {
    return this.client.send('user:addUserPos', userpos)
  }
}
