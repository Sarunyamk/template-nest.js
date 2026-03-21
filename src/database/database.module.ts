import { Global, Module } from '@nestjs/common';
import { TypeConfigService } from 'src/config/type-config.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, TypeConfigService],
  exports: [PrismaService],
})
export class DatabaseModule {}
