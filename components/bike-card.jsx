import Image from "next/image";
export default function BikeCard() {
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
        <p className="text-xl font-semibold">Honda Vario 125CC</p>
        <p className="text-sm text-gray-500">Full Automatic</p>
        <div className="flex justify-between gap-6 items-center mt-4">
          <div>
            <p className="text-md">Weekday</p>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold">3-5 Hours</p>
              <p className="text-xs text-gray-500">30RM</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold">5-8 Hours</p>
              <p className="text-xs text-gray-500">30RM</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold">24 Hours</p>
              <p className="text-xs text-gray-500">100RM</p>
            </div>
          </div>
          <div>
            <p className="text-md">Weekend</p>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold">3-5 Hours</p>
              <p className="text-xs text-gray-500">30RM</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold">5-8 Hours</p>
              <p className="text-xs text-gray-500">30RM</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold">24 Hours</p>
              <p className="text-xs text-gray-500">100RM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
