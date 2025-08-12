import { Injectable } from '@nestjs/common';
import { CreateEventoEstadoDto } from './dto/eventstatus.dto';
import { UpdateEventoEstadoDto } from './dto/updateeventstatus.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventoEstadoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventoEstadoDto) {
    return this.prisma.eventoestado.create({ data });
  }

  findAll() {
    return this.prisma.eventoestado.findMany();
  }

  findOne(id: number) {
    return this.prisma.eventoestado.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateEventoEstadoDto) {
    return this.prisma.eventoestado.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.eventoestado.delete({ where: { id } });
  }
}
