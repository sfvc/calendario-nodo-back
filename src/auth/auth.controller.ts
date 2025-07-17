import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const data = await this.authService.login(user);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  refreshToken(@Req() req: RequestWithUser) {
    const user = req.user;

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      token: this.authService.generateToken(payload),
      user: payload,
    };
  }
}
