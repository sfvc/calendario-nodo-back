import { CreateEventDto } from "./create-event.dto";

export interface EventEntity extends CreateEventDto {
  id: number;
}