import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigMyService } from './config.service'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV !== 'development',
      isGlobal: true,
    }),
  ],
  providers: [ConfigMyService], // 添加 ConfigMyService 到 providers
  exports: [ConfigMyService], // 导出 ConfigMyService
})
export class ConfigModules {}
