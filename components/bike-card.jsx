import Image from "next/image";
import { getPriceList } from "@/lib/actions";
import Link from "next/link";
export default async function BikeCard({ scooter }) {
  const priceList = await getPriceList(scooter.id);
  return (
    <div className="shadow-md flex m-4 rounded-lg overflow-hidden">
      <div className="p-4">
        <Image
          src="https://images.unsplash.com/photo-1519750292352-c9fc17322ed7?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="scooter"
          width={100}
          height={200}
        />
      </div>
      <div className="p-4 flex flex-col">
        <Link href={`/${scooter.id}`}>
          <p className="text-xl font-semibold">
            {scooter.brand + " " + scooter.model + " " + scooter.power}
          </p>
        </Link>
        <div className="flex justify-between gap-6 items-center mt-4">
          <div>
            <p className="text-md">Weekday</p>
            {priceList
              .filter((price) => price.type === "Weekday")
              .map((price) => (
                <div key={price.id} className="flex justify-between gap-2">
                  <p className="text-xs font-semibold">{price.duration}</p>
                  <p className="text-xs text-gray-500">{price.price}</p>
                </div>
              ))}
          </div>
          <div>
            <p className="text-md">Weekend</p>
            {priceList
              .filter((price) => price.type === "Weekend")
              .map((price) => (
                <div key={price.id} className="flex justify-between gap-2">
                  <p className="text-xs font-semibold">{price.duration}</p>
                  <p className="text-xs text-gray-500">{price.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
