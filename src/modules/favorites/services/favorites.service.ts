import { favorites } from './../entity/favorite.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(favorites)
    private favoritesRepository: Repository<favorites>,
  ) {}
  async getFavorites() {
    const data = await this.favoritesRepository.find();
    if (!data.length) {
      const init = this.favoritesRepository.create({
        tracks: [],
        albums: [],
        artists: [],
      });

      await this.favoritesRepository.save(init);
    }
    return await this.favoritesRepository.find();
  }

  async addFavoriteTrack(id: string) {
    const data = await this.getFavorites();
    data[0].tracks.push(id);
    return await this.favoritesRepository.save(data[0]);
  }

  async removeFavoriteTrack(id: string) {
    const data = await this.getFavorites();
    data[0].tracks = data[0].tracks.filter(
      (trackId) => trackId !== id && trackId,
    );
    return await this.favoritesRepository.save(data[0]);
  }

  async addFavoriteAlbum(id: string) {
    const data = await this.getFavorites();
    data[0].albums.push(id);
    return await this.favoritesRepository.save(data[0]);
  }

  async removeFavoriteAlbum(id: string) {
    const data = await this.getFavorites();
    data[0].albums = data[0].albums.filter(
      (albumId) => albumId !== id && albumId,
    );
    return await this.favoritesRepository.save(data[0]);
  }

  async addFavoriteArtist(id: string) {
    const data = await this.getFavorites();
    data[0].artists.push(id);
    return await this.favoritesRepository.save(data[0]);
  }

  async removeFavoriteArtist(id: string) {
    const data = await this.getFavorites();
    data[0].artists = data[0].artists.filter(
      (artistId) => artistId !== id && artistId,
    );
    return await this.favoritesRepository.save(data[0]);
  }
}
