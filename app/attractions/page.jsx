import prisma from '../../utils/db';
import Link from 'next/link';
import Image from 'next/image';

export default async function AttractionsPage() {

  const attractions = await prisma.place.findMany({
    where: { category: 'Attraction' },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">แหล่งท่องเที่ยว</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {attractions.map(attraction => (
          <div
            key={attraction.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <Link href={`/attractions/${attraction.id}`}>
              <div className="relative w-full h-48 cursor-pointer">
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform transform hover:scale-105"
                />
              </div>
              <div className="p-2">
                <h2 className="text-xl font-semibold mb-2">{attraction.name}</h2>
                <p className="text-gray-600">{attraction.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
