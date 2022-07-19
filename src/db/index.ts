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
