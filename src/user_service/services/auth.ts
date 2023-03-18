import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const SALT_ROUNDS = 10;
const EXPIRES_IN = 600; // Seconds

export class AuthService {
  constructor(private User) {}

  public async authenticate(login, password) {
    // Check if the user exists in the database
    const user = await this.User.findOne({ where: { login } });
    if (!user) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return null;
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, config.jwtSecret, { expiresIn: EXPIRES_IN });
    return token;
  }
}
