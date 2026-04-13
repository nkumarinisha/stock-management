"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Reports() {
  const [products, setProducts] = useState([]);

  // FETCH DATA
  const fetchData = async () => {
    const data = await getDocs(collection(db, "products"));

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center mb-6">
         Basic Reports
      </h1>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Current Quantity</th>
              <th className="p-3 text-left">Last Updated</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {products.map((p) => (
              <tr key={p.id} className="border-b">

                {/* NAME */}
                <td className="p-3 font-medium">
                  {p.name}
                </td>

                {/* QUANTITY */}
                <td className="p-3">
                  {p.quantity}
                </td>

                {/* LAST UPDATED */}
                <td className="p-3 text-gray-600">

                  {p.lastUpdated
                    ? new Date(
                        p.lastUpdated.seconds
                          ? p.lastUpdated.seconds * 1000
                          : p.lastUpdated
                      ).toLocaleString()
                    : "N/A"}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}