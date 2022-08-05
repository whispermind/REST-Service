import { AuthGuard } from '@nestjs/passport';
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
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { v4 } from 'uuid';
import { isFound, validateUuid } from 'src/validation/validation';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private service: UsersService) {}
  @Get()
  async getUsers() {
    return (await this.service.getUsers()).map((user: IUser) => {
      return { ...user, password: undefined };
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    validateUuid(id);
    const user = await this.service.getUser(id);
    isFound(user);
    return { ...user, password: undefined };
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const data: IUser = {
      ...body,
      id: v4(),
      version: 1,
    };
    const user = await this.service.createUser(data);
    return { ...user, password: undefined };
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    validateUuid(id);
    const user = await this.service.getUser(id);
    isFound(user);
    if (user.password !== body.oldPassword) {
      throw new HttpException('Wrong password', 403);
    }
    const updated = await this.service.updatePassword({
      ...user,
      password: body.newPassword,
      version: user.version + 1,
    });
    return { ...updated, password: undefined };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    validateUuid(id);
    const user = await this.service.getUser(id);
    isFound(user);
    const result = await this.service.deleteUser(user);
    return result;
  }
}
