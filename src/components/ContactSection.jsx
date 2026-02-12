import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import hình
import leafImg from '/contact-leaf.jpg'; 

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);
  const titleTriggerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! (Demo)");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Logic Responsive: Mobile hình to hơn (25vw), Desktop nhỏ hơn (12vw)
      const isMobile = window.innerWidth < 768;
      const targetWidth = isMobile ? "25vw" : "12vw"; 
      
      // Khoảng cách đẩy chữ ra
      const targetMargin = isMobile ? "0.5rem" : "1.5rem";
      const spreadX = isMobile ? "5vw" : "3vw";

      gsap.set(imageWrapperRef.current, { width: 0, minWidth: 0, opacity: 0, marginLeft: 0, marginRight: 0 });
      gsap.set(imageRef.current, { opacity: 1, scale: 1.22, transformOrigin: "center center" });
      gsap.set([leftTextRef.current, rightTextRef.current], { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleTriggerRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // --- HIỆU ỨNG ---
      // Hình ảnh: Từ 0px -> Mở rộng ra
      tl.fromTo(imageWrapperRef.current, 
        { 
          width: "0px", 
          minWidth: "0px",
          opacity: 0, 
          marginLeft: "0px", 
          marginRight: "0px" 
        },
        {
          width: targetWidth,       
          minWidth: targetWidth,
          opacity: 1,               
          marginLeft: targetMargin, 
          marginRight: targetMargin,
          duration: 0.8,
          ease: "power2.out"
        }
      )
      // Chữ: Từ mờ/khít -> Rõ/thoáng và tản ra 2 bên
      .fromTo([leftTextRef.current, rightTextRef.current], 
        { 
          letterSpacing: "-0.05em", 
          filter: "blur(3px)", 
          opacity: 0.5 
        },
        { 
          letterSpacing: "0em", 
          filter: "blur(0px)", 
          opacity: 1,
          duration: 0.8
        }, 
        "<" // Chạy song song
      );
      tl.to(leftTextRef.current, { x: `-${spreadX}`, duration: 0.8, ease: "power2.out" }, "<");
      tl.to(rightTextRef.current, { x: spreadX, duration: 0.8, ease: "power2.out" }, "<");
      tl.to(imageRef.current, { scale: 1, duration: 0.8, ease: "power2.out" }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={containerRef}>
      <div className="contact-container">
        
        {/* HERO TITLE WRAPPER */}
        {/* CSS: display: flex; justify-content: center; -> Đảm bảo chữ bắt đầu ở GIỮA */}
        <div className="contact-hero-wrapper" ref={titleTriggerRef}>
          
          {/* Chữ TRÁI */}
          <span className="hero-text" ref={leftTextRef}>Let's</span>
          
          {/* HÌNH Ở GIỮA */}
          {/* Ban đầu width=0 sẽ biến mất, 2 chữ dính nhau. Khi width tăng -> Đẩy chữ ra */}
          <div className="title-image-wrapper-anim" ref={imageWrapperRef}>
            <img 
              src={leafImg} 
              alt="Leaf Accent" 
              ref={imageRef}
              className="title-image-anim" 
            />
          </div>
          
          {/* Chữ PHẢI */}
          <span className="hero-text" ref={rightTextRef}>Talk</span>
        </div>

        <div className="contact-content-grid">
          {/* Cột trái */}
          <div className="contact-left-col">
            <span className="contact-tag">• Contact Us</span>
            <h2 className="contact-headline">
              Your next big idea starts here. Let's make it real!
            </h2>
          </div>

          {/* Cột phải: Form */}
          <div className="contact-right-col">
            <form className="contact-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="fullname">FULL NAME</label>
                <input type="text" id="fullname" name="fullname" placeholder="Full Name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input type="email" id="email" name="email" placeholder="email@gmail.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">PHONE NUMBER</label>
                <input type="tel" id="phone" name="phone" placeholder="(+84) 84 848 8686" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">SUBJECT</label>
                <input type="text" id="subject" name="subject" placeholder="Subject" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">MESSAGE</label>
                <textarea id="message" name="message" rows="5" placeholder="Type your message here..." required></textarea>
              </div>

              <button type="submit" className="contact-submit-btn btn-hover-fill-up">
                <span>Submit</span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
