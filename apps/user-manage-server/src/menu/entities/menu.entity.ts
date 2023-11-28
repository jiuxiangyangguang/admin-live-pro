import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm'

@Entity({ name: 'menu' })
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true, default: null, comment: '图标' })
  icon: string

  @Column({ comment: '路径' })
  path: string

  @Column({ comment: '组件' })
  component: string

  @Column({ comment: '排序' })
  sort_num: number

  @Column({ comment: '重定向', nullable: true, default: null })
  redirectTo: string

  @Column({ nullable: true, default: null })
  parent_id: number

  @Column({ default: true })
  isShow: boolean

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  create_time: Date

  @BeforeInsert()
  setDefaultValues() {
    if (this.isShow === undefined) {
      this.isShow = true
    }
  }
}
