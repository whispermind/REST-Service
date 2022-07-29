import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/IData/IData';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async getUsers() {
    const data = await this.usersRepository.find();
    return data
  }
  async getUser(id: string) {
    const data = await this.usersRepository.findOneBy({ id });
    return data
  }
  async createUser(user: IUser) {
   const data = await this.usersRepository.save(user);
   return data
  }

  async updatePassword(update: IUser) {
    const data = await this.usersRepository.save(update);
    return data
  }

  async deleteUser(user: User) {
    const data = await this.usersRepository.remove(user);
    return data
  }
}
