import React, { useEffect, useState } from 'react'; // Import useState
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';

// Import Components
import LoadingScreen from './components/LoadingScreen.jsx'; // Import LoadingScreen
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

  useEffect(() => {
    // Chỉ khởi tạo Lenis sau khi đã load xong để tránh xung đột scroll
    if (isLoading) {
        document.body.style.overflow = 'hidden'; // Khóa scroll khi đang load
        return;
    } else {
        document.body.style.overflow = ''; // Mở khóa scroll
    }

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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [isLoading]); // Thêm isLoading vào dependency array

  return (
    <main className="w-full min-h-screen bg-black text-white relative">
      
      {/* Hiển thị Loading Screen nếu đang load */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* Nội dung chính (sẽ nằm dưới loading screen) */}
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