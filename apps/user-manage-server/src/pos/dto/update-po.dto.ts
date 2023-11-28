import { PartialType } from '@nestjs/swagger'
import { CreatePoDto } from './create-po.dto'

export class UpdatePoDto extends PartialType(CreatePoDto) {}
