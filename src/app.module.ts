import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './shared/security/security.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, SecurityModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
