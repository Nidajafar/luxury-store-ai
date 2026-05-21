"use client";
import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
// //Redux Provider (Next.js Special Step)
// Next.js App Router mein hum direct layout.js mein Provider nahi daal sakte kyunki wo Server Component hota hai. Isliye hum ek alag file banate hain.

// src/redux/Provider.js