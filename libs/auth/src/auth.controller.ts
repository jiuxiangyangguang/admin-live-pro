import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/create-auth.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginAuthDto) {
    return this.authService.login(user)
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
