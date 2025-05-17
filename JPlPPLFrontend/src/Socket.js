import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000, // 10 seconds
    transports: ["websocket"], // WebSocket only
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  console.log("Connecting to socket at", backendUrl); // Debug
  return io(backendUrl, options);
};
