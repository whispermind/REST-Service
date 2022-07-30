import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Album } from 'src/modules/albums/entity/album.entity';
import { Track } from 'src/modules/tracks/entity/track.entity';

@Entity()
export class Artist {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, { cascade: true })
  @Exclude()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, { cascade: true })
  @Exclude()
  tracks: Track[];
}
