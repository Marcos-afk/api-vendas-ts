import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';
import { config } from 'dotenv';
config();

interface IUpload {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, cb) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        cb(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUpload;
