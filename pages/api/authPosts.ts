import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PostType } from '@/types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res.status(403).json({ success: false, error: 'Unauthenticated' });

  if (req.method === 'GET') {
    try {
      prisma.$connect;
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
        include: { Post: true },
      });

      const authPosts = user?.Post;

      return res.status(200).json({ success: true, posts: authPosts });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
}
