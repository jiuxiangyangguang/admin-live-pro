import { Body, Controller, Param } from '@nestjs/common'
import { MenuIds } from '../pos/dto/create-po.dto'
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  findAll() {
    return this.roleService.findAll()
  }

  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id)
  }

  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto)
  }

  remove(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }

  getMenu(@Param('id') id: string) {
    return this.roleService.getMenu(+id)
  }

  setMenu(@Body() menu: MenuIds) {
    return this.roleService.setMenu(menu)
  }
}
