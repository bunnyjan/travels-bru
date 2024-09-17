"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.replace("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='container mx-auto p-6 bg-white rounded-md shadow-md w-full max-w-md'>
        <h3 className='text-black text-center text-2xl mb-4'>เข้าสู่ระบบ</h3>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full bg-gray-200 p-2 my-3 rounded-md'
            type='email'
            placeholder='อีเมล'
            value={email}
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full bg-gray-200 p-2 my-3 rounded-md'
            type='password'
            placeholder='รหัสผ่าน'
            value={password}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
        <p className='text-center p-2 mt-4'>
          ยังไม่มีบัญชี <Link className='text-blue-600 underline' href='/register'>สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
