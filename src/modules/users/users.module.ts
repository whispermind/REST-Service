import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
