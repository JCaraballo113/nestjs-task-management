import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

interface ServerConfig {
    port?: string;
    origin?: string;
}

async function bootstrap() {
    const serverConfig: ServerConfig = config.get('server');
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    } else {
        app.enableCors({
            origin: serverConfig.origin
        });
    }
    await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
