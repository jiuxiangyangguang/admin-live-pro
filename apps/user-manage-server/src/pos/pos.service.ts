import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { UserPos } from '../user/entities/userPos.entity'
import { CreatePoDto, MenuIds } from './dto/create-po.dto'
import { Pos } from './entities/pos.entity'
import { PosMenuEntity } from './entities/posMenu.entity'

@Injectable()
export class PosService {
  constructor(
    @InjectRepository(Pos)
    private posRepository: Repository<Pos>,
    @InjectRepository(PosMenuEntity)
    private posMenuRepository: Repository<PosMenuEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPos)
    private userPosRepository: Repository<UserPos>,
  ) {}
  async create(createPo: CreatePoDto) {
    const pos = this.posRepository.create(createPo)
    await this.posRepository.save(pos)
    return pos
  }

  findAll() {
    return this.posRepository.find({
      relations: ['role'],
    })
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({ where: { username } })
    const pos = await this.userPosRepository.find({
      where: { user_id: user.id },
      relations: ['Pos'],
    })
    const poses = await Promise.all(
      pos.map(async (userPos) => await userPos.Pos),
    )
    return poses
  }

  remove(id: number) {
    return `This action removes a #${id} po`
  }
  async setMenu(menu: MenuIds) {
    console.log(menu)
    const roleMenu = menu.menu.map((menuId) => {
      const roleMenu = new PosMenuEntity()
      roleMenu.menu_id = menuId
      roleMenu.pos_id = menu.id
      return roleMenu
    })
    this.posMenuRepository.delete({ pos_id: menu.id }) // 先删除pos-menu对应关系
    return this.posMenuRepository.save(roleMenu)
  }
}
