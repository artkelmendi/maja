"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (reducedMotion) {
      root.classList.add("motion-reduced", "intro-complete");
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    root.classList.add("motion-enabled");

    requestAnimationFrame(() => {
      root.classList.add("page-loaded");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    revealTargets.forEach((target) => observer.observe(target));

    const introTimer = window.setTimeout(() => {
      root.classList.add("intro-complete");
      root.classList.remove("intro-first");
    }, 2200);

    return () => {
      observer.disconnect();
      window.clearTimeout(introTimer);
    };
  }, []);

  return null;
}
