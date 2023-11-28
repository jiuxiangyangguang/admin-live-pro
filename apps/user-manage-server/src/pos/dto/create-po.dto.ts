import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreatePoDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称' })
  name: string

  @ApiProperty({ description: '岗位角色类型' })
  @IsNotEmpty({ message: '岗位角色类型' })
  type: number

  @ApiProperty({ description: '对应用户id' })
  @IsNotEmpty({ message: '对应用户id' })
  user_id: number

  @ApiProperty({ description: '状态' })
  @IsNotEmpty({ message: '状态不能为空' })
  @IsIn([1, 2, 3, 4], { message: '状态只能为1、2、3或4' })
  status: number

  // 可选参数
  @ApiPropertyOptional({ description: '描述信息' })
  @IsString()
  @IsOptional() // 检查给定值是否为空（=== null，=== undefined），如果为空，则忽略该属性上的所有验证器    (可选参数需要加)
  description?: string
  // 可选参数
  @ApiPropertyOptional({ description: '机构' })
  @IsString()
  @IsOptional() // 检查给定值是否为空（=== null，=== undefined），如果为空，则忽略该属性上的所有验证器    (可选参数需要加)
  org_id?: string
}

export class MenuIds {
  @ApiProperty({ description: '菜单ids' })
  @IsNotEmpty({ message: '菜单ids' })
  @IsNumber({}, { each: true, message: '菜单ids必须为数字' })
  menu: number[]
  @ApiProperty({ description: 'id' })
  @IsNotEmpty({ message: '岗位id' })
  id: number
}
export class user {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称' })
  @IsString()
  username: string
}
