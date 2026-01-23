"use client";
import { X, CheckCircle, XCircle } from "lucide-react";
interface SuccessModalProps {
  open: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
  onContinue?: () => void; // ✅ ADD THIS
}

export default function SuccessModal({
  open,
  message,
  type,
  onClose,
  onContinue,
}: SuccessModalProps) {
  if (!open) return null;
  const isSuccess = type === "success";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative animate-scaleIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <CheckCircle className="text-green-500" size={64} />
          ) : (
            <XCircle className="text-red-500" size={64} />
          )}
        </div>

        {/* Title */}
        <h3
          className={`text-2xl font-bold text-center ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Device Compatible 🎉" : "Device Not Compatible"}
        </h3>

        {/* Message */}
        <p className="mt-3 text-center text-gray-600 leading-relaxed">
          {message}
        </p>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onContinue ? onContinue : onClose} // ✅ MODIFY THIS LINE
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              isSuccess
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isSuccess ? "Continue" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
