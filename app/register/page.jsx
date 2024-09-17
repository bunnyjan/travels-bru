"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("ลงทะเบียนเรียบร้อย")
        form.reset();
      } else {
        setError("ลงทะเบียนล้มเหลว");
      }

    } catch (error) {
      console.log("error during register", error);
      setError("เกิดข้อผิดพลาดขณะลงทะเบียน");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-md shadow-md w-full max-w-md'>
        <h3 className='text-black text-center text-2xl mb-4'>ลงทะเบียนเข้าใช้งาน</h3>
        <form onSubmit={handleSubmit}>
          
          {error && (
            <div className='bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}

          {success && (
            <div className='bg-green-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {success}
            </div>
          )}
          
          <input
            onChange={(e) => setName(e.target.value)}
            className='block w-full bg-gray-200 p-2 my-3 rounded-md'
            type='text'
            placeholder='ชื่อ-สกุล'
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full bg-gray-200 p-2 my-3 rounded-md'
            type='email'
            placeholder='อีเมล'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full bg-gray-200 p-2 my-3 rounded-md'
            type='password'
            placeholder='รหัสผ่าน'
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='block w-full bg-gray-200 p-2 my-3 rounded-md'
            type='password'
            placeholder='ยืนยันรหัสผ่าน'
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            ลงทะเบียน
          </button>
        </form>
        <div className='text-center mt-4'>
          <Link href='/login' className='text-blue-600 underline'>
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
