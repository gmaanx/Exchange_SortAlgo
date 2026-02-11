import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onLoadingComplete) onLoadingComplete();
      }
    });

    // --- 1. HIỆN LOADER ---
    // Loader hiện lên từ từ
    tl.to(loaderRef.current, {
      opacity: 1,
      duration: 0.35,
    });

    // --- 2. CHỜ ---
    // Giữ màn hình loading ngắn hơn để vào trang nhanh hơn
    tl.to({}, { duration: 1.1 }); 

    // --- 3. BIẾN MẤT (Fade Out) ---
    // Cả màn hình mờ dần rồi biến mất
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
    });
    
    return () => tl.kill();
  }, [onLoadingComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none pointer-events-none"
    >
      {/* Matrix Loader (Style đã có trong index.css) */}
      {/* Bắt đầu với opacity-0 để GSAP làm hiệu ứng hiện lên */}
      <div ref={loaderRef} className="opacity-0">
        <div className="loader-matrix"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
