import { S3Client } from '@aws-sdk/client-s3';

export const spacesClient = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: 'fra1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  },
});

export const SPACES_BUCKET = process.env.DO_SPACES_BUCKET!;
export const SPACES_CDN_ENDPOINT = process.env.DO_SPACES_CDN_ENDPOINT!;
