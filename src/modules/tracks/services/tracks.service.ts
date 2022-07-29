import { Injectable } from '@nestjs/common';
import { store } from 'src/db';
import { ITrack } from 'src/IData/IData';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../entity/track.entity';

@Injectable()
export class TracksService {
  constructor(
    
  ){}

  async getTracks() {
    return await store.tracks;
  }

  async getTrack(id: string) {
    return await store.tracks.find((track) => track.id === id);
  }

  async createTrack(track: ITrack) {
    await store.tracks.push(track);
    return track;
  }

  async updateTrack(update: ITrack) {
    const index = await store.tracks.findIndex(
      (track) => track.id === update.id,
    );
    if (index < 0) return false;
    store.tracks[index] = update;
    return update;
  }

  async deleteTrack(id: string) {
    let item;
    store.tracks = await store.tracks.filter((track) => {
      if (track.id === id) {
        item = track;
        return false;
      }
      return true;
    });
    return item || false;
  }
}
