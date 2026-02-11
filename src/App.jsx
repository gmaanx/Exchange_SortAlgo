import React, { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';

// Import Components
import LoadingScreen from './components/LoadingScreen.jsx';
import RotateOverlay from './components/RotateOverlay.jsx'; // <--- 1. IMPORT COMPONENT NÀY VÀO
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx'; 
import Simulation from './components/Simulation.jsx';
import CodeSection from './components/CodeSection.jsx';
import Interlude from './components/Interlude.jsx';
import DataLab from './components/DataLab.jsx';
import Evolution from './components/Evolution.jsx';
import Interlude2 from './components/Interlude2.jsx';
import ContactSection from './components/ContactSection.jsx';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // State để kiểm soát trạng thái loading
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Chỉ khởi tạo Lenis sau khi đã load xong để tránh xung đột scroll
    if (isLoading) {
      document.body.style.overflow = 'hidden'; // Khóa scroll khi đang load
      return () => {
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = ''; // Mở khóa scroll

    // --- CẤU HÌNH SMOOTH SCROLL (LENIS) ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <main className="w-full min-h-screen bg-black text-white relative">
      
      {/* 2. ĐẶT NÓ Ở ĐÂY: Overlay nhắc xoay màn hình sẽ luôn nằm trên cùng (z-index cao nhất) */}
      <RotateOverlay />

      {/* Hiển thị Loading Screen nếu đang load */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Nội dung chính */}
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="simulation">
        <Simulation />
      </section>
      <section id="code">
        <CodeSection />
      </section>
      <Interlude />
      <section id="data">
        <DataLab />
      </section>
      <section id="evolution">
        <Evolution />
      </section>
      <Interlude2 />
      <ContactSection />
    </main>
  );
};

export default App;
