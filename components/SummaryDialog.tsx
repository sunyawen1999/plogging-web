"use client"

import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import Lottie from "react-lottie";
import confettiAnimation from "@/animations/confetti.json"; // 确保有 confetti 动画文件
import { useRouter } from "next/navigation";

interface SummaryDialogProps {
  open: boolean;
  onClose: () => void;
  summary: {
    distance: number;
    duration: number;
    blueNo: number;
    greenNo: number;
    blackNo: number;
  };
}

const ScanResultDialog: React.FC<SummaryDialogProps> = ({
  open,
  onClose,
  summary,
}) => {
  const router = useRouter();

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: confettiAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent className="bg-gradient-to-b from-green-200 via-white to-blue-200 text-center p-6 rounded-lg">
        <div className="w-full flex justify-center mb-4">
          <Lottie options={lottieOptions} height={120} width={120} />
        </div>
        <DialogTitle className="text-2xl font-bold text-green-600">
          🎉 Congrats! You did amazing! 🎉
        </DialogTitle>
        <div className="text-gray-800 text-left mt-4 space-y-3">
          <p>
            🌟 <strong>You covered:</strong> {summary.distance} km. Way to go!
          </p>
          <p>
            ⏱️ <strong>Your total time:</strong> {summary.duration} minutes. You’re unstoppable!
          </p>
          <p>
            🗑️ <strong>Trash in the blue bin:</strong> {summary.blueNo} items. That's for recyclables!
          </p>
          <p>
            🍃 <strong>Trash in the green bin:</strong> {summary.greenNo} items. Compost for the win!
          </p>
          <p>
            🖤 <strong>Trash in the black bin:</strong> {summary.blackNo} items. Great effort!
          </p>
          <p className="font-semibold text-lg text-green-700">
            🌍 You’ve made the Earth a cleaner, greener place. Keep it up!
          </p>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => router.push("/history")}
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            View Your History 📜
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanResultDialog;
