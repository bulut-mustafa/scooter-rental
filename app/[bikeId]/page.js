import Image from "next/image";
import ClientForm from "@/components/client-form";
import { getBikeById, getPriceList } from "@/lib/actions";
export default async function FormPage({ params }) {
    
    const { bikeId } = await params;
    console.log("bikeId:", bikeId);

  const bike = await getBikeById(bikeId);
  const priceList = await getPriceList(bikeId);
  if (!bike) {
    return <p>No such bike found!</p>;
  }

  return (
    <>
      <div className="flex justify-center">
        <p className="m-4 text-xl font-semibold ">Customer Informations</p>
      </div>

      <p className="text-md ml-4 font-semibold">
        {bike.brand + " " + bike.model + " " + bike.power}
      </p>
      <ClientForm priceList={priceList} />
    </>
  );
}
