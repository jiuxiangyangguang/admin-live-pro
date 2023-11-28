import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MenuEntity } from '../../menu/entities/menu.entity'
@Entity('posmenu')
export class PosMenuEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '岗位id' })
  pos_id: number

  @Column({ name: 'menu_id', comment: '岗位id' })
  menu_id: number

  @ManyToOne(() => MenuEntity)
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity

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
