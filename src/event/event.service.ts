import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto) {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Fechas inválidas');
    }

    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        start: startDate,
        end: endDate,
        color: data.color || '#3b82f6',
        allDay: data.allDay ?? false,
        status: data.status as any,
        type: data.type as any,
        user: { connect: { email: data.userId } },

        // Nuevos campos
        organizacion: data.organizacion,
        dia_y_horario: data.dia_y_horario,
        cantidadPersonas: data.cantidadPersonas,
        espacioUtilizar: data.espacioUtilizar,
        requerimientos: data.requerimientos,
        cobertura: data.cobertura,
      },
    });
  }

  async findAll() {
    const events = await this.prisma.event.findMany({
      include: {
        user: true,
      },
    });

    return events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      color: event.color,
      allDay: event.allDay,
      status: event.status,
      type: event.type,
      userId: event.user.email,

      // Nuevos campos
      organizacion: event.organizacion,
      dia_y_horario: event.dia_y_horario,
      cantidadPersonas: event.cantidadPersonas,
      espacioUtilizar: event.espacioUtilizar,
      requerimientos: event.requerimientos,
      cobertura: event.cobertura,
    }));
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: {
        ...data,
        status: data.status as any,
        type: data.type as any,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}