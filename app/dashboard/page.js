"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "products"));
    const list = data.docs.map((doc) => doc.data());
    setProducts(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SAFE DATA CALCULATIONS
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + (Number(p.quantity) || 0),
    0
  );

  const totalPurchaseValue = products.reduce(
    (sum, p) =>
      sum + (Number(p.quantity) || 0) * (Number(p.purchasePrice) || 0),
    0
  );

  const totalSellingValue = products.reduce(
    (sum, p) =>
      sum + (Number(p.quantity) || 0) * (Number(p.sellingPrice) || 0),
    0
  );

  const profit = totalSellingValue - totalPurchaseValue;

  const lowStock = products.filter(
    (p) => (Number(p.quantity) || 0) < 5
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center mb-6">
         Dashboard Overview
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-gray-500">Total Stock</h2>
          <p className="text-2xl font-bold">{totalStock}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-gray-500">Purchase Value</h2>
          <p className="text-2xl font-bold">
            ₹{totalPurchaseValue}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-gray-500">Selling Value</h2>
          <p className="text-2xl font-bold">
            ₹{totalSellingValue}
          </p>
        </div>

      </div>

      {/* PROFIT CARD */}
      <div className="bg-white shadow rounded-lg p-5 mb-6 text-center">
        <h2 className="text-gray-500">Total Profit</h2>
        <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
          ₹{profit}
        </p>
      </div>

      {/* LOW STOCK SECTION */}
      <div className="bg-white shadow rounded-lg p-5">

        <h2 className="text-lg font-bold mb-3 text-red-600">
          ⚠ Low Stock Alert
        </h2>

        {lowStock.length === 0 ? (
          <p className="text-gray-500">No low stock items</p>
        ) : (
          <div className="space-y-2">
            {lowStock.map((p, index) => (
              <div
                key={index}
                className="flex justify-between border-b py-2"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-red-600 font-bold">
                  {p.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}