import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // ดึงข้อมูลจาก request
    const { name, email, password } = await req.json();
    
    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        name,        
        email,
        password: hashedPassword,
      },
    });

    // ส่งข้อมูลผู้ใช้ใหม่กลับไป
    return NextResponse.json({ message: "ลงทะเบียนผู้ใช้สำเร็จ", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลงทะเบียน:", error);
    // ส่งข้อความข้อผิดพลาดกลับไป
    return NextResponse.json({ message: "เกิดข้อผิดพลาดจากระบบ" }, { status: 500 });
  } finally {
    // ปิดการเชื่อมต่อกับฐานข้อมูล
    await prisma.$disconnect();
  }
}
