import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold">
          Blog
        </Link>
      </nav>
    </header>
  );
}
