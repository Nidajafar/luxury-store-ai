"use client";

import { useState, useEffect } from "react";

export function useChatStorage() {
  const [messages, setMessages] = useState([]);
  const [storageKey, setStorageKey] = useState(null);

  // CREATE UNIQUE CHAT KEY FOR EACH USER


  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        const user = JSON.parse(userInfo);

        // unique key per user
        const uniqueKey = `nida_chat_${user.email}`;

        setStorageKey(uniqueKey);

        
        const savedChat = localStorage.getItem(uniqueKey);

        if (savedChat) {
          setMessages(JSON.parse(savedChat));
        } else {
          setMessages([]);
        }
      }
    }
  }, []);

  // SAVE CHAT

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify(messages)
      );
    }
  }, [messages, storageKey]);

  // CLEAR CHAT
 
  const clearChat = () => {
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

    setMessages([]);
  };

  return {
    messages,
    setMessages,
    clearChat,
  };
}