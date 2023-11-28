import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Pos } from '../../pos/entities/pos.entity'
import { User } from './user.entity'
@Entity('userpos')
export class UserPos {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  user_id: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'pos_id' })
  posId: number

  @ManyToOne(() => Pos)
  @JoinColumn({ name: 'pos_id' })
  Pos: Pos

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
