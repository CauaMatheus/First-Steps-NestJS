import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExist = await this.repository.findOne({ email });
    if (userAlreadyExist) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(password, 12);
    const user = this.repository.create({
      email,
      name,
      password: hashedPassword,
    });

    await this.repository.save(user);
    user.password = undefined;
    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    user.password = undefined;
    return user;
  }
}
