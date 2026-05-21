"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusCircle,
  Package,
  Image as ImageIcon,
  Trash2,
  Pencil,
} from "lucide-react";
import { navData } from "@/data/navData";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const emptyProduct = {
    name: "",
    description: "",
    price: "",
    category: navData[0]?.title || "gold",
    subCategory: "",
    images: [],
    specifications: {
      metal: "",
      weight: "",
      carat: "",
      diamondQuality: "",
      movement: "",
      material: "",
    },
  };

  const [product, setProduct] = useState(emptyProduct);

  // FETCH PRODUCTS
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/auth/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SUBCATEGORIES
  const getSubCategories = () => {
    const selectedCat = navData.find(
      (c) => c.title.toLowerCase() === product.category.toLowerCase()
    );

    if (!selectedCat) return [];

    if (selectedCat.isNested) {
      let items = [];
      selectedCat.subCategories.forEach((sub) => {
        items = [...items, ...sub.items];
      });
      return items;
    }

    return selectedCat.subCategories;
  };

  // IMAGE UPLOAD
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadingImages(true);

    const uploadedUrls = [...product.images];

    const cloudName = "drhrtyfdt";
    const uploadPreset = "diamond-shop";

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }

      setProduct((prev) => ({
        ...prev,
        images: uploadedUrls,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploadingImages(false);
    }
  };

  // EDIT
  const handleEdit = (p) => {
    setEditId(p._id);
    setProduct({
      ...p,
      subCategory: p.subCategory?.toLowerCase(),
      category: p.category?.toLowerCase(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.images.length) return alert("Upload images first");

    setLoading(true);

    try {
      const cleanProduct = {
        ...product,
        category: product.category.toLowerCase().trim(),
        subCategory: product.subCategory
          .toLowerCase()
          .replaceAll("-", " ")
          .trim(),
      };

      if (editId) {
        await axios.put(`/api/auth/product/${editId}`, cleanProduct);
        alert("Product Updated");
      } else {
        await axios.post("/api/auth/product", cleanProduct);
        alert("Product Added");
      }

      fetchData();
      setProduct(emptyProduct);
      setEditId(null);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;

    try {
      await axios.delete(`/api/auth/product/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (fetchLoading) {
    return (
      <div className="text-center py-20 text-gray-400">
        LOADING INVENTORY...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">

      {/* FORM */}
      <div className="bg-white p-6 shadow-lg lg:col-span-1">
        <h2 className="font-bold mb-4 flex gap-2 items-center">
          <PlusCircle size={18} />
          {editId ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            className="w-full border-b p-2"
            required
          />

          {/* CATEGORY */}
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
                category: e.target.value.toLowerCase(),
              })
            }
            className="w-full border-b p-2"
          >
            {navData.map((c, i) => (
              <option key={i} value={c.title.toLowerCase()}>
                {c.title}
              </option>
            ))}
          </select>

          {/* SUBCATEGORY */}
          <select
            value={product.subCategory}
            onChange={(e) =>
              setProduct({
                ...product,
                subCategory: e.target.value
                  .toLowerCase()
                  .replaceAll("-", " ")
                  .trim(),
              })
            }
            className="w-full border-b p-2"
            required
          >
            <option value="">Sub Category</option>

            {getSubCategories().map((sub, i) => (
              <option
                key={i}
                value={sub.name?.toLowerCase().replaceAll("-", " ")}
              >
                {sub.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="w-full border-b p-2"
            required
          />

          <textarea
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full border-b p-2"
          />

          {/* IMAGE UPLOAD */}
          <div className="border p-3 text-center">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              disabled={uploadingImages}
            />
          </div>

          <button
            disabled={loading || uploadingImages}
            className="w-full bg-black text-white py-2"
          >
            {loading
              ? "Saving..."
              : uploadingImages
              ? "Uploading..."
              : editId
              ? "Update"
              : "Add"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="lg:col-span-2 bg-white p-6">
        <h2 className="font-bold mb-4 flex gap-2 items-center">
          <Package size={18} />
          Inventory ({products.length})
        </h2>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex justify-between border p-3"
            >
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-xs text-gray-500">
                  {p.category} | {p.subCategory}
                </p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(p._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;