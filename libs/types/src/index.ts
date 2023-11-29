import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
export class PageInfo {
  @ApiProperty({ description: '分页数量' })
  @IsNotEmpty({ message: 'pageSize必填' })
  @IsNumber()
  pageSize: number
  @ApiProperty({ description: '页码' })
  @IsNotEmpty({ message: 'pageSize必填' })
  @IsNumber()
  pageNum: number
}

export class UserPosType {
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '用户id必填' })
  user_id: number
  @ApiProperty({ description: '岗位id' })
  @IsNotEmpty({ message: '岗位id必填' })
  posId: number
}
