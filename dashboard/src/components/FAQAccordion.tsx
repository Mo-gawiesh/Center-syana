"use client";

import { useState } from "react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="brand-faq">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq._id} className={`faq-item ${isOpen ? "open" : ""}`}>
            <button
              className="faq-question"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              {faq.question}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div
              className="faq-answer"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
