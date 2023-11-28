import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateMenuDto {
  @ApiProperty({ description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称必填' })
  name: string
  icon: string
  @ApiProperty({ description: '组件路径' })
  @IsNotEmpty({ message: '组件路径必填' })
  path: string
  @ApiProperty({ description: '组件' })
  @IsNotEmpty({ message: '组件必填' })
  component: string
  @ApiProperty({ description: '父组件id' })
  parent_id?: number
  isShow: boolean
  @ApiProperty({ description: '排序' })
  @IsNotEmpty({ message: '排序必填' })
  sort_num: number
}
export class UpdateMenuDto {
  @ApiProperty({ description: '菜单ID' })
  @IsNotEmpty({ message: '菜单ID必填' })
  id: number
  @ApiProperty({ description: '菜单名称' })
  name?: string
  icon?: string
  @ApiProperty({ description: '组件路径' })
  path: string
  @ApiProperty({ description: '组件' })
  component?: string
  isShow?: boolean
  parent_id?: number
  sort_num?: number
}
