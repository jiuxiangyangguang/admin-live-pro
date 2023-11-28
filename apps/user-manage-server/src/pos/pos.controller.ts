import { Body, Controller, Param } from '@nestjs/common'
import { CreatePoDto, MenuIds, user } from './dto/create-po.dto'
import { PosService } from './pos.service'

@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  create(@Body() createPoDto: CreatePoDto) {
    return this.posService.create(createPoDto)
  }

  findAll() {
    return this.posService.findAll()
  }

  findOne(@Body() users: user) {
    return this.posService.findOne(users.username)
  }

  remove(@Param('id') id: string) {
    return this.posService.remove(+id)
  }
  setMenu(@Body() menu: MenuIds) {
    return this.posService.setMenu(menu)
  }
}
