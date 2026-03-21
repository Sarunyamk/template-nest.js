import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { type JwtPayload } from 'src/modules/auth/types/jwt-payload.type';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user;
    if (!user) {
      throw new Error(
        'Current User must cannot be used without authentication ',
      );
    }
    return data ? user[data] : user;
  },
);
