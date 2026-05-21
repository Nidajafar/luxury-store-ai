"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import InventoryManager from "@/components/InventoryManger";
import OrderTable from "@/components/OrderTable";
import AdminReviewManager from "@/components/AdminReviewManager";

const Admin = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || {});

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
      return;
    }

    setLoading(false);
  }, [user]);

  const refreshData = async () => {
    try {
      const [p, o] = await Promise.all([
        fetch("/api/auth/product"),
        fetch("/api/auth/orders/all"),
      ]);

      setProducts(await p.json());
      setOrders(await o.json());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex gap-6 border-b mb-6">

        <button onClick={() => setActiveTab("products")}>
          Products ({products.length})
        </button>

        <button onClick={() => setActiveTab("orders")}>
          Orders ({orders.length})
        </button>

        <button onClick={() => setActiveTab("reviews")}>
          Reviews
        </button>

      </div>

      {activeTab === "products" && (
        <InventoryManager fetchData={refreshData} />
      )}

      {activeTab === "orders" && (
        <OrderTable orders={orders} fetchOrders={refreshData} />
      )}

      {activeTab === "reviews" && (
        <AdminReviewManager />
      )}
    </div>
  );
}
export default Admin; 