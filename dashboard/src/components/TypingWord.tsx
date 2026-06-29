"use client";

import { useEffect, useState } from "react";

export default function TypingWord() {
  const words = ["للأجهزة المنزلية", "للغسالات", "للثلاجات", "للبوتاجازات", "للتكييفات", "للديب فريزر"];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(true);
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }

    const typingSpeed = 100;
    const deletingSpeed = 60;
    const pauseTime = 1800;

    let timeoutId: NodeJS.Timeout;

    const currentWord = words[wordIndex];

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      // Done deleting, switch word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      // Type or delete next char
      timeoutId = setTimeout(() => {
        const nextCharIndex = charIndex + (isDeleting ? -1 : 1);
        setCharIndex(nextCharIndex);
        setText(currentWord.slice(0, nextCharIndex));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, wordIndex]);

  return <span id="typing-word">{text}</span>;
}
