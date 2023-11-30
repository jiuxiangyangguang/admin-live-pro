import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV !== 'development',
      isGlobal: true,
    }),
  ],
})
export class ConfigModules {}
