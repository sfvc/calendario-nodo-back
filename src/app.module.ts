import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { EventModule } from './event/event.module';
import { UsersModule } from './auth/users.module';
import { EventoEstadoModule } from './evento-estado/eventostatus.module';

@Module({
  imports: [EventModule, AuthModule, PrismaModule, UsersModule, EventoEstadoModule],
  controllers: [AppController], 
  providers: [AppService, JwtStrategy],
})
export class AppModule {}