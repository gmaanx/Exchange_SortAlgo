import React, { useCallback, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Content Data ---
const exchangeSortCode = `void ExchangeSort(int[] arr) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) {
                Swap(ref arr[i], ref arr[j]);
            }
        }
    }
}`;

const combSortCode = `void CombSort(int[] arr) {
    int gap = n;
    double shrink = 1.3;
    bool swapped = true;
    while (gap > 1 || swapped) {
        gap = (int)(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i+gap]) {
                Swap(ref arr[i], ref arr[i+gap]);
                swapped = true;
            }
        }
    }
}`;

const HIGHLIGHT_RULES = [
  { pattern: /\bvoid\b/g, token: 'text-purple-400' },
  { pattern: /\bif\b/g, token: 'text-purple-400' },
  { pattern: /\bfor\b/g, token: 'text-purple-400' },
  { pattern: /\bwhile\b/g, token: 'text-purple-400' },
  { pattern: /\bint\b/g, token: 'text-blue-400' },
  { pattern: /\bdouble\b/g, token: 'text-blue-400' },
  { pattern: /\bbool\b/g, token: 'text-blue-400' },
  { pattern: /\btrue\b/g, token: 'text-blue-300' },
  { pattern: /\bfalse\b/g, token: 'text-blue-300' },
  { pattern: /1\.3/g, token: 'text-orange-400' },
  { pattern: /\bSwap\b/g, token: 'text-yellow-300' },
];

// --- Components ---
const CodeCard = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => {
    return HIGHLIGHT_RULES.reduce(
      (result, { pattern, token }) => result.replace(pattern, `<span class="${token}">$&</span>`),
      code
    );
  }, [code]);

  const handleCopy = useCallback(() => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#0F1115] hover:border-white/30 transition-all duration-500 shadow-2xl mt-4 w-full">
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/5 overflow-hidden transition-all opacity-0 group-hover:opacity-100 z-20 hover:border-white/50 cursor-pointer"
        title="Copy code"
      >
        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
        <span className="relative z-10 flex items-center justify-center">
            {copied ? (
              <svg className="w-4 h-4 text-green-500 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400 transition-colors duration-300 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
        </span>
      </button>

      <div className="p-4 md:p-6 text-[10px] md:text-xs font-mono-code leading-relaxed overflow-x-auto custom-scrollbar">
        <pre style={{ margin: 0 }}>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>
    </div>
  );
};

const Evolution = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);
  const titleWrapperRef = useRef(null);

  useGSAP(() => {
    // 1. TITLE SPREAD ANIMATION
    const tlSpread = gsap.timeline({
      scrollTrigger: {
        trigger: titleWrapperRef.current,
        start: "top 90%",
        end: "bottom 30%", 
        scrub: 1, 
      }
    });

    // Spread logic: Từ lệch về chuẩn (0)
    tlSpread.fromTo(".spread-left-outer", { x: 100 }, { x: 0, ease: "power2.out" }, 0);
    tlSpread.fromTo(".spread-left-inner", { x: 50 }, { x: 0, ease: "power2.out" }, 0);
    tlSpread.fromTo(".spread-right-inner", { x: -50 }, { x: 0, ease: "power2.out" }, 0);
    tlSpread.fromTo(".spread-right-outer", { x: -100 }, { x: 0, ease: "power2.out" }, 0);

    // 2. PARALLAX EFFECT
    const tlParallax = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", 
        end: "bottom top",   
        scrub: 0.5 
      }
    });
    
    tlParallax.to([leftColRef.current, rightColRef.current], { y: -100, ease: "none", force3D: true }, 0);
    tlParallax.to(centerColRef.current, { y: 80, ease: "none", force3D: true }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-black text-white px-6 md:px-12 py-24 font-inter flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* === TITLES SECTION === */}
        <div ref={titleWrapperRef} className="mb-20 flex flex-col gap-1 md:gap-2 will-change-transform w-full">
          
          {/* HÀNG 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-full text-3xl md:text-5xl lg:text-6xl font-medium uppercase tracking-tighter leading-none">
            <span className="spread-left-outer text-left origin-right block">EXCHANGE</span>
            
            <div className="spread-left-inner flex items-center pl-4 md:pl-20">
                <div className="w-8 md:w-12 h-[2px] bg-white"></div>
            </div>

            <span className="spread-right-inner text-left pl-0 md:pl-4 block">GREAT</span>
            <span className="spread-right-outer text-right origin-left block">COMB</span>
          </div>

          {/* HÀNG 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-full text-3xl md:text-5xl lg:text-6xl font-medium uppercase tracking-tighter leading-none text-white/90">
            <span className="spread-left-outer text-left origin-right block">SORT</span>
            <span className="spread-left-inner text-left pl-4 md:pl-20 block">THE</span>
            <span className="spread-right-inner text-left pl-0 md:pl-4 block">SHIFT</span>
            <span className="spread-right-outer text-right origin-left block">SORT</span>
          </div>
        </div>


        {/* === CONTENT === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10 w-full">
          
          {/* Left Code (min-w-0 để không vỡ layout) */}
          <div ref={leftColRef} className="md:col-span-4 will-change-transform min-w-0 w-full">
            <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
              The Origin • O(n²)
            </div>
            <CodeCard code={exchangeSortCode} />
          </div>

          {/* Center Text */}
          <div ref={centerColRef} className="md:col-span-4 px-4 text-center will-change-transform flex flex-col justify-center h-full min-h-[300px] min-w-0 w-full">
             <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                Hạn chế của <b>Exchange Sort</b> là bước so sánh ngắn (gap = 1), khiến các phần tử nhỏ ở cuối mảng di chuyển về đầu rất chậm. Điều này tạo ra "nút thắt" hiệu năng với độ phức tạp O(n²).
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                <b>Comb Sort</b> khắc phục bằng cách nới rộng khoảng cách so sánh (gap &gt; 1) và giảm dần theo hệ số chuẩn k=1.3. Kỹ thuật này giúp loại bỏ nhanh các phần tử sai vị trí, đưa tốc độ tiệm cận O(n log n).
            </p>
          </div>

          {/* Right Code */}
          <div ref={rightColRef} className="md:col-span-4 flex flex-col items-end will-change-transform min-w-0 w-full">
            <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest w-full text-right">
              The Evolution • O(n log n)
            </div>
            <div className="w-full">
               <CodeCard code={combSortCode} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Evolution;
