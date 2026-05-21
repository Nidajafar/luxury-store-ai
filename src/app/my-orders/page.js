"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Package, Clock, Truck, CheckCircle2 } from 'lucide-react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const email = localStorage.getItem("customerEmail");
        
        if (!email) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/auth/orders/user?email=${email}`);
        setOrders(response.data.orders || response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not retrieve your luxury orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return { text: 'text-green-600 bg-green-50', icon: <CheckCircle2 size={14} /> };
      case 'shipped':
        return { text: 'text-blue-600 bg-blue-50', icon: <Truck size={14} /> };
      default:
        return { text: 'text-amber-600 bg-amber-50', icon: <Clock size={14} /> };
    }
  };

  if (loading) return <div className="text-center py-32 text-xs font-serif uppercase tracking-[3px] text-gray-400">Loading Order Ledger...</div>;

  if (!localStorage.getItem("customerEmail") || orders.length === 0) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <Package size={50} className="text-[#1a2b4b] opacity-20" />
        <h2 className="text-xl font-serif uppercase tracking-[4px] text-gray-400">No Orders Found</h2>
        <p className="text-xs text-gray-400 italic max-w-xs">You haven't placed any luxury selections under this session yet.</p>
        <Link href="/" className="border-b border-[#1a2b4b] pb-1 text-[10px] font-bold uppercase tracking-[2px] text-[#1a2b4b]">Return to Boutique</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[2px] text-gray-400 hover:text-black mb-12 transition-colors">
          <ArrowLeft size={12} /> Back to Gallery
        </Link>

        <h1 className="text-3xl font-serif text-[#1a2b4b] uppercase tracking-[5px] mb-12">Your Order Ledger</h1>

        <div className="space-y-8">
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            return (
              <div key={order._id} className="bg-white border border-gray-100 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                
    
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Order Reference</p>
                    <p className="font-mono text-xs text-gray-700 mt-1">#{order._id?.slice(-8).toUpperCase()}</p>
                  </div>
                  
        
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle.text}`}>
                    {statusStyle.icon}
                    {order.status || 'Pending'}
                  </div>
                </div>

                                <div className="divide-y divide-gray-50">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 text-xs">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-50 border p-1 flex items-center justify-center rounded-sm">
                          <img src={item.image || 'https://via.placeholder.com/100'} className="max-h-full max-w-full object-contain" alt="" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 uppercase tracking-wide">{item.name}</p>
                          <p className="text-[10px] text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-serif font-medium text-gray-700">Rs. {item.price?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

            
                <div className="border-t border-dashed pt-4 flex justify-between items-center text-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Investment</span>
                  <span className="text-base font-serif font-bold text-[#c4a457]">Rs. {order.total?.toLocaleString()}</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default MyOrdersPage;