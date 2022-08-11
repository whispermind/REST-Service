import { AuthGuard } from '@nestjs/passport';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
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
import { v4 } from 'uuid';
import { isFound, validateUuid } from 'src/validation/validation';
import { TracksService } from '../services/tracks.service';
import { FavoritesService } from 'src/modules/favorites/services/favorites.service';

@Controller('track')
@UseGuards(AuthGuard('jwt'))
export class TracksController {
  constructor(
    private service: TracksService,
    private favService: FavoritesService,
  ) {}
  @Get()
  async getTracks() {
    return await this.service.getTracks();
  }

  @Get(':id')
  async getTrack(@Param('id') id: string) {
    validateUuid(id);
    const track = await this.service.getTrack(id);
    isFound(track);
    return track;
  }

  @Post()
  async createTrack(@Body() body: CreateTrackDto) {
    if (body.artistId) validateUuid(body.artistId);
    if (body.albumId) validateUuid(body.albumId);
    const track = await this.service.createTrack({
      artistId: null,
      albumId: null,
      ...body,
      id: v4(),
    });
    return track;
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    validateUuid(id);
    if (body.artistId) validateUuid(body.artistId);
    if (body.albumId) validateUuid(body.albumId);
    const track = await this.service.getTrack(id);
    isFound(track);
    const updated = this.service.updateTrack({
      ...track,
      ...body,
    });
    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    validateUuid(id);
    const item = await this.service.getTrack(id);
    isFound(item);
    const result = await this.service.deleteTrack(item);
    this.favService.removeFavoriteTrack(id);
    return result;
  }
}
