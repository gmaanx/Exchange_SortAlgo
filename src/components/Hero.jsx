import React from 'react';

const Hero = () => {
  
  // Hàm xử lý cuộn xuống section Simulation
  const handleStart = () => {
    const simulationSection = document.getElementById('simulation');
    if (simulationSection) {
      simulationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-50 scale-105" 
        >
          {/* Đảm bảo file hero.mp4 nằm trong thư mục public */}
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-24 px-12">
        <div className="mb-8 w-full max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-none text-white">
            Exchange Sort <span className="font-light text-white mx-2">—</span>
          </h1>
          
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-none text-white">
            Compare & Swap
          </h1>
        </div>

        {/* Đã gắn sự kiện onClick vào đây */}
        <div 
          onClick={handleStart}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
        >
           <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-gray-400 group-hover:text-white transition-colors duration-300">
             [Get Started]
           </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;