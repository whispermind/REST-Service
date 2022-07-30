import { FavoritesService } from './../../favorites/services/favorites.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { isFound, validateUuid } from 'src/validation/validation';
import { AlbumsService } from '../services/albums.service';

@Controller('album')
export class AlbumsController {
  constructor(
    private service: AlbumsService,
    private favService: FavoritesService,
  ) {}
  @Get()
  async getAlbums() {
    return await this.service.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    validateUuid(id);
    const album = await this.service.getAlbum(id);
    isFound(album);
    return album;
  }

  @Post()
  async createAlbum(@Body() body: CreateAlbumDto) {
    if (body.artistId) validateUuid(body.artistId);
    const album = await this.service.createAlbum({
      artistId: null,
      ...body,
      id: v4(),
    });
    return album;
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    validateUuid(id);
    if (body.artistId) validateUuid(body.artistId);
    const album = await this.service.getAlbum(id);
    isFound(album);
    const updated = this.service.updateAlbum({
      ...album,
      ...body,
    });
    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    validateUuid(id);
    const album = await this.service.getAlbum(id);
    isFound(album);
    const result = await this.service.deleteAlbum(album);
    this.favService.removeFavoriteAlbum(id);
    return result;
  }
}
