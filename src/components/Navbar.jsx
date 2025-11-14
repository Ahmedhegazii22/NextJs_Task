import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        My Store
      </Link>
      <div className="flex gap-4">
        <Link href="/products">Products</Link>
        <Link href="/users">Users</Link>
        <Link href="/login" className="text-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
