import "dotenv/config";
import "reflect-metadata";

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const corsOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:8081")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    credentials: true,
    origin: corsOrigins,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, "0.0.0.0");

  Logger.log(`API disponível na porta ${port}`, "Bootstrap");
}

void bootstrap();
