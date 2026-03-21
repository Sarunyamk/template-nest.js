export type JwtPayload = {
  sub: string;
  email: string;
  role: 'role'; //? fill role in database/generated/prisma/client
  iat?: number;
  exp?: number;
};
