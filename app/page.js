import Image from "next/image";
import BikeCard from "@/components/bike-card";
import { getDataFromFirestore } from "@/lib/actions";
export default async function Home() {
  const allScooters = await getDataFromFirestore("bike-model");
  
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8">Bike Rental</h1>
      {allScooters.map((scooter) => (
        <BikeCard key={scooter.id} scooter={scooter}></BikeCard>
      ))}

      
    </div>
  );
}
