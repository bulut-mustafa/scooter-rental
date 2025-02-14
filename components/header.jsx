import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-center mt-8">Scooter Rental</h1>
        <div className="flex space-x-4 mt-8">
          <Link href={"/"}>Rental Page</Link>
          <Link href={"/admin-panel"}>Admin Panel</Link>
        </div>
      </div>
    </header>
  );
}
