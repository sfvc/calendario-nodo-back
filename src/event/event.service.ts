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
        user: { connect: { id: data.userId } },

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
      userId: event.user.id,

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
  const { start, end, userId, ...rest } = data;

  return this.prisma.event.update({
    where: { id },
    data: {
      ...(start && { start: new Date(start) }),
      ...(end && { end: new Date(end) }),
      ...(userId && { user: { connect: { id: userId } } }),
      ...(rest.status && { status: rest.status as any }),
      ...rest,
    },
  });
}

  async remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}