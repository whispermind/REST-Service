import { Injectable } from '@nestjs/common';
import { store } from 'src/db';
import { IUser } from 'src/IData/IData';

@Injectable()
export class UsersService {
  async getUsers() {
    return await store.users;
  }
  async getUser(id: string) {
    return await store.users.find((user) => user.id === id);
  }
  async createUser(user: IUser) {
    await store.users.push(user);
    return user;
  }

  async updatePassword(update: IUser) {
    const index = await store.users.findIndex((user) => user.id === update.id);
    if (index < 0) return false;
    store.users[index] = update;
    return update;
  }

  async deleteUser(id: string) {
    let item;
    store.users = await store.users.filter((user) => {
      if (user.id === id) {
        item = user;
        return false;
      }
      return true;
    });
    return item || false;
  }
}
