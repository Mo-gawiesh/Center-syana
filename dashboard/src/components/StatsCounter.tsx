"use client";

import { useEffect, useState, useRef } from "react";

interface StatsCounterProps {
  value: string;
}

export default function StatsCounter({ value }: StatsCounterProps) {
  const numVal = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          
          let startTimestamp: number | null = null;
          const duration = 2000;
          const easeOutQuad = (t: number) => t * (2 - t);

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(easeOutQuad(progress) * numVal);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numVal]);

  return (
    <span ref={elementRef} className="counter-number">
      {count.toLocaleString("ar-EG")}
      {suffix}
    </span>
  );
}
