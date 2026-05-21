"use client";

import { ShoppingBag, CreditCard, Phone, User, Calendar } from 'lucide-react';
import axios from 'axios';

const OrderTable = ({ orders, fetchOrders }) => {
  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/auth/orders/${id}/status`, { status });
      alert(`Order updated to status: ${status} Successfully! ✨`);
      
      if (fetchOrders) {
        fetchOrders(); // ✅ Calling parent tracking refresher instantly
      }
    } catch (err) {
      console.error("Status modify log error:", err);
      alert("Error processing operational status override");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-sm p-6 md:p-8 border-t-2 border-[#c4a457] animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[2px] text-[#1a2b4b] flex items-center gap-2">
          <ShoppingBag size={16} className="text-[#c4a457]" /> Pipeline Records ({orders?.length || 0})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#fbfbfb] text-[9px] font-bold uppercase text-gray-400 tracking-wider border-b border-gray-100">
            <tr>
              <th className="p-4">Client Detail Profile</th>
              <th className="p-4">Purchased Artifacts</th>
              <th className="p-4">Valuation Ledger</th>
              <th className="p-4 text-right">Workflow Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders && orders.length > 0 ? (
              orders.map(o => (
                <tr key={o._id} className="text-xs hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 space-y-1">
                    <div className="font-bold text-gray-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <User size={12} className="text-gray-400" /> {o.firstName} {o.lastName}
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1.5 uppercase">
                      <CreditCard size={11} className="text-[#c4a457]" /> {o.paymentMethod}
                    </div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1.5">
                      <Phone size={11} className="text-gray-400" /> {o.phone}
                    </div>
                    {o.city && <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 font-bold uppercase rounded-sm">{o.city}</span>}
                  </td>
                  
                  <td className="p-4 max-w-[280px]">
                    <p className="text-gray-600 font-serif italic line-clamp-2">
                      {o.items?.map(i => `${i.name} (x${i.quantity || 1})`).join(', ')}
                    </p>
                    <span className="text-[9px] text-gray-400 block mt-1">{o.address}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-serif font-bold text-[#1a2b4b]">Rs. {o.total?.toLocaleString()}</span>
                    <div className="text-[9px] text-gray-400 mt-0.5">Sub: Rs. {o.subtotal?.toLocaleString()}</div>
                  </td>

                  <td className="p-4 text-right">
                    <select 
                      value={o.status || "Pending"} 
                      onChange={(e) => updateStatus(o._id, e.target.value)} 
                      className={`border px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider outline-none rounded-sm transition-colors cursor-pointer ${
                        o.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-600' :
                        o.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                        'bg-amber-50 border-amber-200 text-amber-600'
                      }`}
                    >
                      <option value="Pending" className="bg-white text-amber-600 font-bold">Pending</option>
                      <option value="Shipped" className="bg-white text-blue-600 font-bold">Shipped</option>
                      <option value="Delivered" className="bg-white text-green-600 font-bold">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-12 text-center text-xs italic text-gray-400">
                  No boutique purchase requests currently logged.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;