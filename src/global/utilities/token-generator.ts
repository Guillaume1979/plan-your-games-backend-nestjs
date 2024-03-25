import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config({ path: 'src/config/config.dev.env' });
const expirationTime = `${15 * 365 * 24 * 3600}s`;
const payload = {
  uuid: '12345abc',
  username: 'guitou',
  avatar: 'untrucauhasard',
};

const generateToken = async (): Promise<string> => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: expirationTime });
  return Promise.resolve(token);
};

generateToken()
  .then((token) => console.log('The JWT token is', token))
  .catch((err) => console.log('An error occurred with the reason :', err));
