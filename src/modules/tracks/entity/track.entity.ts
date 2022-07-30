import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Album } from 'src/modules/albums/entity/album.entity';
import { Artist } from 'src/modules/artists/entity/artists.entity';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ nullable: true })
  albumId: string | null;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: Artist;

  @Column('integer')
  duration: number;
}
