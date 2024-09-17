import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), { status: 400 });
  }

  try {
    const restaurant = await prisma.place.findUnique({
      where: { id: Number(id) },
      include: { comments: { include: { user: true } } },
    });

    if (!restaurant) {
      return new Response(JSON.stringify({ message: 'Restaurant not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ restaurant }), { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
