import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorTypes } from 'src/common/types/error-type';
import { TypeConfigService } from 'src/config/type-config.service';
import { type JwtPayload } from 'src/modules/auth/types/jwt-payload.type';
import { IAppJwtService } from '../interfaces/jwt.interface';

@Injectable()
export class AppJwtService implements IAppJwtService {
  private readonly jwtSecret: string;
  private readonly accessTtl: string;

  constructor(
    private readonly jwtService: JwtService,
    typeConfigService: TypeConfigService,
  ) {
    this.jwtSecret = typeConfigService.get('JWT_SECRET');
    this.accessTtl = typeConfigService.get('JWT_ACCESS_TTL');
  }

  async signAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(
      { sub: payload.sub, email: payload.email, role: payload.role },
      {
        secret: this.jwtSecret,
        expiresIn: this.accessTtl as unknown as number,
      },
    );
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtSecret,
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Invalid or expired access token',
        code: ErrorTypes.InvalidToken,
      });
    }
  }
}
