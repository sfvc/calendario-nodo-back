// auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Validar que el usuario exista y su contraseña sea correcta
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return null;

    return user; // 👈 se devuelve el usuario completo si es válido
  }

  // Crear el JWT y devolver los datos necesarios al frontend
  async login(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload), // cambia "access_token" por "token"
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
