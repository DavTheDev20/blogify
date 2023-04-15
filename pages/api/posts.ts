import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

// Get all Posts from Database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method == 'GET') {
    try {
      await prisma.$connect();
      const posts = await prisma.post.findMany({
        include: { user: true, Comment: true },
      });
      return res.status(200).json({ success: true, posts });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ success: false, error });
    }
  } else if (req.method === 'POST') {
    if (!session)
      return res
        .status(403)
        .json({ success: false, error: 'Please login to add a post' });

    const data: { title: string; content: string } = req.body;

    try {
      await prisma.$connect();
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });
      const result = await prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          userId: user?.id as string,
        },
      });
      return res.status(200).json({ success: true, result });
    } catch (error: any) {
      if (error?.code == 'P2002')
        return res.status(400).json({
          success: false,
          error: 'Title already exists, please enter new unique title',
        });
      return res.status(400).json({ success: false, error });
    }
  }
}
