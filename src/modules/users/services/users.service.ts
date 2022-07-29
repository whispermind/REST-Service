import { Injectable } from '@nestjs/common';
import { store } from 'src/db';
import { IUser } from 'src/IData/IData';

@Injectable()
export class UsersService {
  async getUsers() {

  }
  async getUser(id: string) {
    
  }
  async createUser(user: IUser) {
   
  }

  async updatePassword(update: IUser) {
    
  }

  async deleteUser(id: string) {
    
  }
}
