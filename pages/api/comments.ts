import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(403)
      .json({ success: false, error: 'Unauthenticated, please login.' });

  if (req.method === 'POST') {
    const data: { content: string; postId: number } = req.body;
    try {
      await prisma.$connect();
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });
      const result = await prisma.comment.create({
        data: {
          content: data.content,
          userId: user?.id as string,
          postId: Number(data.postId),
        },
      });
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log(error);

      return res.status(400).json({ success: false, error });
    }
  }
}
