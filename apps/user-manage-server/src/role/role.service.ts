import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { MenuEntity } from '../menu/entities/menu.entity'
import { MenuIds } from '../pos/dto/create-po.dto'
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto'
import { Role } from './entities/role.entity'
import { RoleMenu } from './entities/roleMenu.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(createRoleDto)
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find()
  }

  async findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } })
  }

  async update(updateData: UpdateRoleDto): Promise<Role> {
    await this.roleRepository.update(updateData.id, updateData)
    return this.roleRepository.findOne({ where: { id: updateData.id } })
  }

  async remove(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } })
    await this.roleRepository.delete(id)
    return role
  }

  async getMenu(id: number) {
    // 根据角色id查出所有菜单
    let menu = [] // 菜单id
    const roleMenu = await this.roleMenuRepository.find({
      where: { role_id: id },
    })
    menu = roleMenu.map((item) => item.menu_id)
    // 如果改岗位不存在自定义菜单
    if (roleMenu.length === 0) {
      const role = await this.roleRepository.findOne({ where: { id } }) // 找到对应角色
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

  async setMenu(menu: MenuIds) {
    const roleMenu = menu.menu.map((menuId) => {
      const roleMenu = new RoleMenu()
      roleMenu.menu_id = menuId
      roleMenu.role_id = menu.id
      return roleMenu
    })
    this.roleMenuRepository.delete({ role_id: menu.id }) // 先删除role-menu对应关系
    return this.roleMenuRepository.save(roleMenu)
  }
}
