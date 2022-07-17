import { Injectable } from '@nestjs/common';
import { store } from 'src/db';
import { IAlbum } from 'src/IData/IData';

@Injectable()
export class AlbumsService {
  async getAlbums() {
    return await store.albums;
  }

  async getAlbum(id: string) {
    return await store.albums.find((album) => album.id === id);
  }

  async createAlbum(album: IAlbum) {
    await store.albums.push(album);
    return album;
  }

  async updateAlbum(update: IAlbum) {
    const index = await store.artists.findIndex(
      (artist) => artist.id === update.id,
    );
    if (index < 0) return false;
    store.albums[index] = update;
    return update;
  }

  async deleteAlbum(id: string) {
    let item;
    store.albums = store.albums.filter((album) => {
      if (album.id === id) {
        item = album;
        return false;
      }
      return true;
    });
    return item || false;
  }
}
