import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;

  // ตรวจสอบว่าค่าของ id นั้นถูกต้องหรือไม่
  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ message: 'Invalid place ID' }), { status: 400 });
  }

  try {
    // ดึงข้อมูลสถานที่จากฐานข้อมูล
    const hotel = await prisma.place.findUnique({
      where: { id: Number(id) },
      include: { comments: { include: { user: true } } }, // รวมความคิดเห็นและข้อมูลผู้ใช้
    });

    if (!hotel) {
      return new Response(JSON.stringify({ message: 'Place not found' }), { status: 404 });
    }

    // ส่งข้อมูลสถานที่กลับไปยัง client
    return new Response(JSON.stringify({ hotel }), { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}