"use client";

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number>(0);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const startAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (total > 0) {
      startAutoPlay();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  if (total === 0) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goTo((current + 1) % total);
      } else {
        goTo((current - 1 + total) % total);
      }
    }
  };

  return (
    <div
      className="testimonials-wrap reveal delay-1"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div
        className="testimonials-slider"
        role="region"
        aria-label="شهادات العملاء"
        aria-live="polite"
        style={{
          transform: `translateX(${current * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          display: "flex",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {testimonials.map((t, i) => (
          <div
            key={t._id}
            className="testimonial-card"
            role="group"
            aria-label={`شهادة ${i + 1} من ${total}`}
            style={{ minWidth: "100%", width: "100%" }}
          >
            <div className="testimonial-inner">
              <div className="stars" aria-label={`تقييم ${t.rating} نجوم`}>
                {"⭐".repeat(t.rating)}
              </div>
              <p className="testimonial-text">{t.content}</p>
              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-loc">{t.role || "عميل معتمد"}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots" role="tablist" aria-label="تنقل الشهادات">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? "active" : ""}`}
            aria-label={`الشهادة ${i + 1}`}
            aria-selected={i === current}
            role="tab"
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
