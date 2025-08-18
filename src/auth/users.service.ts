import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;

    try {
      // Verificar si ya existe un usuario con el mismo email
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException('email ya registrado');
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario
      const newUser = await this.prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          role,
        },
      });

      return newUser;
    } catch (error: any) {
      // Manejo de errores de Prisma (constraint único)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Forzar tipo a string[] para poder usar includes
        const target = error.meta?.target as string[] | undefined;
        if (error.code === 'P2002' && target?.includes('email')) {
          throw new BadRequestException('email ya registrado');
        }
      }

      // Re-lanzar cualquier otro error
      throw error;
    }
  }
}
