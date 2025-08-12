import { Module } from '@nestjs/common';
import { EventoEstadoController } from './eventostatus.controller';
import { EventoEstadoService } from './eventostatus.service';

@Module({
    controllers: [EventoEstadoController],
    providers: [EventoEstadoService],
    exports: [EventoEstadoService],
})
export class EventoEstadoModule {}