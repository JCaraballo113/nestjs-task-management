import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

interface ServerConfig {
    port?: string;
}

async function bootstrap() {
    const serverConfig: ServerConfig = config.get('server');
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
