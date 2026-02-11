import React, { useCallback, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CODE_STRING = `void ExchangeSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[i]) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}`;

const FLOW = {
  X_C1: 100, X_C2: 220, X_C3: 340, X_C4: 460,
  Y_START: 30, Y_IN_ARR: 70, Y_IN_N: 110, Y_I0: 150,
  Y_CHECK_I: 200, Y_J_INIT: 225, Y_CHECK_J: 275, Y_COMPARE: 345,
  Y_SWAP1: 345, Y_SWAP2: 385, Y_SWAP3: 425, Y_MERGE_SWAP: 465,
  Y_J_INC: 495, Y_I_INC: 555, Y_END: 605,
};

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

// --- 1. COMPONENT CodeCard ---
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
        className="absolute top-12 right-4 w-8 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/5 overflow-hidden transition-all opacity-0 group-hover:opacity-100 z-20 hover:border-white/50 cursor-pointer"
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

// --- 2. MAIN COMPONENT ---
const CodeSection = () => {
  const containerRef = useRef(null);
  const flowRef = useRef(null);
  const codeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%", // GIẢM KHOẢNG CÁCH CUỘN ĐỂ HIỆN NHANH HƠN
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // HIỆU ỨNG TITLE: mềm hơn, ít gắt hơn bản cũ
    tl.from(".wipe-line h1", {
      y: 72,
      autoAlpha: 0,
      stagger: 0.14,
      duration: 1.28,
      ease: "power3.out"
    })
    // Flow và Code bay vào GẦN NHƯ SONG SONG với tiêu đề
    .fromTo(flowRef.current, { y: "110vh" }, { y: "-120vh", ease: "none", duration: 10 }, "-=0.25")
    .fromTo(codeRef.current, { y: "110vh" }, { y: "0%", ease: "power1.out", duration: 10 }, "-=8.8");
  }, { scope: containerRef });

  const nodeClass = "flow-node border-2 border-white bg-black text-white transition-all duration-300 hover:bg-white hover:text-black z-10 flex items-center justify-center cursor-default";

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black text-white font-inter overflow-hidden">
      
      {/* Background Tiêu đề - Masking cực sạch */}
      <div className="h-full w-full flex flex-col justify-center px-[4vw] z-0 select-none bg-black">
          <div className="flex justify-between items-baseline w-full">
              <div className="wipe-line overflow-hidden"><h1 className="text-[13vw] leading-[0.8] font-black uppercase text-white tracking-tighter">CODE</h1></div>
              <div className="wipe-line overflow-hidden"><h1 className="text-[13vw] leading-[0.8] font-black uppercase text-white tracking-tighter">AND</h1></div>
          </div>
          <div className="w-full text-right">
              <div className="wipe-line overflow-hidden inline-block"><h1 className="text-[13vw] leading-[0.8] font-black uppercase text-white tracking-tighter">FLOW CHART</h1></div>
          </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
         <div className="w-full h-full max-w-[1400px] mx-auto px-[4vw] relative">
            
            <div ref={flowRef} className="absolute left-0 top-0 w-[45%] h-full flex items-center justify-start pointer-events-auto will-change-transform"> 
                <div className="relative w-full border border-white/10 rounded-2xl bg-[#0a0a0a] overflow-hidden flex items-center justify-center shadow-2xl aspect-[550/650] p-4">
                    <div style={{ width: 550, height: 650, transform: 'scale(1.15)', transformOrigin: 'center' }} className="relative font-bold">
                        
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 550 650">
                            <defs><marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 z" fill="white" /></marker></defs>
                            <g stroke="white" strokeWidth="1.5" fill="none">
                                <line x1={FLOW.X_C1} y1={FLOW.Y_START+15} x2={FLOW.X_C1} y2={FLOW.Y_IN_ARR-12} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C1} y1={FLOW.Y_IN_ARR+12} x2={FLOW.X_C1} y2={FLOW.Y_IN_N-12} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C1} y1={FLOW.Y_IN_N+12} x2={FLOW.X_C1} y2={FLOW.Y_I0-12} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C1} y1={FLOW.Y_I0+12} x2={FLOW.X_C1} y2={FLOW.Y_CHECK_I-20} markerEnd="url(#arrow)" />
                                <polyline points={`${FLOW.X_C1-20},${FLOW.Y_CHECK_I} ${FLOW.X_C1-60},${FLOW.Y_CHECK_I} ${FLOW.X_C1-60},${FLOW.Y_END} ${FLOW.X_C1-30},${FLOW.Y_END}`} markerEnd="url(#arrow)" />
                                <polyline points={`${FLOW.X_C1+20},${FLOW.Y_CHECK_I} ${FLOW.X_C2},${FLOW.Y_CHECK_I} ${FLOW.X_C2},${FLOW.Y_J_INIT-12}`} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C2} y1={FLOW.Y_J_INIT+12} x2={FLOW.X_C2} y2={FLOW.Y_CHECK_J-20} markerEnd="url(#arrow)" />
                                <polyline points={`${FLOW.X_C2-20},${FLOW.Y_CHECK_J} ${FLOW.X_C1},${FLOW.Y_CHECK_J} ${FLOW.X_C1},${FLOW.Y_I_INC-12}`} markerEnd="url(#arrow)" />
                                <polyline points={`${FLOW.X_C2+20},${FLOW.Y_CHECK_J} ${FLOW.X_C3},${FLOW.Y_CHECK_J} ${FLOW.X_C3},${FLOW.Y_COMPARE-20}`} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C3} y1={FLOW.Y_COMPARE+20} x2={FLOW.X_C3} y2={FLOW.Y_MERGE_SWAP} stroke="white" />
                                <polyline points={`${FLOW.X_C3+20},${FLOW.Y_COMPARE} ${FLOW.X_C4},${FLOW.Y_COMPARE} ${FLOW.X_C4},${FLOW.Y_SWAP1-12}`} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C4} y1={FLOW.Y_SWAP1+12} x2={FLOW.X_C4} y2={FLOW.Y_SWAP2-12} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C4} y1={FLOW.Y_SWAP2+12} x2={FLOW.X_C4} y2={FLOW.Y_SWAP3-12} markerEnd="url(#arrow)" />
                                <polyline points={`${FLOW.X_C4},${FLOW.Y_SWAP3+12} ${FLOW.X_C4},${FLOW.Y_MERGE_SWAP} ${FLOW.X_C2},${FLOW.Y_MERGE_SWAP}`} />
                                <line x1={FLOW.X_C2} y1={FLOW.Y_MERGE_SWAP} x2={FLOW.X_C2} y2={FLOW.Y_J_INC-12} markerEnd="url(#arrow)" />
                                <polyline points={`${FLOW.X_C2},${FLOW.Y_J_INC+12} ${FLOW.X_C2},${FLOW.Y_J_INC+30} ${FLOW.X_C1},${FLOW.Y_J_INC+30} ${FLOW.X_C1},${FLOW.Y_I_INC-12}`} markerEnd="url(#arrow)" />
                                <line x1={FLOW.X_C1} y1={FLOW.Y_I_INC+12} x2={FLOW.X_C1} y2={FLOW.Y_END-15} markerEnd="url(#arrow)" />
                            </g>
                        </svg>

                        <div className={`shape-oval font-black text-sm ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_START, transform: 'translate(-50%, -50%)' }}>Start</div>
                        <div className={`shape-oval font-black text-sm ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_END, transform: 'translate(-50%, -50%)' }}>End</div>

                        <div className={`shape-para ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_IN_ARR, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">Input arr</span></div>
                        <div className={`shape-para ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_IN_N, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">Input n</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_I0, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">i = 0</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_I_INC, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">i=i+1</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C2, top: FLOW.Y_J_INIT, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">j = i + 1</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C2, top: FLOW.Y_J_INC, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">j=j+1</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C4, top: FLOW.Y_SWAP1, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">t=arr[i]</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C4, top: FLOW.Y_SWAP2, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">arr[i]=arr[j]</span></div>
                        <div className={`shape-rect ${nodeClass}`} style={{ left: FLOW.X_C4, top: FLOW.Y_SWAP3, transform: 'translate(-50%, -50%)' }}><span className="text-[9px]">arr[j]=t</span></div>

                        {/* DIAMONDS XOAY TRÁI, LABEL TRẮNG */}
                        <div className={`shape-diamond ${nodeClass}`} style={{ left: FLOW.X_C1, top: FLOW.Y_CHECK_I, transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                             <span className="text-[10px] w-[150%] text-center block" style={{ transform: 'rotate(45deg)' }}>i &lt; n-1</span>
                        </div>
                        <div className="absolute text-[8px] text-white font-bold" style={{ left: FLOW.X_C1 + 35, top: FLOW.Y_CHECK_I - 12 }}>TRUE</div>
                        <div className="absolute text-[8px] text-white font-bold" style={{ left: FLOW.X_C1 - 55, top: FLOW.Y_CHECK_I - 12 }}>FALSE</div>

                        <div className={`shape-diamond ${nodeClass}`} style={{ left: FLOW.X_C2, top: FLOW.Y_CHECK_J, transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                             <span className="text-[10px] w-[150%] text-center block" style={{ transform: 'rotate(45deg)' }}>j &lt; n</span>
                        </div>
                        <div className="absolute text-[8px] text-white font-bold" style={{ left: FLOW.X_C2 + 35, top: FLOW.Y_CHECK_J - 12 }}>TRUE</div>
                        <div className="absolute text-[8px] text-white font-bold" style={{ left: FLOW.X_C2 - 55, top: FLOW.Y_CHECK_J - 12 }}>FALSE</div>

                        <div className={`shape-diamond ${nodeClass}`} style={{ left: FLOW.X_C3, top: FLOW.Y_COMPARE, transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                             <span className="text-[9px] leading-tight w-[150%] text-center block" style={{ transform: 'rotate(45deg)' }}>arr[j] &lt; arr[i]</span>
                        </div>
                        <div className="absolute text-[8px] text-white font-bold" style={{ left: FLOW.X_C3 + 35, top: FLOW.Y_COMPARE - 12 }}>TRUE</div>
                        <div className="absolute text-[8px] text-white font-bold" style={{ left: FLOW.X_C3 - 55, top: FLOW.Y_COMPARE - 12 }}>FALSE</div>

                    </div>
                </div>
            </div>

            <div ref={codeRef} className="absolute right-0 top-0 w-[45%] h-full flex items-center justify-end pointer-events-auto will-change-transform">
                 <div className="w-full flex flex-col justify-center">
                    <CodeCard code={CODE_STRING} />
                 </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default CodeSection;
