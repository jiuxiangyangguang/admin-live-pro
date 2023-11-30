import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiOperation } from '@nestjs/swagger'
import { MenuIds } from 'apps/user-manage-server/src/pos/dto/create-po.dto'
import {
  CreateRoleDto,
  UpdateRoleDto,
} from 'apps/user-manage-server/src/role/dto/create-role.dto'

@Controller('role')
export class RoleController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.client.send('role:create', createRoleDto)
  }

  @Get('all')
  @ApiOperation({ summary: '获取所有角色' })
  findAll() {
    return this.client.send('role:findAll', {})
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id获取角色' })
  findOne(@Param('id') id: string) {
    return this.client.send('role:findOne', +id)
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色' })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.client.send('role:update', updateRoleDto)
  }

  @Delete('del/:id')
  @ApiOperation({ summary: '删除角色' })
  remove(@Param('id') id: string) {
    return this.client.send('role:remove', +id)
  }

  @Get('getmenu/:id')
  @ApiOperation({ summary: '根据角色获取菜单' })
  getMenu(@Param('id') id: string) {
    return this.client.send('role:getMenu', +id)
  }

  @Post('editmenu')
  @ApiOperation({ summary: '修改角色对应菜单' })
  setMenu(@Body() menu: MenuIds) {
    return this.client.send('role:setMenu', menu)
  }
}
