import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Repository } from 'typeorm'
import { Pos } from '../pos/entities/pos.entity'
import { PosMenuEntity } from '../pos/entities/posMenu.entity'
import { Role } from '../role/entities/role.entity'
import { RoleMenu } from '../role/entities/roleMenu.entity'
import { CreateMenuDto, UpdateMenuDto } from './dto/create-menu.dto'
import { MenuEntity } from './entities/menu.entity'
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(PosMenuEntity)
    private readonly posMenuRepository: Repository<PosMenuEntity>,
    @InjectRepository(Pos)
    private readonly PosRepository: Repository<Pos>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}
  // 增加菜单
  async createMenu(menu: CreateMenuDto): Promise<MenuEntity> {
    // 检查父菜单是否存在
    if (menu.parent_id) {
      const parentMenu = await this.menuRepository.findOne({
        where: { id: menu.parent_id },
      })
      if (!parentMenu) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST)
      }
    }
    // 插入数据
    const createdMenu = this.menuRepository.save(menu)
    return createdMenu
  }

  // 修改菜单
  async updateMenu(menu: UpdateMenuDto): Promise<MenuEntity> {
    if (menu.id) {
      const parentMenu = await this.menuRepository.findOne({
        where: { id: menu.id },
      })
      if (!parentMenu)
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST)
    }

    // 更新数据
    const updatedMenu = this.menuRepository.save(menu)

    return updatedMenu
  }

  // 查询菜单
  async getMenuTree(): Promise<MenuEntity[]> {
    // 查询所有根菜单
    const rootMenus: any = await this.menuRepository.find({
      where: { parent_id: IsNull() },
      order: { sort_num: 'ASC' }, //从小到大
    })
    if (rootMenus && rootMenus.length > 0) {
      for (let i = 0; i < rootMenus.length; i++) {
        const submenu = rootMenus[i]
        const menu = await this.menuRepository.find({
          where: { parent_id: submenu.id },
          order: { sort_num: 'ASC' },
        })
        if (menu.length) submenu.children = menu
      }
    }
    return rootMenus
  }

  // 每个角色不同菜单
  async getMenuById(id: number): Promise<MenuEntity[]> {
    // 根据岗位id查出所有菜单
    let menu = [] // 菜单id
    const posMenu = await this.posMenuRepository.find({
      where: { pos_id: id },
    })
    menu = posMenu.map((item) => item.menu_id)
    // 如果改岗位不存在自定义菜单  则默认给岗位对应角色菜单
    if (posMenu.length === 0) {
      const pos = await this.PosRepository.findOne({ where: { id } }) // 找到对应岗位
      const role = await this.roleRepository.findOne({
        where: { id: pos.role_id },
      }) // 找到对应角色
      console.log(role)
      const roleMenu = await this.roleMenuRepository.find({
        where: { role_id: role.id },
      }) // 查找默认角色id
      menu = roleMenu.map((item) => item.menu_id)
    }
    let rootMenu = []
    // 查询所有根菜单
    if (menu && menu.length > 0) {
      const menuArr = await this.menuRepository.find({
        where: { id: In(menu) },
      })
      // 过滤出根菜单
      rootMenu = menuArr
        .filter((item) => !item.parent_id)
        .sort((a, b) => a.sort_num - b.sort_num)

      // 构建树形结构
      const buildTree = (nodes, parent_id) => {
        return nodes
          .filter((node) => node.parent_id === parent_id)
          .sort((a, b) => a.sort_num - b.sort_num)
      }

      rootMenu.forEach((rootNode) => {
        const menu = buildTree(menuArr, rootNode.id)
        if (menu.length) rootNode.children = menu
      })
    }

    return rootMenu
  }

  // 删除菜单
  async deleteMenu(id: number): Promise<void> {
    // 检查菜单是否存在
    if (id) {
      const parentMenu = await this.menuRepository.findOne({
        where: { id: id },
      })
      if (!parentMenu)
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST)
    }
    // 删除数据
    this.menuRepository.delete(id)
  }
}
