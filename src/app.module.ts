import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { GlobalFilter } from './common/exceptions/global.exception.filter';
import { PrismaExceptionFilter } from './common/exceptions/prisma-exception.filter';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './shared/security/security.module';

@Module({
  imports: [ConfigModule, DatabaseModule, SecurityModule, AuthModule],
  providers: [
    { provide: APP_FILTER, useClass: GlobalFilter },
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
