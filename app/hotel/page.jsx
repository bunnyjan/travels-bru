import prisma from '../../utils/db';
import Link from 'next/link';
import Image from 'next/image';

export default async function HotelPage() {

  const hotel = await prisma.place.findMany({
    where: { category: 'Hotel' },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">ที่พัก</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotel.map(hotel => (
          <div
            key={hotel.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <Link href={`/hotel/${hotel.id}`}>
              <div className="relative w-full h-48 cursor-pointer">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
