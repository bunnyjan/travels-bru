"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/'); // ไปยังหน้าแรกหรือหน้าอื่นๆ ที่ต้องการ
  };

  return (
    <nav className='bg-[#E2DAD6] text-[#333] p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <div>
          <Link href="/">
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
          </Link>
        </div>
        <ul className='flex space-x-4'>
          <li><Link href="/">หน้าแรก</Link></li>
          <li><Link href="/attractions">แหล่งท่องเที่ยว</Link></li>
          <li><Link href="/restaurant">ร้านอาหาร</Link></li>
          <li><Link href="/hotel">ที่พัก</Link></li>
          <li><Link href="/about">ติดต่อเรา</Link></li>
          {user ? (
            <>
              <li>สวัสดี, {user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className='bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 transition'
                >
                  ออกจากระบบ
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login">เข้าสู่ระบบ</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
