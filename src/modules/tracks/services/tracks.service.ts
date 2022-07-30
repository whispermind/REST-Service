import { Injectable } from '@nestjs/common';
import { ITrack } from 'src/IData/IData';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../entity/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getTracks() {
    const data = this.trackRepository.find();
    return data;
  }

  async getTrack(id: string) {
    const data = this.trackRepository.findOneBy({ id });
    return data;
  }

  async createTrack(track: ITrack) {
    const data = this.trackRepository.save(track);
    return data;
  }

  async updateTrack(update: Track) {
    const data = this.trackRepository.save(update);
    return data;
  }

  async deleteTrack(item: Track) {
    const data = this.trackRepository.remove(item);
    return data;
  }
}
