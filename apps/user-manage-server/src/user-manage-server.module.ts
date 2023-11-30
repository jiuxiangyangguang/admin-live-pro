import { ConfigModules } from '@app/config'
import { DbModule } from '@app/db'
import { Module } from '@nestjs/common'
import { LoginModule } from './login/login.module'
import { MenuModule } from './menu/menu.module'
import { PosModule } from './pos/pos.module'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModules,
    UserModule,
    RoleModule,
    PosModule,
    MenuModule,
    DbModule,
    LoginModule,
  ],
})
export class UserManageServerModule {}
