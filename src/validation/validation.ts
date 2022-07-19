import { validate } from 'uuid';
import { HttpException } from '@nestjs/common';

export function isFound(data: unknown) {
  if (!data) {
    throw new HttpException('User not found', 404);
  }
}

export function validateUuid(id: string) {
  if (!validate(id)) {
    throw new HttpException('Invalid ID', 400);
  }
}
