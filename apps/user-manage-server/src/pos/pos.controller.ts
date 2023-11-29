import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { CreatePoDto, MenuIds } from './dto/create-po.dto'
import { PosService } from './pos.service'

@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @MessagePattern('po:create')
  create(createPoDto: CreatePoDto) {
    return this.posService.create(createPoDto)
  }

  @MessagePattern('po:findAll')
  findAll() {
    return this.posService.findAll()
  }

  @MessagePattern('po:findOne')
  findOne(username: string) {
    return this.posService.findOne(username)
  }

  @MessagePattern('po:remove')
  remove(id: number) {
    return this.posService.remove(id)
  }

  @MessagePattern('po:setMenu')
  setMenu(menu: MenuIds) {
    return this.posService.setMenu(menu)
  }
}
