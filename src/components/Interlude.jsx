import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const algorithms = [
  "SELECTION SORT",
  "INSERTION SORT",
  "BUBBLE SORT",
  "EXCHANGE SORT",
  "QUICK SORT",
  "SHELL SORT",
  "HEAP SORT",
  "MERGE SORT"
];

const Interlude = () => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useGSAP(() => {
    const words = wordsRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%", 
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    tl.fromTo(words, 
      {
        z: 2000,
        opacity: 0,
        scale: 5,
        filter: "blur(20px)",
        y: () => Math.random() * 1000 - 500,
        x: () => Math.random() * 1000 - 500,
        rotation: () => Math.random() * 60 - 30,
      },
      {
        z: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 0.4,
          from: "random"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
      style={{ perspective: '1500px' }}
    >
      <div className="max-w-6xl px-4 w-full text-center z-10">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 md:gap-x-10 md:gap-y-4 leading-none">
          {algorithms.map((algo, index) => (
            <span
              key={index}
              ref={(el) => (wordsRef.current[index] = el)}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter text-white uppercase tracking-tighter will-change-transform inline-block opacity-0"
            >
              {algo}
            </span>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </section>
  );
};

export default Interlude;
