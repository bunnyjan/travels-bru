"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
  
        if (data.places && data.places.length > 0) {
          const place = data.places[0];
          const route = place.category.toLowerCase(); // ใช้ category เพื่อกำหนดเส้นทางหน้าเพจ

          // นำทางไปยังหน้าเพจที่เหมาะสมตามหมวดหมู่ของสถานที่
          if (route === 'attraction') {
            router.push(`/attractions/${place.id}`);
          } else if (route === 'restaurant') {
            router.push(`/restaurant/${place.id}`);
          } else if (route === 'hotel') {
            router.push(`/hotel/${place.id}`);
          }
        } else {
          setError('ไม่พบผลลัพธ์สำหรับคำค้นหาของคุณ');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการค้นหา:', error);
        setError('เกิดข้อผิดพลาดในการค้นหา');
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#7AA2E3] p-3">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          โมโม๊ะเด้อ!!! บุรีรัมย์
        </h1>
        <Image src="/images/back.png" width={300} height={500} alt="logo" className="mb-2"/>
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-full max-w-lg">
          <input
            type="text"
            placeholder="ค้นหาสถานที่แหล่งท่องเที่ยว ร้านอาหาร คาเฟ่ ที่พัก"
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </main>
  );
}
