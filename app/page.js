import Image from "next/image";
import BikeCard from "@/components/bike-card";
import { getDataFromFirestore } from "@/lib/actions";
export default async function Home() {
  const allScooters = await getDataFromFirestore("bike-model");
  
  return (
    <div>
      {allScooters.map((scooter) => (
        <BikeCard key={scooter.id} scooter={scooter}></BikeCard>
      ))}

      
    </div>
  );
}
