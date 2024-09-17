import prisma from '../../utils/db';
import Link from 'next/link';
import Image from 'next/image';

export default async function RestaurantPage() {
 
  const restaurant = await prisma.place.findMany({
    where: { category: 'Restaurant' },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">ร้านอาหาร/คาเฟ่</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurant.map(restaurant => (
          <div
            key={restaurant.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <Link href={`/restaurant/${restaurant.id}`}>
              <div className="relative w-full h-48 cursor-pointer">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600">{restaurant.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}