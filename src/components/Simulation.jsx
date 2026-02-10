import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Simulation = () => {
  const containerRef = useRef(null);
  const DATA_SETS = {
    average: [15, 8, 10, 2, 5, 1],
    best: [1, 2, 5, 8, 10, 15],
    worst: [15, 10, 8, 5, 2, 1]
  };

  const [array, setArray] = useState([...DATA_SETS.average]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState({ i: null, j: null });
  const blockRefs = useRef([]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const resetArray = (type) => {
    if (isSorting) return;
    setArray([...DATA_SETS[type]]);
    setActiveIndices({ i: null, j: null });
    gsap.killTweensOf(blockRefs.current);
    gsap.set(blockRefs.current, { clearProps: "all" });
  };

  const animateExchangeSort = contextSafe(async () => {
    if (isSorting) return;
    setIsSorting(true);

    let currentArr = [...array];
    const n = currentArr.length;
    const stepSize = 96; 
    const duration = 0.5;

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        
        setActiveIndices({ i, j });
        
        const elI = blockRefs.current[i];
        const elJ = blockRefs.current[j];

        await gsap.to([elI, elJ], {
          y: -120, 
          duration: 0.4,
          ease: "back.out(1.4)"
        });

        await new Promise(r => setTimeout(r, 200));

        if (currentArr[i] > currentArr[j]) {
          
          const distance = (j - i) * stepSize;

          await Promise.all([
            gsap.to(elI, { x: distance, duration: duration, ease: "power2.inOut" }),
            gsap.to(elJ, { x: -distance, duration: duration, ease: "power2.inOut" })
          ]);
          
          let temp = currentArr[i];
          currentArr[i] = currentArr[j];
          currentArr[j] = temp;
          setArray([...currentArr]);

          gsap.set([elI, elJ], { x: 0 });
        }

        await gsap.to([elI, elJ], {
          y: 0,
          duration: 0.4,
          ease: "back.in(1.0)"
        });
        
        gsap.set([elI, elJ], { clearProps: "transform" });
        await new Promise(r => setTimeout(r, 100));
      }
    }

    setActiveIndices({ i: null, j: null });
    setIsSorting(false);
  });

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>

      <section 
        ref={containerRef} 
        className="relative w-full min-h-screen bg-black text-white font-sans flex items-center justify-between px-20 overflow-hidden"
      >
        
        {/* --- LEFT SIDE: SIMULATION & CONTROLS --- */}
        <div className="w-1/2 flex flex-col items-center justify-center gap-16">
          
          {/* VISUALIZATION BLOCKS */}
          <div className="relative w-[600px] h-40 flex items-center justify-center">
              <div className="flex gap-4 relative">
              {array.map((value, index) => {
                  const isPivot = index === activeIndices.i;
                  const isCompare = index === activeIndices.j;

                  let baseClass = "w-20 h-20 flex items-center justify-center text-3xl font-bold border-2 rounded-xl transition-colors duration-200 relative ";
                  
                  if (isPivot) {
                  baseClass += "border-[#BF092F] bg-[#BF092F]/10 text-[#BF092F] shadow-[0_0_40px_rgba(191,9,47,0.4)] z-50 ";
                  } else if (isCompare) {
                  baseClass += "border-[#3B9797] bg-[#3B9797]/10 text-[#3B9797] shadow-[0_0_40px_rgba(59,151,151,0.4)] z-50 ";
                  } else {
                  baseClass += "border-white/20 text-white/50 bg-transparent z-10 ";
                  }

                  return (
                  <div
                      key={index}
                      ref={el => blockRefs.current[index] = el}
                      className={baseClass}
                  >
                      {value}
                      {isPivot && <span className="absolute -bottom-8 text-[0.6rem] tracking-widest text-[#BF092F] font-bold uppercase">Pivot</span>}
                      {isCompare && <span className="absolute -bottom-8 text-[0.6rem] tracking-widest text-[#3B9797] font-bold uppercase">Target</span>}
                  </div>
                  );
              })}
              </div>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col items-center gap-6">
              <button 
                  onClick={animateExchangeSort}
                  disabled={isSorting}
                  className={`
                      group relative overflow-hidden px-10 py-4 border transition-all duration-300
                      ${isSorting 
                          ? 'border-[#BF092F] cursor-not-allowed bg-[#BF092F]/10' 
                          : 'border-white/20 hover:border-white cursor-pointer'
                      }
                  `}
              >
                  <div className="flex items-center gap-3 z-10 relative">
                      {isSorting && (
                          <span className="w-2 h-2 rounded-full bg-[#BF092F] animate-pulse shadow-[0_0_10px_#BF092F]"></span>
                      )}
                      <span className={`text-xs font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${isSorting ? 'text-[#BF092F]' : 'text-white group-hover:text-black'}`}>
                          {isSorting ? "VISUALIZING..." : "[ START VISUALIZATION ]"}
                      </span>
                  </div>
                  {!isSorting && (
                      <div className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom z-0"></div>
                  )}
              </button>

              <div className="flex gap-8">
                  {['Best', 'Average', 'Worst'].map((type) => (
                      <button
                          key={type}
                          onClick={() => resetArray(type.toLowerCase())}
                          disabled={isSorting}
                          className={`
                              text-[0.65rem] font-bold tracking-widest uppercase transition-all duration-300
                              ${isSorting 
                                  ? 'opacity-20 cursor-not-allowed' 
                                  : 'opacity-40 hover:opacity-100 hover:text-white cursor-pointer'
                              }
                          `}
                      >
                          {type}
                      </button>
                  ))}
              </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: TITLE & PSEUDO-CODE --- */}
        <div className="w-1/2 flex flex-col items-start text-left pl-12 z-10 font-inter">
          <h2 className="text-6xl font-bold tracking-tighter leading-none text-white mb-8">
            Visualize
          </h2>
          
          <div className="text-base font-normal text-gray-300 space-y-4 leading-relaxed tracking-wide">
              {/* Đã xóa màu custom, dùng text-white để đồng bộ */}
              <p><span className="text-white font-semibold">Bước 1:</span> Khởi tạo i = 0.</p>
              
              <p><span className="text-white font-semibold">Bước 2:</span> Nếu i &lt; N - 1 thì thực hiện Bước 3,<br/> ngược lại kết thúc.</p>
              
              <p><span className="text-white font-semibold">Bước 3:</span> Khởi tạo j = i + 1.</p>
              
              <p><span className="text-white font-semibold">Bước 4:</span> Nếu j &lt; N thì thực hiện Bước 5,<br/> ngược lại tăng i lên 1 và quay về Bước 2.</p>
              
              <p><span className="text-white font-semibold">Bước 5:</span> Nếu A[j] &lt; A[i] thì đổi chỗ A[i] và A[j].</p>
              
              <p><span className="text-white font-semibold">Bước 6:</span> Tăng j lên 1 và quay lại Bước 4.</p>
          </div>
        </div>

      </section>
    </>
  );
};

export default Simulation;