import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/all';

gsap.registerPlugin(Observer);

const CONFIG = {
  BASE_DURATION: 80,
  SCROLL_FORCE: 0.15,
  FRICTION: 0.97,
  TIME_FACTOR: 0.006
};

const MarqueeRow = ({ content, direction = 1 }) => {
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const momentumRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    
    // Logic Animation (Giữ nguyên)
    const startX = direction === 1 ? -50 : 0;
    const endX = direction === 1 ? 0 : -50;

    tlRef.current = gsap.to(el, {
      xPercent: endX,
      startAt: { xPercent: startX },
      ease: "none",
      duration: CONFIG.BASE_DURATION, 
      repeat: -1
    });

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onChangeY: (self) => {
        momentumRef.current += self.deltaY * CONFIG.SCROLL_FORCE;
      }
    });

    const onTick = () => {
      if (Math.abs(momentumRef.current) > 0.01) {
        const timeToAdd = momentumRef.current * CONFIG.TIME_FACTOR;
        if (tlRef.current) {
          tlRef.current.totalTime(tlRef.current.totalTime() + timeToAdd);
        }
        momentumRef.current *= CONFIG.FRICTION; 
      } else {
        momentumRef.current = 0;
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      if (tlRef.current) tlRef.current.kill();
      observer.kill();
      gsap.ticker.remove(onTick);
    };
  }, [direction]);

  return (
    <div className="interlude-row-wrapper">
      <div ref={containerRef} className="interlude-track">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="interlude-item-group">
            {content.map((text, idx) => (
              <React.Fragment key={idx}>
                <span className="interlude-text-base interlude-word">{text}</span>
                <span className="interlude-text-base interlude-dot">.</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Interlude2 = () => {
  const row1 = ["Gia Mẫn", "Thiên Đức", "Hoàng Ân"];
  const row2 = ["Phúc Khang", "Trọng Tấn", "Tiến Tài"];

  return (
    <section className="interlude-section">
      <MarqueeRow content={row1} direction={1} />
      <MarqueeRow content={row2} direction={-1} />
    </section>
  );
};

export default Interlude2;