import { IUser, IAlbum, IArtist, IFavorites, ITrack } from './../../../IData/IData';
import { Injectable } from '@nestjs/common';
interface IDataBase{
  users: IUser[]
  albums: IAlbum[]
  artists: IArtist[]
  favorites: IFavorites
  tracks: ITrack[]
}

@Injectable()
export class DbService {
  store: IDataBase = {
    users: [],
    albums: [],
    artists: [],
    tracks: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: []
    }
  }

  getUsers(){
    return this.store.users
  }
  getUser(id: string){
    return this.store.users.find((user) => user.id === id)
  }
  createUser(user: IUser){
    this.store.users.push(user);
    return user
  }
  updatePassword(id: string, newPass: string){
    return this.store.users.find((user) => {
      if(user.id === id){
        user.password = newPass;
        return true
      }
      return false
    });
  }
  deleteUser(id: string){
    let isRemoved = false;
    this.store.users = this.store.users.filter((user) => {
      if(user.id === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }

  getTacks(){
    return this.store.tracks
  }
  getTrack(id: string){
    return this.store.tracks.find((track) => track.id === id)
  }
  createTrack(track: ITrack){
    this.store.tracks.push(track);
    return track
  }
  updateTrack(id: string, data: Partial<Omit<ITrack, 'id'>>){
    return this.store.tracks.find((track) => {
      if(track.id === id){
        track = {...track, ...data};
        return true
      }
      return false
    });
  }
  deleteTrack(id: string){
    let isRemoved = false;
    this.store.tracks = this.store.tracks.filter((track) => {
      if(track.id === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }

  getArtists(){
    return this.store.artists
  }
  getArtist(id: string){
    return this.store.artists.find((artist) => artist.id === id)
  }
  createArtist(artist: IArtist){
    this.store.artists.push(artist);
    return artist
  }
  updateArtist(id: string, data: Partial<Omit<IArtist, 'id'>>){
    return this.store.artists.find((artist) => {
      if(artist.id === id){
        artist = {...artist, ...data};
        return true
      }
      return false
    });
  }
  deleteArtist(id: string){
    let isRemoved = false;
    this.store.artists = this.store.artists.filter((artist) => {
      if(artist.id === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }

  getAlbums(){
    return this.store.albums
  }
  getAlbum(id: string){
    return this.store.albums.find((album) => album.id === id)
  }
  createAlbum(album: IAlbum){
    this.store.albums.push(album);
    return album
  }
  updateAlbum(id: string, data: Partial<Omit<IAlbum, 'id'>>){
    return this.store.albums.find((album) => {
      if(album.id === id){
        album = {...album, ...data};
        return true
      }
      return false
    });
  }
  deleteAlbum(id: string){
    let isRemoved = false;
    this.store.albums = this.store.albums.filter((album) => {
      if(album.id === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }

  getFavorites(){
    return this.store.favorites
  }
  addFavoriteTrack(id: string){
    this.store.favorites.tracks.push(id);
    return true
  }
  removeFavoriteTrack(id: string){
    let isRemoved = false;
    this.store.favorites.tracks = this.store.favorites.tracks.filter((trackId) => {
      if(trackId === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }
  addFavoriteAlbum(id: string){
    this.store.favorites.albums.push(id);
    return true
  }
  removeFavoriteAlbum(id: string){
    let isRemoved = false;
    this.store.favorites.albums = this.store.favorites.albums.filter((albumId) => {
      if(albumId === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }
  addFavoriteAritst(id: string){
    this.store.favorites.artists.push(id);
    return true
  }
  removeFavoriteArtist(id: string){
    let isRemoved = false;
    this.store.favorites.artists = this.store.favorites.artists.filter((artistId) => {
      if(artistId === id){
        isRemoved = true;
        return false
      }
      return true
    });
    return isRemoved;
  }
}
