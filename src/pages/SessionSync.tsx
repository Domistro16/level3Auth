// src/pages/SessionSync.tsx
import { useEffect } from "react";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://ens-contracts-iota.vercel.app/",
];

export default function SessionSync() {
  useEffect(() => {
      console.log(
        "[iframe] SessionSync mounted, origin=",
        window.location.origin
      );
    const handleMessage = (event: MessageEvent) => {
      if (!ALLOWED_ORIGINS.includes(event.origin)) return;
      console.log("[iframe] got postMessage:", event.origin, event.data);
      try {
        const { type, payload } = JSON.parse(event.data);

        if (type === "SAVE_SESSION") {
          localStorage.setItem("Web3Auth-cachedAdapter", payload.cachedAdapter);
          localStorage.setItem("auth_store", payload.openloginStore);
        }

        if (type === "GET_SESSION") {
          const data = localStorage;
          const src = event.source as Window;
          src.postMessage(
            JSON.stringify({ type: "SESSION_DATA", payload: data }),
            event.origin
          );
        }

        if (type === "CLEAR_SESSION") {
          localStorage.clear();
        }
      } catch (e) {
        console.error("Invalid message in iframe", e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null; // invisible iframe = no UI
}
