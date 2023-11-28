import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pos } from '../pos/entities/pos.entity'
import { PosMenuEntity } from '../pos/entities/posMenu.entity'
import { Role } from '../role/entities/role.entity'
import { RoleMenu } from '../role/entities/roleMenu.entity'
import { RoleModule } from '../role/role.module'
import { MenuEntity } from './entities/menu.entity'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([MenuEntity]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([PosMenuEntity]),
    TypeOrmModule.forFeature([RoleMenu]),
    TypeOrmModule.forFeature([Pos]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
