import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMongoDbAdapter implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  getAllUser(): Promise<User[]> {
    return this.userModel.find({});
  }

  getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  getUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  getUserByEmail(email: unknown): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }

  updateUserPassword(id: string, newPassword: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { password: newPassword });
  }
}
