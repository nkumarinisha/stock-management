"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-gray-900 text-white p-4 flex gap-6">

      <Link href="/dashboard">Dashboard</Link>
      <Link href="/products">Products</Link>
      <Link href="/reports">Reports</Link>

    </div>
  );
}