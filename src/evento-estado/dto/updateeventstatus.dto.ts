import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoEstadoDto } from './eventstatus.dto';

export class UpdateEventoEstadoDto extends PartialType(CreateEventoEstadoDto) {}