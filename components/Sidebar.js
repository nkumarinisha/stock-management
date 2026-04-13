"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="h-screen w-60 bg-gray-900 text-white p-5 flex flex-col">

      {/* TITLE */}
      <h1 className="text-xl font-bold mb-6">
        📦 Stock Panel
      </h1>

      {/* MENU */}
      <div className="flex flex-col gap-3 flex-1">

        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-2 rounded ${
              pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}

      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="bg-red-600 p-2 rounded mt-auto"
      >
        Logout
      </button>

    </div>
  );
}