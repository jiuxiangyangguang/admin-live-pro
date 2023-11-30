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
import {
  CreatePoDto,
  MenuIds,
  user,
} from 'apps/user-manage-server/src/pos/dto/create-po.dto'

@Controller('pos')
export class PosController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('create')
  create(@Body() createPoDto: CreatePoDto) {
    return this.client.send('po:create', createPoDto)
  }

  @Get('all')
  findAll() {
    return this.client.send('po:findAll', {})
  }

  @Post('list')
  @ApiOperation({ summary: '根据用户名称来查询对应岗位' })
  findOne(@Body() users: user) {
    return this.client.send('po:findOne', users.username)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('po:remove', +id)
  }

  @Post('menu')
  @ApiOperation({ summary: '修改岗位对应菜单' })
  setMenu(@Body() menu: MenuIds) {
    return this.client.send('po:setMenu', menu)
  }
}
