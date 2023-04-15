import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  if (req.method === 'GET') {
    prisma.$connect();
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: Number(id) },
        include: { user: true },
      });
      return res.status(200).json({ success: true, comments });
    } catch (error) {
      console.log(error);

      return res.status(400).json({ success: false, error });
    }
  }
}
