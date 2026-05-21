import { motion } from "framer-motion";
import { label } from "framer-motion/client";
import { Code, Sigma, User, Gem, Sparkles, DollarSign } from "lucide-react";

export default function QuickActions({ onActionClick }) {
  const actions = [
    // 💎 Luxury Jewelry Boutique Actions
    { 
      label: "View Diamond Rings", 
      icon: <Gem size={14} />, 
      query: "Show me the available diamond engagement rings in your premium collection." 
    },
    { 
      label: "Gold Jewellery Deals", 
      icon: <DollarSign size={14} />, 
      query: "What gold items or nose pins do you have, and what are their prices?" 
    },
    { 
      label: "Check Stock Status", 
      icon: <Sparkles size={14} />, 
      query: "Is the Emerald Bracelet in stock? If not, what else do you suggest?" 
    },

      {
        label:"silver jewellery",
        icon:<Gem size={14}/>,
        query:"Do you have any silver jewelry pieces available? If so, what are they?"
      },
      {
        label:"Accessories",
        icon:<Sparkles size={14}/>,
        query:"What luxury accessories do you have in your collection?"
      },
      
  ];

  return (
    <div className="flex flex-wrap gap-2 px-6 mb-4 max-h-[120px] overflow-y-auto scrollbar-hide py-1">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onActionClick(action.query)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-300 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all font-bold uppercase tracking-widest shadow-sm"
        >
          <span className="text-cyan-400">{action.icon}</span>
          {action.label}
        </motion.button>
      ))}
    </div>
  );
}