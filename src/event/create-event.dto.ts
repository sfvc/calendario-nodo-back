// create-event.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

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


  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  organizacion?: string;

  @IsOptional()
  @IsInt()
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
