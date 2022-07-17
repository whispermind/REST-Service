import { IUser } from '../../../IData/IData';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password-dto';
import {
  Controller,
  Get,
  Param,
  HttpException,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { v4 } from 'uuid';
import { isFound, validateUuid } from 'src/validation/validation';

@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get()
  async getUsers() {
    return (await this.service.getUsers()).map((user: IUser) => {
      return { ...user, password: null };
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    validateUuid(id);
    const user = await this.service.getUser(id);
    isFound(user);
    return { ...user, password: null };
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const data: IUser = {
      ...body,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const user = await this.service.createUser(data);
    return { ...user, password: null };
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    validateUuid(id);
    const user = await this.service.getUser(id);
    isFound(user);
    if (user.password !== body.oldPassword) {
      throw new HttpException('Wrong password', 403);
    }
    const updated = this.service.updatePassword({
      ...user,
      updatedAt: Date.now(),
      password: body.newPass,
      version: user.version + 1,
    });
    return { ...updated, password: null };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    validateUuid(id);
    const result = await this.service.deleteUser(id);
    isFound(result);
    return result;
  }
}
