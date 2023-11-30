import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiOperation } from '@nestjs/swagger'

@Controller('menu')
export class MenuController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('create')
  createMenu(@Body() createMenuDto) {
    return this.client.send('menu:create', createMenuDto)
  }

  @Get('list')
  @ApiOperation({ summary: '获取所有菜单' })
  getMenuTree() {
    return this.client.send('menu:list', {})
  }

  @Get('list/:id')
  @ApiOperation({ summary: '根据岗位ID 获取菜单' })
  getMenuById(@Param('id') id: string) {
    return this.client.send('menu:getById', +id)
  }

  @Post('update')
  updateMenu(@Body() updateMenuDto) {
    return this.client.send('menu:update', updateMenuDto)
  }

  @Post('del:id')
  deleteMenu(@Param('id') id: string) {
    return this.client.send('menu:delete', +id)
  }
}
