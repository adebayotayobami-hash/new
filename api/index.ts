import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from '../server';

const app = createServer();

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Let Express handle the request
  app(req, res);
}
