
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist } from 'src/modules/artists/entity/artists.entity';
import { Track } from 'src/modules/tracks/entity/track.entity';

@Entity()
export class Album {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album, { cascade: true })
  @Exclude()
  tracks: Track[];
}