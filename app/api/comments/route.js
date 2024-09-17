import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const comments = await prisma.comment.findMany({
    include: {
      user: true, 
      place: true,
    },
  });
  return new Response(JSON.stringify(comments), { status: 200 });
}

export async function POST(request) {
  const { text, rating, placeId, userId } = await request.json();
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        rating,
        placeId: parseInt(placeId),
        userId: parseInt(userId),
      },
      include: {
        user: true, 
        place: true,
      },
    });
    return new Response(JSON.stringify({ comment }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
