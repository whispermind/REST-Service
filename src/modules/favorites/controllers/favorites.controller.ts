import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { isFound, validateUuid } from 'src/validation/validation';
import { FavoritesService } from '../services/favorites.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favService: FavoritesService,
    private trackService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
  ) {}
  @Get()
  async getFavs() {
    const ids = (await this.favService.getFavorites())[0];
    const albums = await Promise.all(
      ids.albums.reduce((acc, id) => {
        if (id) {
          acc.push(this.albumsService.getAlbum(id));
        }
        return acc;
      }, []),
    );
    const tracks = await Promise.all(
      ids.tracks.reduce((acc, id) => {
        if (id) {
          acc.push(this.trackService.getTrack(id));
        }
        return acc;
      }, []),
    );
    const artists = await Promise.all(
      ids.artists.reduce((acc, id) => {
        if (id) {
          acc.push(this.artistsService.getArtist(id));
        }
        return acc;
      }, []),
    );

    return { albums, tracks, artists };
  }

  @Post('track/:id')
  async addFavTrack(@Param('id') id: string) {
    validateUuid(id);
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException('track doesnt exist', 422);
    }
    await this.favService.addFavoriteTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeFavTrack(@Param('id') id: string) {
    validateUuid(id);
    const item = await this.favService.removeFavoriteTrack(id);
    isFound(item);
  }

  @Post('album/:id')
  async addFavAlbum(@Param('id') id: string) {
    validateUuid(id);
    const album = await this.albumsService.getAlbum(id);
    if (!album) {
      throw new HttpException('album doesnt exist', 422);
    }
    await this.favService.addFavoriteAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeFavAlbum(@Param('id') id: string) {
    validateUuid(id);
    const item = await this.favService.removeFavoriteAlbum(id);
    isFound(item);
  }

  @Post('artist/:id')
  async addFavAritst(@Param('id') id: string) {
    validateUuid(id);
    const artist = await this.artistsService.getArtist(id);
    if (!artist) {
      throw new HttpException('artist doesnt exist', 422);
    }
    await this.favService.addFavoriteArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeFavArtist(@Param('id') id: string) {
    validateUuid(id);
    const item = await this.favService.removeFavoriteArtist(id);
    isFound(item);
  }
}
