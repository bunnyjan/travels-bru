import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/auth'; // นำเข้าฟังก์ชัน generateToken

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // ตรวจสอบข้อมูลผู้ใช้
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }), { status: 401 });
    }

    // สร้าง JWT
    const token = generateToken(user);

    return new Response(JSON.stringify({ token, user }), { status: 200 });
  } catch (error) {
    console.error('ข้อผิดพลาดในการเข้าสู่ระบบ:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
