(function () {
  var root = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]"),
  );

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

  window.setTimeout(function () {
    root.classList.add("intro-complete");
    root.classList.remove("intro-first");
  }, 2200);
})();
