import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Get all Posts from Database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    try {
      await prisma.$connect();
      const posts = await prisma.post.findMany();
      return res.status(200).json({ success: true, posts });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ success: false, error });
    }
  } else if (req.method === 'POST') {
    const data: { title: string; content: string } = req.body;

    if (!data.title || !data.content) {
      return res.status(400).json({
        success: false,
        error: 'Please include title and content in request body.',
      });
    }

    try {
      await prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
        },
      });
      return res.status(200).json({ success: true });
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
