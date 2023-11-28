import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { CreateMenuDto, UpdateMenuDto } from './dto/create-menu.dto'
import { MenuService } from './menu.service'

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @MessagePattern('menu:create')
  createMenu(createMenuDto: CreateMenuDto) {
    console.log(createMenuDto)
    return this.menuService.createMenu(createMenuDto)
  }

  @MessagePattern('menu:list')
  getMenuTree() {
    return this.menuService.getMenuTree()
  }

  @MessagePattern('menu:getById')
  getMenuById(id: string) {
    return this.menuService.getMenuById(+id)
  }

  @MessagePattern('menu:update')
  updateMenu(updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(updateMenuDto)
  }

  @MessagePattern('menu:delete')
  deleteMenu(id: string) {
    return this.menuService.deleteMenu(+id)
  }
}
