"use client"

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";

import scanningAnimation from "@/animations/scanning.json"; // 扫描动画 JSON 文件
import foundAnimation from "@/animations/found.json"; // 结果动画 JSON 文件

interface ScanResultDialogProps {
  open: boolean; // 控制对话框可见性
  onClose: () => void; // 关闭对话框的回调
  result?: {
    category: string; // 检测到的垃圾类别
    color: string; // 推荐的垃圾桶颜色
  }; // 如果 result 为 undefined 表示正在等待结果
  setIsUploading: (state: boolean) => void; // 上传状态管理
}

const ScanResultDialog: React.FC<ScanResultDialogProps> = ({
  open,
  onClose,
  result,
  setIsUploading,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const scanningContainer = useRef<HTMLDivElement | null>(null);
  const foundContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let scanAnimationInstance: any;
    let foundAnimationInstance: any;

    if (open) {
      // 延迟 100ms 等待 Dialog 内容挂载
      const scanTimer = setTimeout(() => {
        if (isScanning && scanningContainer.current) {
          console.log("Initializing scanning animation...");
          scanAnimationInstance = lottie.loadAnimation({
            container: scanningContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: scanningAnimation,
          });
        }

        if (!isScanning && foundContainer.current) {
          console.log("Initializing found animation...");
          foundAnimationInstance = lottie.loadAnimation({
            container: foundContainer.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: foundAnimation,
          });
        }
      }, 100); // 等待挂载的时间

      // 模拟 AI 处理时间
      if (result) {
        console.log("Result received, stopping scanning animation");
        const resultTimer = setTimeout(() => {
          setIsScanning(false); // 切换到结果动画
          setIsUploading(false); // 上传结束
        }, 2000);

        return () => {
          clearTimeout(scanTimer);
          clearTimeout(resultTimer);
          if (scanAnimationInstance) {
            scanAnimationInstance.destroy(); // 销毁扫描动画
          }
          if (foundAnimationInstance) {
            foundAnimationInstance.destroy(); // 销毁结果动画
          }
        };
      }
    }
  }, [open, isScanning, result, setIsUploading]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent className="bg-gradient-to-b from-blue-200 via-white to-green-200 text-center p-6 rounded-lg">
        {isScanning ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div
              ref={scanningContainer}
              style={{
                width: 150,
                height: 150,
                backgroundColor: "transparent",
              }}
            />
            <p className="text-lg font-semibold text-gray-700">
              🧠 Hold on, our AI is figuring it out...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div
              ref={foundContainer}
              style={{
                width: 150,
                height: 150,
                backgroundColor: "transparent",
              }}
            />
            <DialogTitle className="text-2xl font-bold text-green-600">
              🎉 We found it!
            </DialogTitle>
            <div className="text-gray-800 text-left mt-4 space-y-3">
              <p>
                🗑️ <strong>Trash category:</strong> {result?.category}. It’s important to sort it
                right!
              </p>
              <p>
                🟢 <strong>Bin color:</strong> {result?.color}. That’s where it belongs!
              </p>
              <p className="font-semibold text-green-700">
                🌍 You’re making the Earth a cleaner, greener place. Keep it up!
              </p>
            </div>
            <Button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Got it! 👍
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScanResultDialog;