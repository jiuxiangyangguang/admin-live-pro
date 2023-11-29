import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ApiOperation } from '@nestjs/swagger'
import { MenuIds } from '../pos/dto/create-po.dto'
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern('role:create')
  @ApiOperation({ summary: '创建角色' })
  create(createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @MessagePattern('role:findAll')
  @ApiOperation({ summary: '获取所有角色' })
  findAll() {
    return this.roleService.findAll()
  }

  @MessagePattern('role:findOne')
  @ApiOperation({ summary: '根据id获取角色' })
  findOne(id: number) {
    return this.roleService.findOne(id)
  }

  @MessagePattern('role:update')
  @ApiOperation({ summary: '更新角色' })
  update(updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto)
  }

  @MessagePattern('role:remove')
  @ApiOperation({ summary: '删除角色' })
  remove(id: number) {
    return this.roleService.remove(id)
  }

  @MessagePattern('role:getMenu')
  @ApiOperation({ summary: '根据角色获取菜单' })
  getMenu(id: number) {
    return this.roleService.getMenu(id)
  }

  @MessagePattern('role:setMenu')
  @ApiOperation({ summary: '修改角色对应菜单' })
  setMenu(menu: MenuIds) {
    return this.roleService.setMenu(menu)
  }
}
