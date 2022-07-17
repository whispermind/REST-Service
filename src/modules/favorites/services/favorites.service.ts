import { Injectable } from '@nestjs/common';
import { store } from 'src/db';

@Injectable()
export class FavoritesService {
  async getFavorites() {
    return await store.favorites;
  }

  async addFavoriteTrack(id: string) {
    await store.favorites.tracks.push(id);
    return true;
  }

  removeFavoriteTrack(id: string) {
    let item;
    store.favorites.tracks = store.favorites.tracks.filter((trackId) => {
      if (trackId === id) {
        item = trackId;
        return false;
      }
      return true;
    });
    return item || false;
  }

  addFavoriteAlbum(id: string) {
    store.favorites.albums.push(id);
    return true;
  }

  removeFavoriteAlbum(id: string) {
    let item;
    store.favorites.albums = store.favorites.albums.filter((albumId) => {
      if (albumId === id) {
        item = albumId;
        return false;
      }
      return true;
    });
    return item || false;
  }

  addFavoriteArtist(id: string) {
    store.favorites.artists.push(id);
    return true;
  }

  removeFavoriteArtist(id: string) {
    let item;
    store.favorites.artists = store.favorites.artists.filter((artistId) => {
      if (artistId === id) {
        item = artistId;
        return false;
      }
      return true;
    });
    return item || false;
  }
}
