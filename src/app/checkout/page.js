"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { CreditCard, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import axios from "axios";

const CheckoutPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();


  const cartItems = useSelector((state) => state.cart?.items || []);

  
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "COD", // Default Cash on Delivery
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedEmail = localStorage.getItem("customerEmail");
    if (savedEmail) {
      setCheckoutForm((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  if (!mounted) return <div className="text-center py-20 text-gray-400 font-serif">Loading Checkout Vault...</div>;

  //calculate subtotal, shipping, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + shipping;

  // input change handler for form fields
  const handleChange = (e) => {
    setCheckoutForm({ ...checkoutForm, [e.target.name]: e.target.value });
  };

  
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your luxury bag is empty.");
      return;
    }

    setLoading(true);

    try {
      
      const orderPayload = {
        firstName: checkoutForm.firstName,
        lastName: checkoutForm.lastName,
        email: checkoutForm.email.trim().toLowerCase(),
        userEmail: checkoutForm.email.trim().toLowerCase(), 
        phone: checkoutForm.phone,
        address: checkoutForm.address,
        city: checkoutForm.city,
        paymentMethod: checkoutForm.paymentMethod,
        items: cartItems.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.images?.[0] || item.image,
        })),
        subtotal: subtotal,
        total: total,
        status: "Pending",
      };

      
      const res = await axios.post("/api/auth/orders/create", orderPayload);

      if (res.status === 201 || res.status === 200) {
        
        
        localStorage.setItem("customerEmail", checkoutForm.email.trim().toLowerCase());

         
        dispatch(clearCart());

        alert("Artifact Ordered Successfully! Your luxury sequence has been initialized. ✨");
        
         
        router.push("/cart?tab=track"); 
      }
    } catch (err) {
      console.error("Order Creation Error Fail:", err);
      alert(err.response?.data?.message || "Operational workflow blocked. Could not archive order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
               <div className="lg:col-span-7 bg-white p-6 border border-gray-100 rounded-sm shadow-2xs">
          <h2 className="text-xs font-serif font-bold uppercase tracking-[2px] text-[#1a2b4b] mb-6 border-b pb-2 flex items-center gap-2">
            <Truck size={14} className="text-[#c4a457]" /> Shipping & Bespoke Ledger
          </h2>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">First Name</label>
                <input required type="text" name="firstName" value={checkoutForm.firstName} onChange={handleChange} className="w-full border p-2.5 text-xs rounded-sm outline-none bg-gray-50/30 focus:border-[#1a2b4b]" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Last Name</label>
                <input required type="text" name="lastName" value={checkoutForm.lastName} onChange={handleChange} className="w-full border p-2.5 text-xs rounded-sm outline-none bg-gray-50/30 focus:border-[#1a2b4b]" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Secure Email (For Order Tracking)</label>
              <input required type="email" name="email" value={checkoutForm.email} onChange={handleChange} className="w-full border p-2.5 text-xs rounded-sm outline-none bg-gray-50/30 focus:border-[#1a2b4b]" placeholder="e.g. nidajafar123@gmail.com" />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Active Contact Number</label>
              <input required type="tel" name="phone" value={checkoutForm.phone} onChange={handleChange} className="w-full border p-2.5 text-xs rounded-sm outline-none bg-gray-50/30 focus:border-[#1a2b4b]" placeholder="03xxxxxxxxx" />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Bespoke Shipping Address</label>
              <textarea required name="address" value={checkoutForm.address} onChange={handleChange} rows="3" className="w-full border p-2.5 text-xs rounded-sm outline-none bg-gray-50/30 focus:border-[#1a2b4b] resize-none" placeholder="House number, Street, Area..."></textarea>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Destination City</label>
              <input required type="text" name="city" value={checkoutForm.city} onChange={handleChange} className="w-full border p-2.5 text-xs rounded-sm outline-none bg-gray-50/30 focus:border-[#1a2b4b]" placeholder="Karachi, Lahore, Islamabad..." />
            </div>

            <div className="pt-4">
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Payment Paradigm</label>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: "COD"})} className={`border p-4 rounded-sm flex items-center gap-3 cursor-pointer transition-all ${checkoutForm.paymentMethod === 'COD' ? 'border-[#1a2b4b] bg-[#1a2b4b]/5' : 'bg-gray-50/50'}`}>
                  <input type="radio" checked={checkoutForm.paymentMethod === "COD"} readOnly className="accent-[#1a2b4b]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1a2b4b]">Cash On Delivery</span>
                </div>
                <div className="border p-4 rounded-sm flex items-center gap-3 opacity-50 cursor-not-allowed bg-gray-100">
                  <CreditCard size={16} className="text-gray-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Card (Disabled)</span>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-6 bg-[#1a2b4b] hover:bg-black text-white py-3.5 text-xs font-bold uppercase tracking-[2px] transition-all shadow-md flex items-center justify-center gap-2">
              {loading ? "Archiving Vault Sequence..." : "Authorize Artisan Order Place"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#fcfcfc] border border-gray-100 p-6 rounded-sm shadow-2xs sticky top-6">
            <h3 className="font-serif uppercase text-xs font-bold tracking-[2px] text-[#1a2b4b] border-b pb-3 mb-4 flex items-center gap-2">
              <ShoppingBag size={14} className="text-[#c4a457]" /> Vault Summary
            </h3>

            
            <div className="divide-y max-h-[260px] overflow-y-auto pr-2 mb-4 space-y-3">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 pt-3 first:pt-0">
                  <div className="w-12 h-12 border bg-white p-1 rounded-sm flex-shrink-0">
                    <img src={item.images?.[0] || item.image} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-[11px] font-bold text-gray-700 uppercase line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-gray-400">Qty: {item.quantity || 1} • Rs. {item.price?.toLocaleString()}</p>
                  </div>
                  <span className="text-xs font-bold text-[#1a2b4b]">Rs. {(item.price * (item.quantity || 1))?.toLocaleString()}</span>
                </div>
              ))}
            </div>

            
            <div className="border-t pt-4 space-y-3 text-xs border-dashed">
              <div className="flex justify-between text-gray-500"><span>Bespoke Subtotal</span><span>Rs. {subtotal?.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>Premium Secure Shipping</span><span>{shipping === 0 ? "Complimentary" : `Rs. ${shipping}`}</span></div>
              <div className="pt-3 border-t flex justify-between text-sm font-serif font-bold text-[#1a2b4b]"><span>Grand Valuation</span><span>Rs. {total?.toLocaleString()}</span></div>
            </div>

            <div className="mt-6 bg-gray-50 border border-gray-100 p-3 rounded-sm flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-[#c4a457] mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-gray-400 leading-relaxed">Your data transaction is wrapped under automated server ledgers. Security level active.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;