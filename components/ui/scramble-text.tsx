"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function ScrambleText({
  text,
  loop = false,
  holdMs = 30000
}: {
  text: string;
  loop?: boolean;
  holdMs?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    let holdTimeout = 0;
    let iteration = 0;

    function tick() {
      iteration += 0.55;
      setDisplay(
        text
          .split("")
          .map((character, index) => {
            if (character === " " || character === "-") return character;
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < text.length) {
        frame = window.setTimeout(tick, 32);
      } else {
        setDisplay(text);
        if (loop) {
          holdTimeout = window.setTimeout(() => {
            iteration = 0;
            tick();
          }, holdMs);
        }
      }
    }

    tick();

    return () => {
      window.clearTimeout(frame);
      window.clearTimeout(holdTimeout);
    };
  }, [holdMs, loop, text]);

  return <>{display}</>;
}
