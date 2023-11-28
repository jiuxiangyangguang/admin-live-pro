import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { UserPos } from '../user/entities/userPos.entity'
import { Pos } from './entities/pos.entity'
import { PosMenuEntity } from './entities/posMenu.entity'
import { PosController } from './pos.controller'
import { PosService } from './pos.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Pos, UserPos]),
    TypeOrmModule.forFeature([PosMenuEntity]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [PosController],
  providers: [PosService],
})
export class PosModule {}
