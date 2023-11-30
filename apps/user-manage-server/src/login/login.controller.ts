import { LoginAuthDto } from '@app/auth/dto/create-auth.dto'
import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { LoginService } from './login.service'

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern('user:login')
  createMenu(user: LoginAuthDto) {
    return this.loginService.login(user)
  }
}
