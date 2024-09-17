"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CommentSection from '../../components/CommentSection'; // ตรวจสอบ path ให้ถูกต้อง

export default function RestaurantDetail({ params }) {
  const { id } = params;
  const [restaurant, setRestaurant] = useState(null);
  const [user, setUser] = useState(null); // สถานะเพื่อเก็บข้อมูลผู้ใช้
  const router = useRouter();

  useEffect(() => {
    // ดึงข้อมูลร้านอาหาร
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`/api/restaurant/${id}`);
        const data = await res.json();
        setRestaurant(data.restaurant);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลร้านอาหาร:', error);
      }
    };

    fetchRestaurant();

    // ดึงข้อมูลผู้ใช้จาก localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [id]);

  const handleSubmitComment = async (comment) => {
    if (!comment.text.trim()) {
      alert('กรุณาใส่ความคิดเห็น');
      return;
    }

    // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
    if (!user) {
      alert('คุณต้องเข้าสู่ระบบก่อนที่จะส่งความคิดเห็น');
      return;
    }

    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: comment.text,
          rating: comment.rating,
          placeId: id,
          userId: user.id, // ส่ง ID ของผู้ใช้
        }),
      });

      // อัปเดตรายการความคิดเห็นในคอมโพเนนต์หลัก
      setRestaurant(prev => ({
        ...prev,
        comments: [...prev.comments, { text: comment.text, rating: comment.rating, user: { name: user.name } }],
      }));
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งความคิดเห็น:', error);
      alert('เกิดข้อผิดพลาดในการส่งความคิดเห็น');
    }
  };

  if (!restaurant) return <p>กำลังโหลด...</p>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/restaurant" className="text-blue-500 underline mb-4 inline-block border border-blue-500 rounded-lg px-3 py-1 hover:bg-blue-500 hover:text-white">
        &larr; กลับ
      </Link>
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <div className="flex flex-col md:flex-row items-start">
        <div className="relative w-full md:w-1/2 max-w-md h-60 md:h-auto mb-4">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            layout="intrinsic"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1>รายละเอียด</h1>
          <p className="text-gray-700">{restaurant.description}</p>
          <h1>ที่อยู่</h1>
          <p className="text-gray-700">{restaurant.address}</p>
          <h1>เวลาทำการ</h1>
          <p className="text-gray-700">{restaurant.opentime}</p>
          <p className="text-gray-700">
            <a 
              href={restaurant.googleMaps} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 underline hover:text-blue-700"
            >
              ดูแผนที่
            </a>
          </p>
        </div>
      </div>

      {/* ส่วนความคิดเห็นจะอยู่ด้านล่างของเนื้อหา */}
      <div className="mt-6">
        <CommentSection
          comments={restaurant.comments || []}
          user={user}
          onSubmit={handleSubmitComment}
        />
      </div>
    </div>
  );
}
