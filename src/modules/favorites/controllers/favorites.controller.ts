import { IAlbum, ITrack, IArtist } from './../../../IData/IData';
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

interface FavsData {
  albums: IAlbum[];
  tracks: ITrack[];
  artists: IArtist[];
}

@Controller('favs')
export class FavoritesController {
  constructor(
    private favService: FavoritesService,
    private trackService: TracksService,
    private albumsService: AlbumsService,
    private ArtistsService: ArtistsService,
  ) {}
  @Get()
  async getFavs() {
    const ids = (await this.favService.getFavorites())[0];
    const responseData: FavsData = {
      albums: [],
      tracks: [],
      artists: [],
    };
    responseData.albums = await Promise.all(
      ids.albums.map((id) => this.albumsService.getAlbum(id)),
    );
    responseData.tracks = await Promise.all(
      ids.tracks.map((id) => this.trackService.getTrack(id)),
    );
    responseData.artists = await Promise.all(
      ids.artists.map((id) => this.ArtistsService.getArtist(id)),
    );
    responseData.albums = responseData.albums.filter((id) => !!id);
    responseData.artists = responseData.artists.filter((id) => !!id);
    responseData.tracks = responseData.tracks.filter((id) => !!id);
    return responseData;
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
    const artist = await this.ArtistsService.getArtist(id);
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
