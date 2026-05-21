"use client";

import { Suspense, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Star,
  Package,
} from "lucide-react";
import axios from "axios";

function CartContent() {
  const [mounted, setMounted] = useState(false);

  // ✅ FIXED NEXTJS BUILD ERROR
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "bag";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantities, setQuantities] = useState({});

  // ✅ CURRENT USER EMAIL
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    setMounted(true);

    // ✅ USER SPECIFIC LOGIN DATA
    const userInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    const email = userInfo?.email || "";

    setCustomerEmail(email);

    if (email) {
      autoFetchLiveOrders(email);
    }
  }, []);

  // ✅ USER SPECIFIC ORDERS
  const autoFetchLiveOrders = async (emailStr) => {
    if (!emailStr) return;

    setTrackingLoading(true);

    try {
      const res = await axios.get(
        `/api/auth/orders/user?email=${emailStr
          .trim()
          .toLowerCase()}`
      );

      const data = res.data;

      if (data?.orders) {
        setFetchedOrders(data.orders);
      } else if (Array.isArray(data)) {
        setFetchedOrders(data);
      } else {
        setFetchedOrders([]);
      }
    } catch (err) {
      console.error("Error pulling live sequence:", err);
      setFetchedOrders([]);
    } finally {
      setTrackingLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="text-center py-20 text-gray-400 font-serif tracking-widest">
        Loading Boutique Space...
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.price * (quantities[item._id] || 1),
    0
  );

  const shipping =
    subtotal > 15000 || subtotal === 0 ? 0 : 500;

  const total = subtotal + shipping;

  const handleQuantity = (id, type) => {
    setQuantities((prev) => ({
      ...prev,
      [id]:
        type === "plus"
          ? (prev[id] || 1) + 1
          : Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 font-sans">

      {/* NAVIGATION */}
      <div className="flex justify-center border-b border-gray-100 mb-12 gap-2 sm:gap-8">

        <button
          onClick={() => setActiveTab("bag")}
          className={`pb-4 px-2 text-xs uppercase font-bold tracking-[2px] flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "bag"
              ? "border-[#1a2b4b] text-[#1a2b4b]"
              : "border-transparent text-gray-400"
          }`}
        >
          <ShoppingBag size={14} />
          My Bag ({cartItems.length})
        </button>

        <button
          onClick={() => setActiveTab("track")}
          className={`pb-4 px-2 text-xs uppercase font-bold tracking-[2px] flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "track"
              ? "border-[#1a2b4b] text-[#1a2b4b]"
              : "border-transparent text-gray-400"
          }`}
        >
          <Truck size={14} />
          Your Orders & Status
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 px-2 text-xs uppercase font-bold tracking-[2px] flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "reviews"
              ? "border-[#1a2b4b] text-[#1a2b4b]"
              : "border-transparent text-gray-400"
          }`}
        >
          <Star size={14} />
          Product Reviews
        </button>
      </div>

      {/* BAG TAB */}
      {activeTab === "bag" &&
        (cartItems.length === 0 ? (
          <div className="h-[50vh] flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-serif uppercase tracking-[4px] text-gray-400">
              Your Selection is Empty
            </h2>

            <Link
              href="/"
              className="border-b border-[#1a2b4b] text-xs font-bold uppercase tracking-[1px] text-[#1a2b4b]"
            >
              Back to Gallery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* CART ITEMS */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 bg-white p-4 rounded-sm shadow-sm"
                >
                  <div className="w-20 h-20 border flex-shrink-0 p-1">
                    <img
                      src={item.images?.[0] || item.image}
                      className="w-full h-full object-contain"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-serif uppercase text-xs font-bold tracking-wider text-[#1a2b4b]">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1 font-serif">
                      Rs. {item.price?.toLocaleString()}
                    </p>

                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item._id))
                      }
                      className="text-[10px] text-red-400 mt-2 uppercase tracking-widest hover:text-red-600 inline-flex items-center gap-1"
                    >
                      <Trash2 size={11} />
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center border rounded-full px-3 py-0.5 gap-3">
                    <button
                      onClick={() =>
                        handleQuantity(item._id, "minus")
                      }
                    >
                      <Minus size={12} />
                    </button>

                    <span className="text-xs font-bold">
                      {quantities[item._id] || 1}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantity(item._id, "plus")
                      }
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="lg:col-span-4">
              <div className="bg-[#fcfcfc] border border-gray-100 p-6 rounded-sm shadow-sm">

                <h3 className="font-serif uppercase text-xs tracking-wider text-[#1a2b4b] border-b pb-2 mb-4">
                  Summary
                </h3>

                <div className="space-y-3 text-xs">

                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>
                      Rs. {subtotal?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0
                        ? "Complimentary"
                        : `Rs. ${shipping}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t flex justify-between font-bold text-[#1a2b4b]">
                    <span>Total</span>
                    <span>
                      Rs. {total?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full mt-6 bg-[#1a2b4b] text-white py-3 text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  Secure Checkout
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

      {/* TRACK ORDERS */}
      {activeTab === "track" && (
        <div className="max-w-4xl mx-auto">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-serif uppercase tracking-[2px] text-[#1a2b4b]">
              Your Purchased Masterpieces
            </h2>

            <span className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              Live Synchronized
            </span>
          </div>

          {trackingLoading ? (
            <p className="text-center text-xs text-gray-400 italic py-10">
              Accessing your premium collection state...
            </p>
          ) : fetchedOrders.length > 0 ? (
            <div className="space-y-6">

              {fetchedOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm"
                >

                  <div className="space-y-4 mb-6">

                    {order.items?.map((product, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-4 bg-gray-50/50 p-3 border border-dashed rounded-sm"
                      >

                        <div className="w-12 h-12 bg-white border flex items-center justify-center p-1 rounded-sm">
                          <img
                            src={
                              product.image ||
                              product.images?.[0]
                            }
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-xs font-serif font-bold text-[#1a2b4b] uppercase">
                            {product.name}
                          </h4>

                          <p className="text-[10px] text-gray-400">
                            Qty: {product.quantity || 1}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-amber-50 text-amber-600 border border-amber-200">
                            {order.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RETURN BUTTON */}
                  {!order.returnRequested &&
                    order.status === "Delivered" && (
                      <button
                        onClick={async () => {
                          try {
                            await axios.put(
                              `/api/auth/orders/return/${order._id}`
                            );

                            autoFetchLiveOrders(
                              customerEmail
                            );

                            alert(
                              "Return request submitted"
                            );
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className="px-3 py-2 text-[10px] uppercase bg-black text-white rounded"
                      >
                        Return Order
                      </button>
                    )}

                  {/* CANCEL BUTTON */}
                  {!order.cancelRequested &&
                    order.status === "Pending" && (
                      <button
                        onClick={async () => {
                          try {
                            await axios.put(
                              `/api/auth/orders/cancel/${order._id}`
                            );

                            autoFetchLiveOrders(
                              customerEmail
                            );

                            alert(
                              "Cancellation request submitted"
                            );
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className="px-3 py-2 text-[10px] uppercase bg-red-500 text-white rounded"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-sm bg-white">
              <Package
                size={32}
                className="mx-auto text-gray-300 mb-2"
              />

              <p className="text-xs text-gray-400 italic">
                No luxury vaults linked with your identity yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* REVIEWS */}
      {activeTab === "reviews" && (
        <div className="max-w-xl mx-auto bg-white border border-gray-100 p-6 rounded-sm shadow-sm">
          Reviews Section
        </div>
      )}
    </div>
  );
}


export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}