import { Repository, EntityRepository } from 'typeorm';
import {
    ConflictException,
    InternalServerErrorException
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
