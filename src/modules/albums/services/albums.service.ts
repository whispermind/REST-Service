import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/IData/IData';
import { Album } from '../entity/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async getAlbums() {
    const data = await this.albumsRepository.find();
    return data;
  }

  async getAlbum(id: string) {
    const data = await this.albumsRepository.findOneBy({ id });
    return data;
  }

  async createAlbum(album: IAlbum) {
    const data = await this.albumsRepository.save(album);
    return data;
  }

  async updateAlbum(update: IAlbum) {
    const data = await this.albumsRepository.save(update);
    return data;
  }

  async deleteAlbum(album: Album) {
    const data = await this.albumsRepository.remove(album);
    return data;
  }
}
