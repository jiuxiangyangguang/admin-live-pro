// use/entities/user.entity.ts
import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100, unique: true, nullable: true })
  userId: string // 用户ID

  @Column({ length: 100, unique: true })
  username: string // 用户名

  @Column({ length: 100 })
  nickname: string //昵称

  @Exclude()
  @Column({ select: false }) // 表示查询时隐藏此列
  password: string // 密码

  @Column({ nullable: true })
  avatar: string //头像

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  createTime: Date

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
  })
  updateTime: Date

  // @BeforeInsert()
  // async encryptPwd() {
  //   this.password = await hashSync(this.password, 10)
  // }
}
