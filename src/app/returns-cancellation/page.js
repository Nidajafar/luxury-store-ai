"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, RefreshCw, AlertTriangle, ChevronDown, XCircle, Package } from "lucide-react";
import axios from "axios";

const ReturnsCancellationPage = () => {
  const [openPolicy, setOpenPolicy] = useState(null);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const savedEmail = localStorage.getItem("customerEmail") || "nidajafar123@gmail.com";
    if (savedEmail) {
      autoFetchOrders(savedEmail);
    }
  }, []);

  const autoFetchOrders = async (emailStr) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/auth/orders/user?email=${emailStr.trim().toLowerCase()}`);
      
      const data = res.data;
      if (data && data.orders) {
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
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to revoke this artisan jewelry order?");
    if (!confirmCancel) return;

    try {
      await axios.put(`/api/auth/orders/${orderId}/status`, { status: "Cancelled" });
      alert("Order cancelled successfully. ✨");
      const savedEmail = localStorage.getItem("customerEmail") || "nidajafar123@gmail.com";
      autoFetchOrders(savedEmail);
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Could not process cancellation at this stage.");
    }
  };

  const togglePolicy = (index) => {
    setOpenPolicy(openPolicy === index ? null : index);
  };

  const policies = [
    { title: "1. 7-Day Luxury Return Policy", icon: <RefreshCw size={18} className="text-[#e3a20a]" />, content: "We offer a flawless 7-day return window for all standard jewelry items..." },
    { title: "2. Cancellation Terms (Before Dispatch)", icon: <AlertTriangle size={18} className="text-[#e3a20a]" />, content: "You can request an immediate cancellation within 12 hours of placing your order..." }
  ];

  return (
    <div className="bg-[#fafbfc] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-[#1a2b4b] uppercase">
            Order Revocation & Returns
          </h1>
          <div className="h-[1px] w-20 bg-[#e3a20a] mx-auto mt-3 mb-2"></div>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm mb-12">
          <h2 className="text-xs font-serif font-bold uppercase tracking-[2px] text-[#1a2b4b] mb-6 border-b pb-2">
            Your Active Open Orders
          </h2>

          {loading ? (
            <p className="text-center text-xs text-gray-400 italic">Reading your luxury vault logs...</p>
          ) : fetchedOrders.length > 0 ? (
            <div className="space-y-6">
              {fetchedOrders.map((order) => {
                const isPending = (order.status || 'Pending').toLowerCase() === 'pending';
                const isCancelled = (order.status || '').toLowerCase() === 'cancelled';

                return (
                  <div key={order._id} className="border p-4 rounded-sm bg-gray-50/30 flex flex-col space-y-4">
                    
                    <div className="space-y-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white p-3 border rounded-sm">
                          <div className="w-12 h-12 border flex items-center justify-center p-1 bg-gray-50">
                            <img src={item.image || item.images?.[0] || 'https://via.placeholder.com/150'} className="w-full h-full object-contain" alt="" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-xs font-serif font-bold text-[#1a2b4b] uppercase">{item.name || "Luxury Jewel Piece"}</h4>
                            <p className="text-[10px] text-gray-400">Quantity: {item.quantity || 1} • Total: Rs. {item.price?.toLocaleString()}</p>
                          </div>
                          
                          <div className="text-right">
                            {isPending && !isCancelled ? (
                              <button 
                                onClick={() => handleCancelOrder(order._id)}
                                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors"
                              >
                                <XCircle size={10} /> Cancel Piece
                              </button>
                            ) : isCancelled ? (
                              <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2 py-1 border border-red-200 rounded-sm">Cancelled</span>
                            ) : (
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-sm">Handed to Courier</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 px-1">
                      <span>Order Reference: #{order._id?.slice(-8).toUpperCase()}</span>
                      <span className="font-bold text-[#1a2b4b]">Grand Total: Rs. {order.total?.toLocaleString()}</span>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-sm bg-white">
              <Package size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-xs text-gray-400 italic">No products found under your active login session.</p>
            </div>
          )}
        </div>

        {/* Policies Accordion */}
        <div className="space-y-4">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
              <button onClick={() => togglePolicy(index)} className="w-full flex justify-between items-center p-4 text-left focus:outline-none">
                <div className="flex items-center gap-3">{policy.icon}<span className="text-xs font-serif font-bold uppercase tracking-wide text-[#1a2b4b]">{policy.title}</span></div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${openPolicy === index ? "rotate-180" : ""}`} />
              </button>
              <div className={`transition-all overflow-hidden ${openPolicy === index ? "max-h-40 border-t" : "max-h-0"}`}>
                <div className="p-4 text-xs text-gray-500 bg-gray-50/50">{policy.content}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReturnsCancellationPage;