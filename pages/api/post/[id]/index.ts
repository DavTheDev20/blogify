import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const { id } = req.query;

  prisma.$connect();

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { user: true },
      });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
}
