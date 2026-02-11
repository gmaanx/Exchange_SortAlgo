import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const RotateOverlay = () => {
  const phoneRef = useRef(null);

  useGSAP(() => {
    // Animation icon điện thoại xoay ngang nhắc nhở
    gsap.fromTo(phoneRef.current, 
      { rotation: 0 },
      {
        rotation: 90,
        duration: 1.5,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
        ease: "power2.inOut",
        transformOrigin: "center center"
      }
    );
  }, { scope: phoneRef });

  return (
    <div className="rotate-overlay fixed inset-0 z-[99999] bg-[#0F1115] flex flex-col items-center justify-center text-white p-6 text-center touch-none font-sans">
      <div className="mb-8 w-16 h-24 border-4 border-white rounded-lg flex items-end justify-center pb-2" ref={phoneRef}>
         <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.14em] mb-3">Xoay ngang thiết bị</h2>
      <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-[320px]">
        Xoay ngang để có trải nghiệm tốt hơn.
      </p>
      <p className="mt-2 text-xs md:text-sm text-gray-500 leading-relaxed max-w-[340px]">
        Trải nghiệm tốt nhất khi sử dụng bằng laptop.
      </p>

      <style jsx>{`
        .rotate-overlay {
          display: none; /* Mặc định ẩn trên Desktop */
        }
        
        /* Logic: Chỉ hiện khi màn hình nhỏ (Mobile/Tablet) VÀ đang dọc */
        @media only screen and (max-width: 1024px) and (orientation: portrait) {
          .rotate-overlay {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};

export default RotateOverlay;
