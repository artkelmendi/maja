(function () {
  var root = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]"),
  );
  var storySteps = Array.prototype.slice.call(
    document.querySelectorAll("[data-story-step]"),
  );
  var storyPanels = Array.prototype.slice.call(
    document.querySelectorAll("[data-story-panel]"),
  );
  var storyCurrent = document.querySelector("[data-story-current]");

  if (reducedMotion) {
    root.classList.add("motion-reduced", "intro-complete");
    revealTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  root.classList.add("motion-enabled");
  window.requestAnimationFrame(function () {
    root.classList.add("page-loaded");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12%", threshold: 0.08 },
  );

  revealTargets.forEach(function (target) {
    observer.observe(target);
  });

  function activateStory(activeIndex) {
    storySteps.forEach(function (step) {
      var isActive = step.getAttribute("data-story-step") === activeIndex;
      step.classList.toggle("is-active", isActive);
      if (isActive) {
        step.setAttribute("aria-current", "step");
      } else {
        step.removeAttribute("aria-current");
      }
    });

    storyPanels.forEach(function (panel) {
      panel.classList.toggle(
        "is-active",
        panel.getAttribute("data-story-panel") === activeIndex,
      );
    });

    if (storyCurrent) {
      storyCurrent.textContent = String(Number(activeIndex) + 1).padStart(2, "0");
    }
  }

  var storyObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        activateStory(entry.target.getAttribute("data-story-step") || "0");
      });
    },
    { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
  );

  storySteps.forEach(function (step) {
    storyObserver.observe(step);
  });

  window.setTimeout(function () {
    root.classList.add("intro-complete");
    root.classList.remove("intro-first");
  }, 2200);
})();
