import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // 配置写在这里
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: 'mytest',
        // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
        autoLoadEntities: true,
        synchronize: true, // 是否将实体映射到表  生产关闭
        authSwitchHandler: function (data, cb) {
          if (data.pluginName === 'mysql_native_password') {
            cb(null, Buffer.from('root\0'))
          }
        },
      }),
    }),
  ],
})
export class DbModule {}
