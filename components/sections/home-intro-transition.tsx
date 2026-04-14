"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FINAL_TEXT = "BabyOS / Internet Architect";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/.:;";
const REVEAL_DURATION_MS = 3400;
const EXIT_DELAY_MS = 3600;
const EXIT_DURATION_S = 1;
const SCRAMBLE_STEP_MS = 70;

function buildScrambledText(progress: number) {
  const revealCount = Math.floor(FINAL_TEXT.length * progress);

  return FINAL_TEXT.split("")
    .map((character, index) => {
      if (character === " ") return " ";
      if (index < revealCount) return FINAL_TEXT[index];

      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

export function HomeIntroTransition({
  transitionKey
}: {
  transitionKey: string;
}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"hold" | "exit">("hold");
  const [hidden, setHidden] = useState(false);
  const [displayText, setDisplayText] = useState(
    reduceMotion ? FINAL_TEXT : buildScrambledText(0)
  );

  useEffect(() => {
    setHidden(false);
    setPhase("hold");
    setDisplayText(reduceMotion ? FINAL_TEXT : buildScrambledText(0));

    if (reduceMotion) {
      const reducedTimer = window.setTimeout(() => setPhase("exit"), 120);
      return () => window.clearTimeout(reducedTimer);
    }

    let animationFrame = 0;
    let exitTimer = 0;
    const start = window.performance.now();
    let lastScrambleUpdate = 0;

    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / REVEAL_DURATION_MS, 1);

      if (now - lastScrambleUpdate >= SCRAMBLE_STEP_MS || progress >= 1) {
        lastScrambleUpdate = now;
        setDisplayText(buildScrambledText(progress));
      }

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(update);
      } else {
        setDisplayText(FINAL_TEXT);
      }
    };

    animationFrame = window.requestAnimationFrame(update);
    exitTimer = window.setTimeout(() => setPhase("exit"), EXIT_DELAY_MS);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
    };
  }, [reduceMotion, transitionKey]);

  if (hidden) {
    return null;
  }

  return (
    <motion.div
      initial={reduceMotion ? { y: 0 } : { y: "-100%" }}
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: EXIT_DURATION_S, ease: [0.76, 0, 0.24, 1] }
      }
      className="pointer-events-auto fixed inset-0 z-[200] flex items-center justify-center bg-white/35 text-[#ff1493] backdrop-blur-md"
      onAnimationComplete={() => {
        if (phase === "exit") {
          setHidden(true);
        }
      }}
    >
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: reduceMotion ? 0 : 0.08 }}
        className="whitespace-nowrap font-test-sohne-fett text-[clamp(18px,4.8vw,88px)] font-black leading-[0.92] tracking-[-0.08em]"
      >
        {displayText}
      </motion.p>
    </motion.div>
  );
}
