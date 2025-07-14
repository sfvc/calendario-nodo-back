import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔥 CORS correctamente configurado sin middleware extra
  app.enableCors({
    origin: [
      "http://localhost:5173", // Tu frontend React
      "http://localhost:3000", // Si necesitas el mismo puerto
      "http://127.0.0.1:5173", // Alternativa localhost
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // ✅ PATCH incluido
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    credentials: true, // ✅ Coincide con tu frontend
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })


  // Configurar vistas y Swagger
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación Swagger para mi proyecto NestJS')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Aplicación corriendo en http://localhost:3000`);
  console.log(`📚 Swagger disponible en http://localhost:3000/api`);
}
bootstrap();
