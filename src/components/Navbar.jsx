import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ArrowIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
  </svg>
);

const Navbar = () => {
  gsap.registerPlugin(useGSAP);
  const containerRef = useRef(null);
  
  const navLinksRef = useRef(null);
  const contactRef = useRef(null);
  const menuIconRef = useRef(null);
  
  const overlayRef = useRef(null);
  const overlayLinksRef = useRef(null);
  const closeIconRef = useRef(null);

  const [activeTab, setActiveTab] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Định nghĩa các mục điều hướng
  const navItems = [
    { id: '01', label: 'Simulation' },
    { id: '02', label: 'Code' },
    { id: '03', label: 'Data' },
    { id: '04', label: 'Evolution' },
  ];

  const { contextSafe } = useGSAP({ scope: containerRef });

  // --- 1. HÀM XỬ LÝ CUỘN TRANG (MỚI) ---
  const handleScrollTo = (targetId) => {
    // Cập nhật active tab
    if (targetId !== 'home' && targetId !== 'contact') {
        // Tìm label tương ứng để set active (chữ hoa đầu)
        const item = navItems.find(i => i.label.toLowerCase() === targetId);
        if (item) setActiveTab(item.label);
    } else {
        setActiveTab('');
    }

    // Đóng menu nếu đang mở
    if (isMenuOpen) setIsMenuOpen(false);

    // Xử lý cuộn
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Tìm element theo ID (lưu ý: ID trong HTML phải viết thường, ví dụ: id="simulation")
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !isScrolled) {
        setIsScrolled(true);
      } else if (window.scrollY <= 50 && isScrolled) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (!isMenuOpen) {
      if (isScrolled) {
        tl.to(navLinksRef.current, {
          y: -30, opacity: 0, duration: 0.4, ease: "power3.out", pointerEvents: "none"
        }, 0);
        tl.to(contactRef.current, {
          x: -60, duration: 0.4, ease: "power3.out"
        }, 0);
        tl.fromTo(menuIconRef.current, 
          { x: 20, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out", pointerEvents: "auto" }, 
        0.1);
      } else {
        tl.to(navLinksRef.current, {
          y: 0, opacity: 1, duration: 0.4, ease: "power3.out", pointerEvents: "auto"
        }, 0);
        tl.to(contactRef.current, {
          x: 0, duration: 0.4, ease: "power3.out"
        }, 0);
        tl.to(menuIconRef.current, {
          x: 20, autoAlpha: 0, duration: 0.3, ease: "power3.in", pointerEvents: "none"
        }, 0);
      }
    }
  }, [isScrolled, isMenuOpen]);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (isMenuOpen) {
      tl.fromTo(overlayRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: "expo.inOut" }
      );

      tl.fromTo(overlayLinksRef.current.children, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" },
      "-=0.2");
      
      gsap.to(menuIconRef.current, { autoAlpha: 0, duration: 0.2 });
      gsap.fromTo(closeIconRef.current, 
        { rotate: -90, autoAlpha: 0 },
        { rotate: 0, autoAlpha: 1, duration: 0.3, ease: "back.out(1.7)" }
      );

      document.body.style.overflow = 'hidden';
    } else {
      tl.to(overlayRef.current, {
        scale: 0, opacity: 0, duration: 0.5, ease: "expo.inOut"
      });
      
      if (isScrolled) {
        gsap.to(menuIconRef.current, { autoAlpha: 1, duration: 0.3, delay: 0.2 });
      }
      gsap.to(closeIconRef.current, { rotate: 90, autoAlpha: 0, duration: 0.3 });

      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleMouseEnter = contextSafe((e) => {
    const line = e.currentTarget.querySelector('.nav-line');
    if (line) {
      gsap.killTweensOf(line);
      gsap.set(line, { left: 0, right: 'auto' });
      gsap.to(line, { width: '100%', duration: 0.3, ease: 'power2.out' });
    }
  });

  const handleMouseLeave = contextSafe((e) => {
    const line = e.currentTarget.querySelector('.nav-line');
    if (line) {
      gsap.killTweensOf(line);
      gsap.set(line, { left: 'auto', right: 0 });
      gsap.to(line, { width: '0%', duration: 0.3, ease: 'power2.in' });
    }
  });

  return (
    <>
      <nav 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full flex justify-between items-center px-12 py-4 z-[100] text-white mix-blend-difference font-sans"
      >
        {/* --- 2. LOGO CLICK -> HOME --- */}
        <div 
            className="flex items-start gap-3 cursor-pointer select-none z-[100]"
            onClick={() => handleScrollTo('home')}
        >
          <h1 className="text-5xl font-bold tracking-tighter leading-none">
            gman
          </h1>
          <div className="flex flex-col items-start">
            <span className="text-[0.6rem] font-normal tracking-[0.15em] leading-none lowercase mt-[17px]">algo</span>
            <span className="text-[0.6rem] font-normal tracking-[0.15em] leading-none lowercase mt-[2px]">rithm</span>
            <span className="text-[0.6rem] font-normal tracking-[0.15em] leading-none lowercase mt-[2px]">base</span>
          </div>
        </div>

        <div className="flex items-center relative z-[100]">
          
          <div ref={navLinksRef} className="flex items-center gap-14 mr-8">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative cursor-pointer group flex items-start gap-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                // --- 3. NAVBAR LINK CLICK ---
                onClick={() => handleScrollTo(item.label.toLowerCase())}
              >
                <span className="text-[0.5rem] font-medium opacity-60 -mt-[2px] font-sans">{item.id}</span>
                <span className={`text-sm font-bold tracking-wide transition-opacity duration-300 ${activeTab === item.label ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
                <div className="nav-line absolute -bottom-2 h-[1.5px] bg-white" style={{ width: '0%' }}></div>
              </div>
            ))}
          </div>
          
          {/* --- 4. CONTACT BUTTON CLICK --- */}
          <div 
            ref={contactRef} 
            className="hidden md:flex items-center cursor-pointer group relative overflow-hidden w-[140px] h-6"
            onClick={() => handleScrollTo('contact')}
          >
              <div className="absolute left-0 flex items-center h-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 rotate-45 origin-center">
                <ArrowIcon className="w-5 h-5" />
              </div>

              <div className="flex items-center h-full gap-[4px] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[24px]">
                <span className="text-xs font-bold tracking-widest uppercase">Contact</span>
                <div className="flex items-center h-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-0 group-hover:rotate-45 origin-center">
                   <ArrowIcon className="w-5 h-5" />
                </div>
              </div>
          </div>

          <div 
            ref={menuIconRef} 
            onClick={() => setIsMenuOpen(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-start gap-[6px] cursor-pointer hover:opacity-70 transition-opacity invisible opacity-0"
          >
            <div className="w-[26px] h-[2px] bg-white"></div>
            <div className="w-[18px] h-[2px] bg-white"></div>
          </div>

          <div 
            ref={closeIconRef}
            onClick={() => setIsMenuOpen(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer hover:opacity-70 invisible opacity-0 flex items-center justify-center"
          >
            <div className="absolute w-full h-[2px] bg-white rotate-45"></div>
            <div className="absolute w-full h-[2px] bg-white -rotate-45"></div>
          </div>

        </div>
      </nav>

      <div 
        ref={overlayRef}
        className="fixed inset-0 w-screen h-screen bg-black z-[90] flex flex-col justify-center items-end pr-12 pt-24 opacity-0 scale-0 pointer-events-none origin-center"
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        <div ref={overlayLinksRef} className="flex flex-col gap-2 text-right">
            
            {/* --- 5. OVERLAY HOME CLICK --- */}
           <div 
             className="group cursor-pointer flex items-center justify-end gap-6"
             onClick={() => handleScrollTo('home')}
           >
             <div className="opacity-0 -translate-x-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-100 group-hover:translate-x-0">
               <ArrowIcon className="w-16 h-16 md:w-24 md:h-24 text-white" />
             </div>
             
             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#333] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:text-white group-hover:translate-x-2">
               HOME
             </h1>
           </div>

           {navItems.map((item) => (
             <div 
               key={item.id} 
               className="group cursor-pointer flex items-center justify-end gap-6"
               // --- 6. OVERLAY MENU ITEM CLICK ---
               onClick={() => handleScrollTo(item.label.toLowerCase())}
             >
               <div className="opacity-0 -translate-x-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-100 group-hover:translate-x-0">
                 <ArrowIcon className="w-16 h-16 md:w-24 md:h-24 text-white" />
               </div>

               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#333] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:text-white group-hover:translate-x-2">
                 {item.label.toUpperCase()}
               </h1>
             </div>
           ))}
            
        </div>
      </div>
    </>
  );
};

export default Navbar;