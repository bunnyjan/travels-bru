import React from 'react'
import Image from 'next/image'

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-stone-950 mb-4">ผู้จัดทำ</h1>
      <Image 
        src="/images/contag.png" 
        width={300} 
        height={300} 
        alt="logo" 
        className="mb-6 rounded-full shadow-lg" 
      />
      <div className="text-lg text-gray-700">
        <p className="mb-2">650112418069</p>
        <p className="mb-2">650112418074</p>
        <p className="mb-2">650112418085</p>
      </div>
    </div>
  )
}

export default AboutPage
