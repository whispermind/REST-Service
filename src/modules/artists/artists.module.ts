import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
