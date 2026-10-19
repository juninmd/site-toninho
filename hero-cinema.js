// Abertura "cinema" do hero: barras que se abrem, título palavra a palavra,
// grão de filme e timecode. É só decoração; o hero continua completo sem JS
// e com "reduzir movimento", por isso nada é escondido antes de rodar.
(() => {
  const hero = document.querySelector(".hero");
  if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const GRAIN_SIZE = 256;
  const GRAIN_FRAMES = 4;
  const TICK_MS = 100;
  const FPS = 24;

  // Divide o título em palavras para animar uma a uma (o texto original é mantido)
  const splitWords = (el) => {
    el.textContent
      .trim()
      .split(/\s+/)
      .forEach((word, i, all) => {
        if (i === 0) el.textContent = "";
        const span = document.createElement("span");
        span.className = "cine-word";
        span.style.setProperty("--i", i);
        span.textContent = word;
        el.append(span, i < all.length - 1 ? " " : "");
      });
  };

  const title = hero.querySelector("h1");
  if (title) splitWords(title);
  hero.classList.add("cine-play");

  // Profundidade com o mouse, só onde existe cursor
  if (matchMedia("(hover: hover)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(2));
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(2));
    });
  }

  // Grão: poucos quadros de ruído gerados uma vez e reciclados, para não gastar CPU
  const canvas = hero.querySelector(".cine-grain");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const frames = [];
  if (ctx) {
    for (let f = 0; f < GRAIN_FRAMES; f++) {
      const img = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
      for (let i = 0; i < img.data.length; i += 4) {
        img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.random() * 255;
        img.data[i + 3] = 255;
      }
      frames.push(img);
    }
  }

  const tc = hero.querySelector(".cine-tc span");
  const pad = (n) => String(n).padStart(2, "0");
  const start = performance.now();
  let tick = 0;
  let timer = null;

  const update = () => {
    if (ctx) ctx.putImageData(frames[tick++ % GRAIN_FRAMES], 0, 0);
    if (tc) {
      const s = (performance.now() - start) / 1000;
      const ff = Math.floor((s % 1) * FPS);
      tc.textContent = `00:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(ff)}`;
    }
  };

  // Só anima enquanto o hero está na tela
  new IntersectionObserver(([entry]) => {
    clearInterval(timer);
    if (entry.isIntersecting) timer = setInterval(update, TICK_MS);
  }).observe(hero);
})();
