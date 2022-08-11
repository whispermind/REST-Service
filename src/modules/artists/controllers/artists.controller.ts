import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist-dto';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from '../services/artists.service';
import { v4 } from 'uuid';
import { isFound, validateUuid } from 'src/validation/validation';
import { FavoritesService } from 'src/modules/favorites/services/favorites.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('artist')
@UseGuards(AuthGuard('jwt'))
export class ArtistsController {
  constructor(
    private service: ArtistsService,
    private favService: FavoritesService,
  ) {}
  @Get()
  async getArtists() {
    return await this.service.getArtists();
  }

  @Get(':id')
  async getArtist(@Param('id') id: string) {
    validateUuid(id);
    const artist = await this.service.getArtist(id);
    isFound(artist);
    return artist;
  }

  @Post()
  async createArtist(@Body() body: CreateArtistDto) {
    const artist = await this.service.createArtist({ ...body, id: v4() });
    return artist;
  }

  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    validateUuid(id);
    const artist = await this.service.getArtist(id);
    isFound(artist);
    const updated = this.service.updateArtist({
      ...artist,
      ...body,
    });
    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    validateUuid(id);
    const item = await this.service.getArtist(id);
    isFound(item);
    const result = await this.service.deleteArtist(item);
    this.favService.removeFavoriteArtist(id);
    return result;
  }
}
