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
    const storySteps = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-step]"),
    );
    const storyPanels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-panel]"),
    );
    const storyCurrent = document.querySelector<HTMLElement>("[data-story-current]");

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

    const activateStory = (activeIndex: string) => {
      storySteps.forEach((step) => {
        const isActive = step.dataset.storyStep === activeIndex;
        step.classList.toggle("is-active", isActive);
        if (isActive) {
          step.setAttribute("aria-current", "step");
        } else {
          step.removeAttribute("aria-current");
        }
      });

      storyPanels.forEach((panel) => {
        panel.classList.toggle(
          "is-active",
          panel.dataset.storyPanel === activeIndex,
        );
      });

      if (storyCurrent) {
        storyCurrent.textContent = String(Number(activeIndex) + 1).padStart(2, "0");
      }
    };

    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const step = entry.target as HTMLElement;
          activateStory(step.dataset.storyStep ?? "0");
        });
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    storySteps.forEach((step) => storyObserver.observe(step));

    const introTimer = window.setTimeout(() => {
      root.classList.add("intro-complete");
      root.classList.remove("intro-first");
    }, 2200);

    return () => {
      observer.disconnect();
      storyObserver.disconnect();
      window.clearTimeout(introTimer);
    };
  }, []);

  return null;
}
