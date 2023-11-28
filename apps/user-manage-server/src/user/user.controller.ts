import { Body, Controller, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto, DelUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  create(createUserDto: CreateUserDto) {
    return this.userService.sign(createUserDto)
  }

  update(@Body() update: UpdateUserDto, @Req() req) {
    console.log(req.user)
    return this.userService.update(update)
  }

  del(@Body() del: DelUserDto) {
    return this.userService.del(del)
  }

  getUserList(@Body('pageInfo') pageInfo) {
    return this.userService.getUserList(pageInfo)
  }

  getUserPosList(@Body('pageInfo') pageInfo) {
    return this.userService.getUserPosList(pageInfo)
  }

  getUserNameList(@Body('name') name: string) {
    return this.userService.getUserNameList(name)
  }

  delUserPos(@Body('userpos') userpos) {
    return this.userService.delUserPos(userpos)
  }

  addUserPos(@Body('userpos') userpos) {
    return this.userService.addUserPos(userpos)
  }
}
