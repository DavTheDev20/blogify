import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all Posts from Database
export async function GET() {
  try {
    await prisma.$connect();

    const posts = await prisma.post.findMany();

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}

// Create New Post
export async function POST(request: Request) {
  const requestData = await request.json();

  if (!requestData.title || !requestData.content)
    return NextResponse.json({
      success: false,
      error: 'Please include title and content in request json body',
    });

  try {
    await prisma.$connect();

    await prisma.post.create({
      data: {
        title: requestData.title,
        content: requestData.content,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);

    return NextResponse.error();
  }
}
