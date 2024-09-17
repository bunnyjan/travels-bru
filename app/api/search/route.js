// app/api/search/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  try {
    // ดึงข้อมูลสถานที่ที่ตรงกับ query
    const places = await prisma.place.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });

    // ส่งข้อมูลสถานที่กลับไปยัง client
    return new Response(JSON.stringify({ places }), { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
