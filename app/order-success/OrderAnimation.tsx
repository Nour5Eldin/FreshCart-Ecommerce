"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function OrderAnimation() {
  const [showCheck, setShowCheck] = useState(false);
  const [circleDone, setCircleDone] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [showFill, setShowFill] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkTimer = setTimeout(() => setShowCheck(true), 500); 
    const circleTimer = setTimeout(() => setCircleDone(true), 1500); 
    const burstTimer = setTimeout(() => {
      setShowBurst(true);
      setShowFill(true); 
    }, 2500); 
    const buttonTimer = setTimeout(() => setShowButton(true), 3500); 

    return () => {
      clearTimeout(checkTimer);
      clearTimeout(circleTimer);
      clearTimeout(burstTimer);
      clearTimeout(buttonTimer);
    };
  }, []);
  // burst lines
  const burstLines = Array.from({ length: 40 }).map((_, i) => {
    const angle = Math.random() * 360;
    const distance = 200 + Math.random() * 20; // انتشار 20px للخارج
    return { angle, distance };
  });

  return (
   <div className="flex flex-col items-center justify-center min-h-screen text-center  gap-2">

      <div className="relative w-40 h-40 mb-2 flex items-center justify-center">
        {/* الدائرة الأساسية */}
        <svg className="w-full h-full rotate-[-90deg] absolute top-0 left-0">
          <motion.circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="#4ade80"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={440}
            strokeDashoffset={440}
            animate={{ strokeDashoffset: circleDone ? 0 : 440 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          {/* ملء الدائرة بالأخضر بعد الفرقعة */}
          {showFill && (
            <motion.circle
              cx="50%"
              cy="50%"
              r="70"
              fill="#4ade80"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </svg>

        {/* علامة الصح في المنتصف */}
        {showCheck && (
          <motion.svg
            className="absolute w-16 h-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={showFill ? "white" : "#4ade80"}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
        )}

        {/* burst lines */}
        {showBurst &&
          burstLines.map((line, index) => {
            const rad = (line.angle * Math.PI) / 180;
            const x = Math.cos(rad) * line.distance;
            const y = Math.sin(rad) * line.distance;
            return (
              <motion.div
                key={index}
                className="absolute w-1 h-6 bg-green-400 rounded"
                style={{ top: "50%", left: "50%", transformOrigin: "center bottom" }}
                initial={{ x: 0, y: 0, scaleY: 0, opacity: 1 }}
                animate={{ x, y, scaleY: 1, opacity: 0 }}
                transition={{ duration: 0.6 + Math.random() * 0.3 }}
              />
            );
          })}
      </div>
    </div>
  );
}
