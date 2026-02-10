import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// IMPORT HÌNH TỪ LOCAL (Thay vì link mạng)
// Đảm bảo bạn đã bỏ hình vào folder src/assets/
import leafImg from '/contact-leaf.jpg'; 

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);
  const titleTriggerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! (Demo)");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- HIỆU ỨNG TÁCH ĐÔI CHỮ ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleTriggerRef.current,
          start: "top 85%", // Bắt đầu khi mép trên title chạm 85% màn hình
          end: "top 35%",   // Kết thúc khi nó cuộn lên cao hơn
          scrub: 1,         // Chuyển động mượt theo cuộn chuột
          // markers: true, // Bật cái này nếu muốn debug vị trí
        }
      });

      // 1. Lúc đầu hình đang width: 0 (đã set trong CSS) -> Animete mở rộng ra
      tl.to(imageWrapperRef.current, {
        width: "12vw",    // Mở rộng ra kích thước mong muốn
        opacity: 1,       // Hiện hình dần lên
        marginLeft: "2vw",  // Thêm khoảng cách
        marginRight: "2vw", // Thêm khoảng cách
        duration: 1,
        ease: "power2.out"
      })
      // 2. Đồng thời làm chữ sáng lên hoặc rõ hơn (Optional)
      .fromTo([leftTextRef.current, rightTextRef.current], 
        { letterSpacing: "-0.05em", filter: "blur(2px)" },
        { letterSpacing: "0em", filter: "blur(0px)", duration: 1 }, 
        "<" // Chạy cùng lúc với animation trên
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={containerRef}>
      <div className="contact-container">
        
        {/* HERO TITLE WRAPPER */}
        <div className="contact-hero-wrapper" ref={titleTriggerRef}>
          {/* Chữ TRÁI */}
          <span className="hero-text" ref={leftTextRef}>Let's</span>
          
          {/* HÌNH Ở GIỮA (Lúc đầu width = 0) */}
          <div className="title-image-wrapper-anim" ref={imageWrapperRef}>
            <img 
              src={leafImg} 
              alt="Leaf Accent" 
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