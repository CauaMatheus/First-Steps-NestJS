import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password }) {
    return await this.userService.create({ name, email, password });
  }

  @Get(':id')
  async findByID(@Param() { id }) {
    return await this.userService.findByID(id);
  }
}
