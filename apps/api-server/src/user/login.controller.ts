import { LoginAuthDto } from '@app/auth/dto/create-auth.dto'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('验证')
@Controller('auth')
export class LoginController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  async login(@Body() user: LoginAuthDto) {
    return this.client.send('user:login', user)
  }

  @Get('getInfo')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(JwtAuthGuard)
  // @Func()
  getUserInfo(@Req() req) {
    // const ls = spawn('explorer', ['/open']) // 文件资源管理器
    // exec(`start C:/gl/SQL`)
    // exec('ls -l', function (err, stdout, stderr) {
    //   if (err) {
    //     console.log(err, '错误')
    //   } else {
    //     console.log(stdout)
    //   }
    // })
    // 使用Passport后，会将解析后的token信息挂载到req.user上
    return req.user
  }
}
