import { Prisma } from '@prisma/client';
import { UserRole } from './roles.enum';

export class UserEntity {
  id: number;
  email: string;
  name?: string;
  role: UserRole;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
