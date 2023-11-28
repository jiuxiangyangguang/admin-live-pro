import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuEntity } from '../menu/entities/menu.entity'
import { Role } from './entities/role.entity'
import { RoleMenu } from './entities/roleMenu.entity'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, MenuEntity]),
    TypeOrmModule.forFeature([RoleMenu]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
