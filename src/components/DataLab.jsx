import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sortData = [
  { name: "Exchange Sort", time: 1057.20, speedup: "Benchmark", highlight: false },
  { name: "Bubble Sort", time: 960.63, speedup: "1.1x faster", highlight: false },
  { name: "Selection Sort", time: 385.18, speedup: "2.7x faster", highlight: false },
  { name: "Insertion Sort", time: 245.03, speedup: "4.3x faster", highlight: false },
  { name: "Merge Sort", time: 4.29, speedup: "~246x", highlight: true },
  { name: "Heap Sort", time: 4.21, speedup: "~251x", highlight: true },
  { name: "Shell Sort", time: 3.86, speedup: "~273x", highlight: true },
  { name: "Comb Sort", time: 3.49, speedup: "~303x", highlight: true },
  { name: "Quick Sort", time: 2.33, speedup: "~453x", highlight: true },
];

const MINT_TEXT = "text-[#6EE7C8]";
const MINT_BORDER = "border-[#6EE7C8]/70";
const MINT_BG = "bg-[#6EE7C8]";

const DataLab = () => {
  const containerRef = useRef(null);
  const barsRef = useRef([]);
  const numbersRef = useRef([]); 
  const maxTime = 1100; 

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", 
        toggleActions: "play none none reverse"
      }
    });

    sortData.forEach((item, index) => {
      // 1. Animation thanh Bar
      tl.fromTo(barsRef.current[index], 
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, 
          opacity: 1,
          duration: 1.5, 
          ease: "power3.out"
        },
        index * 0.08
      );

      // 2. Animation Số chạy
      const numberEl = numbersRef.current[index];
      const counter = { val: 0 }; 

      tl.to(counter, {
        val: item.time,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => {
          if (numberEl) {
            numberEl.textContent = counter.val.toFixed(2) + " ms";
          }
        }
      }, index * 0.08); 
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full h-screen bg-black text-white px-6 md:px-20 font-inter flex flex-col pt-24 pb-6 overflow-hidden relative">
      
      {/* HEADER */}
      <div className="w-full max-w-6xl mx-auto shrink-0 z-10 border-b border-white pb-3 mb-2">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white">
          The Data Lab
        </h2>
        <p className="mt-1 text-xs md:text-sm font-bold text-white uppercase tracking-widest">
          Average Execution Time (ms) - Lower is Better
        </p>
      </div>

      {/* BODY - CHART */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-center min-h-0">
        <div className="flex flex-col gap-1.5 w-full">
          {sortData.map((item, index) => {
            const widthPercentage = Math.max((item.time / maxTime) * 100, 0.5);
            
            return (
              <div key={index} className="w-full group">
                {/* Dòng thông tin: Tên + Badge + Số */}
                <div className="flex justify-between items-center mb-1 text-[10px] md:text-xs leading-none">
                  <span className={`font-bold uppercase tracking-wider ${item.highlight ? MINT_TEXT : "text-white"}`}>
                    {item.name}
                  </span>
                  <div className="text-right flex gap-2 items-center">
                    <span className={`text-[9px] md:text-[10px] font-bold border px-1 py-px rounded inline-block whitespace-nowrap ${item.highlight ? `${MINT_TEXT} ${MINT_BORDER}` : "text-white border-white"}`}>
                      {item.speedup}
                    </span>
                    <span 
                      ref={el => numbersRef.current[index] = el}
                      className={`font-bold w-24 text-right inline-block whitespace-nowrap ${item.highlight ? MINT_TEXT : "text-white"}`}
                    >
                      0.00 ms
                    </span>
                  </div>
                </div>

                {/* Thanh Bar */}
                <div className="w-full h-4 md:h-5 bg-white/10 border border-white/20 rounded-sm relative overflow-hidden flex items-center">
                  <div 
                    ref={el => barsRef.current[index] = el}
                    className={`h-full origin-left ${item.highlight ? MINT_BG : "bg-white"}`}
                    style={{ width: `${widthPercentage}%` }}
                  >
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full max-w-6xl mx-auto shrink-0 mt-6 pt-2 border-t border-white">
        <p className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
          * Benchmark data based on random integer arrays (n=20,000). Source: Internal testing environment.
        </p>
      </div>
    </section>
  );
};

export default DataLab;
