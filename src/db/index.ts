import { IUser, IAlbum, IArtist, IFavorites, ITrack } from '../IData/IData';

interface IDataBase {
  users: IUser[];
  albums: IAlbum[];
  artists: IArtist[];
  favorites: IFavorites;
  tracks: ITrack[];
}

export const store: IDataBase = {
  users: [],
  albums: [],
  artists: [],
  tracks: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

// export class DbService {

//

//   getAlbums(){
//     return this.store.albums
//   }
//   getAlbum(id: string){
//     return this.store.albums.find((album) => album.id === id)
//   }
//   createAlbum(album: IAlbum){
//     this.store.albums.push(album);
//     return album
//   }
//   updateAlbum(id: string, data: Partial<Omit<IAlbum, 'id'>>){
//     return this.store.albums.find((album) => {
//       if(album.id === id){
//         album = {...album, ...data};
//         return true
//       }
//       return false
//     });
//   }
//   deleteAlbum(id: string){
//     let isRemoved = false;
//     this.store.albums = this.store.albums.filter((album) => {
//       if(album.id === id){
//         isRemoved = true;
//         return false
//       }
//       return true
//     });
//     return isRemoved;
//   }

//   getFavorites(){
//     return this.store.favorites
//   }
//   addFavoriteTrack(id: string){
//     this.store.favorites.tracks.push(id);
//     return true
//   }
//   removeFavoriteTrack(id: string){
//     let isRemoved = false;
//     this.store.favorites.tracks = this.store.favorites.tracks.filter((trackId) => {
//       if(trackId === id){
//         isRemoved = true;
//         return false
//       }
//       return true
//     });
//     return isRemoved;
//   }
//   addFavoriteAlbum(id: string){
//     this.store.favorites.albums.push(id);
//     return true
//   }
//   removeFavoriteAlbum(id: string){
//     let isRemoved = false;
//     this.store.favorites.albums = this.store.favorites.albums.filter((albumId) => {
//       if(albumId === id){
//         isRemoved = true;
//         return false
//       }
//       return true
//     });
//     return isRemoved;
//   }
//   addFavoriteAritst(id: string){
//     this.store.favorites.artists.push(id);
//     return true
//   }
//   removeFavoriteArtist(id: string){
//     let isRemoved = false;
//     this.store.favorites.artists = this.store.favorites.artists.filter((artistId) => {
//       if(artistId === id){
//         isRemoved = true;
//         return false
//       }
//       return true
//     });
//     return isRemoved;
//   }
// }
