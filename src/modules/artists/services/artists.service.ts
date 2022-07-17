import { Injectable } from '@nestjs/common';
import { store } from 'src/db';
import { IArtist } from 'src/IData/IData';

@Injectable()
export class ArtistsService {
  async getArtists() {
    return await store.artists;
  }

  async getArtist(id: string) {
    return await store.artists.find((artist) => artist.id === id);
  }

  async createArtist(artist: IArtist) {
    await store.artists.push(artist);
    return artist;
  }

  async updateArtist(update: IArtist) {
    const index = await store.artists.findIndex(
      (artist) => artist.id === update.id,
    );
    if (index < 0) return false;
    store.artists[index] = update;
    return update;
  }

  deleteArtist(id: string) {
    let item;
    store.artists = store.artists.filter((artist) => {
      if (artist.id === id) {
        item = artist;
        return false;
      }
      return true;
    });
    return item || false;
  }
}
