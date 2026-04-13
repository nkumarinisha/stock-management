"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Products() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    purchasePrice: "",
    sellingPrice: "",
  });

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "quantity" ||
        name === "purchasePrice" ||
        name === "sellingPrice"
          ? Number(value)
          : value,
    });
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      quantity: doc.data().quantity ?? 0,
    }));

    setProducts(list);
  };

  // ADD / UPDATE PRODUCT
  const addProduct = async () => {
    if (!form.name) return alert("Enter product name");

    const data = {
      ...form,
      quantity: Number(form.quantity || 0),
      purchasePrice: Number(form.purchasePrice || 0),
      sellingPrice: Number(form.sellingPrice || 0),
    };

    if (editId) {
      await updateDoc(doc(db, "products", editId), {
        ...data,
        lastUpdated: new Date(),
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "products"), {
        ...data,
        createdAt: new Date(),
        lastUpdated: new Date(),
      });
    }

    setForm({
      name: "",
      sku: "",
      category: "",
      quantity: 0,
      purchasePrice: "",
      sellingPrice: "",
    });

    fetchProducts();
  };

  // =========================
  // STEP 4: STOCK MANAGEMENT
  // =========================

  const stockIn = async (id, qty) => {
    await updateDoc(doc(db, "products", id), {
      quantity: Number(qty || 0) + 1,
      lastUpdated: new Date(),
    });

    fetchProducts();
  };

  const stockOut = async (id, qty) => {
    if ((qty || 0) <= 0) return alert("No stock left");

    await updateDoc(doc(db, "products", id), {
      quantity: Number(qty || 0) - 1,
      lastUpdated: new Date(),
    });

    fetchProducts();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  // EDIT PRODUCT
  const handleEdit = (p) => {
    setForm({
      name: p.name || "",
      sku: p.sku || "",
      category: p.category || "",
      quantity: p.quantity || 0,
      purchasePrice: p.purchasePrice || "",
      sellingPrice: p.sellingPrice || "",
    });

    setEditId(p.id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5 max-w-6xl mx-auto">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center mb-6">
         Stock Management System
      </h1>

      {/* FORM */}
      <div className="flex flex-wrap gap-2 mb-6 items-end">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded flex-1 min-w-[160px]"
        />

        <input
          name="sku"
          value={form.sku}
          onChange={handleChange}
          placeholder="SKU Code"
          className="border p-2 rounded flex-1 min-w-[120px]"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded flex-1 min-w-[120px]"
        />

        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Qty"
          className="border p-2 rounded w-24"
        />

        <input
          name="purchasePrice"
          type="number"
          value={form.purchasePrice}
          onChange={handleChange}
          placeholder="Buy ₹"
          className="border p-2 rounded w-28"
        />

        <input
          name="sellingPrice"
          type="number"
          value={form.sellingPrice}
          onChange={handleChange}
          placeholder="Sell ₹"
          className="border p-2 rounded w-28"
        />

        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>

      </div>

      {/* PRODUCT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-lg p-5"
          >

            {/* NAME */}
            <h2 className="text-xl font-bold mb-3">
              {p.name}
            </h2>

            {/* DETAILS */}
            <p className="text-gray-700">SKU: {p.sku}</p>
            <p className="text-gray-700">Category: {p.category}</p>
            <p className="text-gray-700">Quantity: {p.quantity}</p>
            <p className="text-gray-700">
              Purchase Price: ₹{p.purchasePrice}
            </p>
            <p className="text-gray-700 mb-2">
              Selling Price: ₹{p.sellingPrice}
            </p>

            {/* LAST UPDATED */}
            <p className="text-xs text-gray-400 mb-3">
              Last Updated:{" "}
              {p.lastUpdated
                ? new Date(
                    p.lastUpdated.seconds
                      ? p.lastUpdated.seconds * 1000
                      : p.lastUpdated
                  ).toLocaleString()
                : "N/A"}
            </p>

            {/* STEP 4 BUTTONS */}
            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() => stockIn(p.id, p.quantity)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() => stockOut(p.id, p.quantity)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                -
              </button>

              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-gray-800 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}