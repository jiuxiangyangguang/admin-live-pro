import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from '../../role/entities/role.entity'
@Entity('pos')
export class Pos {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '名称' })
  name: string

  @Column({ comment: '岗位角色类型' })
  type: number

  @Column({ name: 'role_id', comment: '岗位角色id' })
  role_id: number

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @Column({
    comment: '状态',
    type: 'enum',
    enum: [1, 2, 3],
  })
  status: number

  @Column({ comment: '描述信息' })
  description: string

  @Column({ comment: '机构' })
  org_id: string

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    comment: '修改时间',
  })
  update_time: Date
}
