import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { EventModule } from './event/event.module';
import { UsersModule } from './auth/users.module';

@Module({
  imports: [EventModule, AuthModule, PrismaModule, UsersModule],
  controllers: [AppController], 
  providers: [AppService, JwtStrategy],
})
export class AppModule {}