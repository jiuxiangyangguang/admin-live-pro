import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  code: string

  @Column()
  level: number

  @Column({ comment: '状态' })
  status: string

  @Column()
  description: string

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  create_time: Date
}
