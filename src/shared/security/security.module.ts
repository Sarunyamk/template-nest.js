import { Module } from '@nestjs/common';
import { TypeConfigService } from 'src/config/type-config.service';
import { HASH_SERVICE } from './interfaces/hash.interface';
import { BcryptService } from './services/bcrypt.service';

@Module({
  providers: [
    TypeConfigService,
    { provide: HASH_SERVICE, useClass: BcryptService },
  ],
  exports: [TypeConfigService, HASH_SERVICE],
})
export class SecurityModule {}
