import { IsEnum, IsString } from 'class-validator';

export class CreateEventoEstadoDto {
  @IsString()
  nombre: string;
}