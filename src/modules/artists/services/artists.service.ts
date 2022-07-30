import { Injectable } from '@nestjs/common';
import { IArtist } from 'src/IData/IData';
import { Artist } from '../entity/artists.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async getArtists() {
    const data = this.artistsRepository.find();
    return data;
  }

  async getArtist(id: string) {
    const data = this.artistsRepository.findOneBy({ id });
    return data;
  }

  async createArtist(artist: IArtist) {
    const data = this.artistsRepository.save(artist);
    return data;
  }

  async updateArtist(update: Artist) {
    const data = this.artistsRepository.save(update);
    return data;
  }

  deleteArtist(artist: Artist) {
    const data = this.artistsRepository.remove(artist);
    return data;
  }
}
