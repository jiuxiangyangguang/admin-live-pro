import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty({ message: '角色名称必填' })
  name: string
  @ApiProperty({ description: '角色代码' })
  @IsNotEmpty({ message: '角色代码必填' })
  code: string
  @ApiProperty({ description: '角色等级' })
  @IsNotEmpty({ message: '角色等级必填' })
  level: number
  @ApiProperty({ description: '角色描述' })
  @IsNotEmpty({ message: '角色描述必填' })
  description: string
  @ApiProperty({ description: '角色菜单' })
  @IsNotEmpty({ message: '角色菜单必填' })
  menu: string
  @ApiProperty({ description: '角色权限' })
  @IsNotEmpty({ message: '角色权限必填' })
  authority: string
}
export class UpdateRoleDto {
  @ApiProperty({ description: '角色id' })
  @IsNotEmpty({ message: '角色名称id必填' })
  id: number
  @ApiProperty({ description: '角色名称' })
  name?: string
  @ApiProperty({ description: '角色代码' })
  code?: string
  @ApiProperty({ description: '角色等级' })
  level?: number
  @ApiProperty({ description: '角色描述' })
  description?: string
  @ApiProperty({ description: '角色菜单' })
  menu?: string
  @ApiProperty({ description: '角色权限' })
  authority?: string
}
