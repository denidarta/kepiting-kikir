import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));

  const config = new DocumentBuilder()
    .setTitle('Kepiting Kikir API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('transactions', 'Mengelola transaksi peminjaman dan pengembalian buku. Terdapat dua jenis transaksi: "borrow" untuk meminjam buku dan "return" untuk mengembalikan buku. Setiap transaksi terhubung ke user dan buku yang spesifik.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
void bootstrap();
