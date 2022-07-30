
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  tracks: string[];
}