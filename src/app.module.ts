import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './logger/http-exception-filter';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(typeormConfig),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
