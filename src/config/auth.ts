import { config } from 'dotenv';
config();
export default {
  jwt: {
    secret: String(process.env.KEY),
    expiresIn: '1d',
  },
};
