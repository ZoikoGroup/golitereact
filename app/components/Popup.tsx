"use client";

import { useEffect } from "react";

type PopupProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export default function Popup({ message, type, onClose }: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
    <style jsx>{`
    @keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
    `}</style>
    
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`px-6 py-4 rounded-lg shadow-lg text-white font-medium
        transform transition-all duration-300 animate-slideIn
        ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
        {message}
      </div>
    </div>
    </>
  );
}
