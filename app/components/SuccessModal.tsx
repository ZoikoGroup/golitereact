"use client";

import { CheckCircle, X } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessModal({
  open,
  onClose,
  message,
}: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-8 text-center z-10 animate-scaleIn">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-14 h-14 text-green-500" />
        </div>

        {/* MESSAGE */}
        <p className="text-gray-800 leading-relaxed text-base">
          {message ||
            "Your device is compatible with GoLite Mobile’s eSIM technology. You’re ready to enjoy fast, seamless, and eco-friendly activation — no physical SIM required."}
        </p>

        {/* ACTION */}
        <button
          onClick={onClose}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
}
