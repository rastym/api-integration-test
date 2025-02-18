import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Return user data if credentials are valid
    }
    return null;
  }
  // Register new user
  async register(registerDto: RegisterDto) {
    const { username, password, passwordConfirmation } = registerDto;
    if (password !== passwordConfirmation) {
      throw new UnauthorizedException(`Wrong credentials!`);
    }
    // Check if user already exists
    const existingUser = await this.userService.findOneByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = await this.userService.create({
      username,
      password: hashedPassword,
    });

    const payload = { username: newUser.username, userId: newUser.id }; // You can include more fields if needed
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      user: { username: newUser.username },
      access_token, // Return token along with the user data
    };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
