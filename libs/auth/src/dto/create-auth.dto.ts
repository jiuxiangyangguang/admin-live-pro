import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginAuthDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填' })
  username: string

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '用户密码必填' })
  password: string

  @ApiProperty({ description: '用户角色' })
  @IsNotEmpty({ message: '用户角色必填' })
  role_id: number

  @ApiProperty({ description: '用户岗位' })
  @IsNotEmpty({ message: '用户岗位必填' })
  pos_id: number
}
