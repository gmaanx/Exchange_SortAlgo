import React, { useRef, useState } from 'react';
import { gsap } from 'gsap'; // Đảm bảo import gsap nếu cần dùng ref animations sau này

const CodeSection = () => {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // --- CẤU HÌNH TỌA ĐỘ (PIXEL) ---
  const OFF_Y_RECT = 12;      
  const OFF_DIAMOND_RAD = 20; 
  const OFF_Y_OVAL = 12;

  const X_C1 = 100; 
  const X_C2 = 220; 
  const X_C3 = 340; 
  const X_C4 = 460; 

  const Y_START = 20;
  const Y_IN_ARR = 60;
  const Y_IN_N = 100;
  const Y_I0 = 140;
  const Y_CHECK_I = 190; 

  const Y_J_INIT = 215; 
  const Y_CHECK_J = 265;

  const Y_COMPARE = 335;
  const Y_SWAP1 = 335;
  const Y_SWAP2 = 375;
  const Y_SWAP3 = 415;

  const Y_MERGE_SWAP = 455;
  const Y_J_INC = 485;      
  const Y_I_INC = 545;      
  const Y_END = 595;

  const LABEL_OFFSET_Y = 8; 

  // --- NỘI DUNG CODE & COPY LOGIC ---
  const codeString = `void ExchangeSort(int[] arr) {
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

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const FlowLines = () => (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox="0 0 550 650"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        <marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L5,2.5 L0,5 z" fill="white" />
        </marker>
        <circle id="dot" cx="0" cy="0" r="1.5" fill="white" />
      </defs>

      {/* CỘT 1 (Main) */}
      <line x1={X_C1} y1={Y_START+OFF_Y_OVAL} x2={X_C1} y2={Y_IN_ARR-OFF_Y_RECT} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <line x1={X_C1} y1={Y_IN_ARR+OFF_Y_RECT} x2={X_C1} y2={Y_IN_N-OFF_Y_RECT} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <line x1={X_C1} y1={Y_IN_N+OFF_Y_RECT} x2={X_C1} y2={Y_I0-OFF_Y_RECT} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <line x1={X_C1} y1={Y_I0+OFF_Y_RECT} x2={X_C1} y2={Y_CHECK_I-OFF_DIAMOND_RAD} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />

      {/* Check i */}
      <polyline points={`${X_C1-OFF_DIAMOND_RAD},${Y_CHECK_I} ${X_C1-60},${Y_CHECK_I} ${X_C1-60},${Y_END} ${X_C1-30},${Y_END}`} fill="none" stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x={X_C1-40} y={Y_CHECK_I-LABEL_OFFSET_Y} className="flow-label">False</text>

      <polyline points={`${X_C1+OFF_DIAMOND_RAD},${Y_CHECK_I} ${X_C2},${Y_CHECK_I} ${X_C2},${Y_J_INIT-OFF_Y_RECT}`} fill="none" stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x={(X_C1 + X_C2) / 2} y={Y_CHECK_I-LABEL_OFFSET_Y} className="flow-label">True</text>

      {/* Check j */}
      <line x1={X_C2} y1={Y_J_INIT+OFF_Y_RECT} x2={X_C2} y2={Y_CHECK_J-OFF_DIAMOND_RAD} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      
      <polyline points={`${X_C2-OFF_DIAMOND_RAD},${Y_CHECK_J} ${X_C1},${Y_CHECK_J} ${X_C1},${Y_I_INC-OFF_Y_RECT}`} fill="none" stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x={(X_C2 + X_C1) / 2} y={Y_CHECK_J-LABEL_OFFSET_Y} className="flow-label">False</text>

      <polyline points={`${X_C2+OFF_DIAMOND_RAD},${Y_CHECK_J} ${X_C3},${Y_CHECK_J} ${X_C3},${Y_COMPARE-OFF_DIAMOND_RAD}`} fill="none" stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x={(X_C2 + X_C3) / 2} y={Y_CHECK_J-LABEL_OFFSET_Y} className="flow-label">True</text>

      {/* Compare */}
      <polyline points={`${X_C3-OFF_DIAMOND_RAD},${Y_COMPARE} ${X_C2},${Y_COMPARE} ${X_C2},${Y_MERGE_SWAP}`} fill="none" stroke="white" strokeWidth="1.2" />
      <text x={(X_C3 + X_C2) / 2} y={Y_COMPARE-LABEL_OFFSET_Y} className="flow-label">False</text>

      <polyline points={`${X_C3+OFF_DIAMOND_RAD},${Y_COMPARE} ${X_C4},${Y_COMPARE} ${X_C4},${Y_SWAP1-OFF_Y_RECT}`} fill="none" stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x={(X_C3 + X_C4) / 2} y={Y_COMPARE-LABEL_OFFSET_Y} className="flow-label">True</text>

      {/* Swap */}
      <line x1={X_C4} y1={Y_SWAP1+OFF_Y_RECT} x2={X_C4} y2={Y_SWAP2-OFF_Y_RECT} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <line x1={X_C4} y1={Y_SWAP2+OFF_Y_RECT} x2={X_C4} y2={Y_SWAP3-OFF_Y_RECT} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <polyline points={`${X_C4},${Y_SWAP3+OFF_Y_RECT} ${X_C4},${Y_MERGE_SWAP} ${X_C2},${Y_MERGE_SWAP}`} fill="none" stroke="white" strokeWidth="1.2" />

      {/* Tuyến tính */}
      <use href="#dot" x={X_C2} y={Y_MERGE_SWAP} />
      <line x1={X_C2} y1={Y_MERGE_SWAP} x2={X_C2} y2={Y_J_INC-OFF_Y_RECT} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />

      <polyline points={`${X_C2},${Y_J_INC+OFF_Y_RECT} ${X_C2},${Y_J_INC+30} ${X_C1},${Y_J_INC+30} ${X_C1},${Y_I_INC-OFF_Y_RECT}`} fill="none" stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
      
      <line x1={X_C1} y1={Y_I_INC+OFF_Y_RECT} x2={X_C1} y2={Y_END-OFF_Y_OVAL} stroke="white" strokeWidth="1.2" markerEnd="url(#arrow)" />
    </svg>
  );

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black text-white font-inter flex flex-col py-6 overflow-hidden">
      
      <div className="w-full flex justify-center mb-8 z-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none hover:text-gray-300 transition-colors cursor-default">Code & Flow</h2>
      </div>

      <div className="flex w-full h-[85vh] gap-10 items-start justify-center">
          
          {/* TRÁI: FLOWCHART */}
          <div className="w-[55%] h-full relative flex justify-end border border-white/10 rounded-2xl bg-[#111] overflow-hidden">
              <div style={{ width: '550px', height: '650px', position: 'relative', margin: 'auto' }}>
                  <FlowLines />

                  <div className="flow-node shape-oval" style={{ left: X_C1, top: Y_START }}>Start</div>
                  <div className="flow-node shape-para" style={{ left: X_C1, top: Y_IN_ARR }}><span className="text-para">Input arr</span></div>
                  <div className="flow-node shape-para" style={{ left: X_C1, top: Y_IN_N }}><span className="text-para">Input n</span></div>
                  
                  <div className="flow-node shape-rect" style={{ left: X_C1, top: Y_I0 }}>i = 0</div>
                  
                  <div className="flow-node shape-diamond" style={{ left: X_C1, top: Y_CHECK_I }}><div className="text-diamond">i&lt;n-1</div></div>
                  <div className="flow-node shape-rect" style={{ left: X_C1, top: Y_I_INC }}>i=i+1</div>
                  <div className="flow-node shape-oval" style={{ left: X_C1, top: Y_END }}>End</div>

                  <div className="flow-node shape-rect" style={{ left: X_C2, top: Y_J_INIT }}>j = i + 1</div>
                  <div className="flow-node shape-diamond" style={{ left: X_C2, top: Y_CHECK_J }}><div className="text-diamond">j&lt;n</div></div>
                  <div className="flow-node shape-rect" style={{ left: X_C2, top: Y_J_INC }}>j=j+1</div>

                  <div className="flow-node shape-diamond" style={{ left: X_C3, top: Y_COMPARE }}><div className="text-diamond">arr[j]&lt;arr[i]</div></div>

                  <div className="flow-node shape-rect" style={{ left: X_C4, top: Y_SWAP1 }}>t=arr[i]</div>
                  <div className="flow-node shape-rect" style={{ left: X_C4, top: Y_SWAP2 }}>arr[i]=arr[j]</div>
                  <div className="flow-node shape-rect" style={{ left: X_C4, top: Y_SWAP3 }}>arr[j]=t</div>
              </div>
          </div>

          {/* PHẢI: CODE BLOCK (New Style applied) */}
          <div className="w-[40%] h-full relative group rounded-lg overflow-hidden border border-white/10 bg-[#0F1115] hover:border-white/30 transition-all duration-500 shadow-2xl">
            {/* BUTTON COPY */}
            <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/5 overflow-hidden transition-all opacity-0 group-hover:opacity-100 z-20 hover:border-white/50 cursor-pointer"
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

            {/* Code Content */}
            <div className="h-full w-full p-6 text-xs md:text-sm font-mono-code leading-relaxed overflow-auto custom-scrollbar">
                <pre style={{ margin: 0 }}>
                    <code dangerouslySetInnerHTML={{ 
                        __html: codeString
                        .replace(/void/g, '<span class="text-purple-400">void</span>')
                        .replace(/int/g, '<span class="text-blue-400">int</span>')
                        .replace(/for/g, '<span class="text-purple-400">for</span>')
                        .replace(/if/g, '<span class="text-purple-400">if</span>')
                    }} />
                </pre>
            </div>
          </div>
          
      </div>
    </section>
  );
};

export default CodeSection;