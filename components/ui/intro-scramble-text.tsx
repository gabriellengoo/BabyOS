"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/.:;'[]";

export function IntroScrambleText({
  text,
  start
}: {
  text: string;
  start: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !start) {
      setDisplay(text);
      return;
    }

    const characters = text.split("");
    const indexes = characters
      .map((character, index) => (character === " " ? -1 : index))
      .filter((index) => index >= 0);
    const shuffledIndexes = [...indexes].sort(() => Math.random() - 0.5);
    const current = characters.map((character) =>
      character === " "
        ? " "
        : CHARS[Math.floor(Math.random() * CHARS.length)]
    );
    const revealed = new Set<number>();
    const revealAt = new Map<number, number>();
    const nextMutationAt = new Map<number, number>();
    let elapsed = 0;
    let timer = 0;

    shuffledIndexes.forEach((index, order) => {
      revealAt.set(
        index,
        180 + order * (55 + Math.floor(Math.random() * 95)) + Math.floor(Math.random() * 180)
      );
      nextMutationAt.set(index, 20 + Math.floor(Math.random() * 140));
    });

    function tick() {
      elapsed += 32;

      indexes.forEach((index) => {
        if (revealed.has(index)) return;

        const revealTime = revealAt.get(index) ?? 0;
        if (elapsed >= revealTime) {
          revealed.add(index);
          current[index] = text[index];
          return;
        }

        const mutationTime = nextMutationAt.get(index) ?? 0;
        if (elapsed >= mutationTime) {
          current[index] = CHARS[Math.floor(Math.random() * CHARS.length)];
          nextMutationAt.set(
            index,
            elapsed + 45 + Math.floor(Math.random() * 165)
          );
        }
      });

      setDisplay(current.join(""));

      if (revealed.size < indexes.length) {
        timer = window.setTimeout(tick, 32);
      } else {
        setDisplay(text);
      }
    }

    tick();

    return () => window.clearTimeout(timer);
  }, [mounted, start, text]);

  return <>{display}</>;
}
