import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { EventStatus } from './event.enum';

export class CreateEventDto {
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  start: string;

  @IsNotEmpty()
  @IsString()
  end: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  allDay?: boolean;

  @IsOptional()
  @IsEnum(Object.values(EventStatus))
  status?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  // Nuevos adicionales
  @IsOptional()
  @IsString()
  organizacion?: string;

  @IsOptional()
  @IsString()
  dia_y_horario?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadPersonas?: number;

  @IsOptional()
  @IsString()
  espacioUtilizar?: string;

  @IsOptional()
  @IsString()
  requerimientos?: string;

  @IsOptional()
  @IsString()
  cobertura?: string;
}
