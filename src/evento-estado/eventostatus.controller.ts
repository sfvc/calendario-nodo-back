import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventoEstadoService } from './eventostatus.service';
import { UpdateEventoEstadoDto } from './dto/updateeventstatus.dto';
import { CreateEventoEstadoDto } from './dto/eventstatus.dto';

@Controller('evento-estado')
export class EventoEstadoController {
  constructor(private readonly eventoService: EventoEstadoService) {}

  @Post()
  create(@Body() dto: CreateEventoEstadoDto) {
    return this.eventoService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventoEstadoDto) {
    return this.eventoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoService.remove(+id);
  }
}
