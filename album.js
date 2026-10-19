// Álbum 3D do portfólio. As páginas saem dos .portfolio-card que já existem no
// HTML, então fotos e legendas têm uma única fonte. Se as fotos não carregarem,
// o álbum não aparece e a grade do portfólio continua visível.
(() => {
  const album = document.getElementById("album");
  const gallery = document.getElementById("portfolio-all");
  const toggle = document.getElementById("album-toggle");
  if (!album || !gallery) return;

  const MAX_PHOTOS = 6;
  const FLIP_MS = 1100;
  const SWIPE_PX = 40;
  const TILTS = ["-2deg", "1.5deg", "-1deg", "2deg"];
  const phone =
    typeof CONFIG !== "undefined" ? CONFIG.whatsappNumber : "5516999999999";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html) node.innerHTML = html;
    return node;
  };

  // Só entram no álbum fotos que carregam; links quebrados deixariam páginas vazias
  const loadPhoto = (card) =>
    new Promise((resolve) => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      if (!img || !title) return resolve(null);
      const probe = new Image();
      probe.onload = () =>
        resolve({ src: img.getAttribute("src"), alt: img.alt, title: title.textContent.trim() });
      probe.onerror = () => resolve(null);
      probe.src = img.getAttribute("src");
    });

  const coverPage = () =>
    el("div", "album-face album-cover", "<small>Álbum de histórias reais</small>" +
      '<div class="album-foil">Toninho Fotos e Filmagens</div><small>Franca · desde 1998</small>');

  const quotePage = () =>
    el("div", "album-face", "<small>Nosso olhar</small><h3>O segundo exato.</h3>" +
      "<p>28 anos treinando para estar no lugar certo quando ninguém percebe que a câmera chegou.</p>");

  const ctaPage = () => {
    const page = el("div", "album-face", "<small>Seu capítulo</small><h3>Seu álbum começa aqui.</h3>" +
      "<p>Veja se sua data está livre e receba o orçamento no WhatsApp.</p>");
    const link = el("a", "btn btn-primary", "Falar com o Toninho");
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent("Olá Toninho! Vi seu álbum no site e quero saber se minha data está livre.")}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    page.append(link);
    return page;
  };

  const photoPage = (photo, i) => {
    const page = el("div", "album-face");
    const fig = el("figure", "album-photo");
    fig.style.setProperty("--tilt", TILTS[i % TILTS.length]);
    const img = el("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    fig.append(img, el("figcaption", "", photo.title));
    page.append(fig);
    return page;
  };

  const build = (photos) => {
    // Cada folha tem frente e verso; o total de páginas precisa ser par
    const pages = [coverPage(), ...photos.map(photoPage), ctaPage()];
    if (pages.length % 2) pages.splice(2, 0, quotePage());
    pages.forEach((p, i) => p.classList.add(i % 2 ? "album-back" : "album-front"));

    const book = el("div", "album-book");
    book.dataset.pos = "start";
    book.append(el("div", "album-end album-end-l"), el("div", "album-end album-end-r"));
    const leaves = [];
    for (let i = 0; i < pages.length; i += 2) {
      const leaf = el("div", "album-leaf");
      leaf.append(pages[i], pages[i + 1]);
      leaves.push(leaf);
      book.append(leaf);
    }

    const prev = el("button", "album-step", "‹ Anterior");
    const next = el("button", "album-step", "Próxima ›");
    const dots = el("div", "album-dots");
    const live = el("p", "sr-only");
    live.setAttribute("aria-live", "polite");
    [prev, next].forEach((b) => (b.type = "button"));
    const nav = el("div", "album-nav");
    nav.append(prev, dots, next);
    album.append(el("div", "album-spot"), book, nav, live);

    let step = 0;
    // O z-index só troca na metade do giro, quando a folha já passou da lombada
    const zFor = (i, flipped) => (flipped ? 10 + i : leaves.length - i);
    const go = (to) => {
      const from = step;
      step = Math.min(leaves.length, Math.max(0, to));
      leaves.forEach((leaf, i) => {
        const flipped = i < step;
        leaf.classList.toggle("is-flipped", flipped);
        leaf.classList.toggle("is-edge", i === step || i === step - 1);
        const settle = () => (leaf.style.zIndex = zFor(i, flipped));
        if (flipped === i < from) settle();
        else setTimeout(settle, reduce ? 0 : FLIP_MS / 2);
      });
      book.dataset.pos = step === 0 ? "start" : step === leaves.length ? "end" : "mid";
      prev.disabled = step === 0;
      next.disabled = step === leaves.length;
      dots.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === step));
      live.textContent = `Página ${step + 1} de ${leaves.length + 1}`;
    };

    for (let k = 0; k <= leaves.length; k++) {
      const dot = el("button");
      dot.type = "button";
      dot.ariaLabel = `Ir para a página ${k + 1}`;
      dot.addEventListener("click", () => go(k));
      dots.append(dot);
    }
    let swiped = false;
    leaves.forEach((leaf, i) =>
      leaf.addEventListener("click", (e) => {
        // Um arrasto também dispara "click"; sem este filtro a folha viraria duas vezes
        if (e.target.closest("a") || swiped) return;
        go(leaf.classList.contains("is-flipped") ? i : i + 1);
      }),
    );
    prev.addEventListener("click", () => go(step - 1));
    next.addEventListener("click", () => go(step + 1));
    album.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") go(step + 1);
      if (e.key === "ArrowLeft") go(step - 1);
    });

    album.addEventListener("pointermove", (e) => {
      const r = album.getBoundingClientRect();
      album.style.setProperty("--x", `${e.clientX - r.left}px`);
      album.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
    let startX = null;
    album.addEventListener("pointerdown", (e) => (startX = e.clientX));
    album.addEventListener("pointerup", (e) => {
      swiped = startX !== null && Math.abs(e.clientX - startX) > SWIPE_PX;
      if (swiped) go(step + (e.clientX < startX ? 1 : -1));
      startX = null;
    });
    go(0);
  };

  const cards = [...document.querySelectorAll(".portfolio-card")];
  Promise.all(cards.map(loadPhoto)).then((all) => {
    const photos = all.filter(Boolean).slice(0, MAX_PHOTOS);
    if (photos.length < 2) return;
    build(photos);
    album.hidden = false;
    gallery.hidden = true;
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      gallery.hidden = !gallery.hidden;
      toggle.setAttribute("aria-expanded", !gallery.hidden);
      toggle.textContent = gallery.hidden ? "Ver todas as fotos e filtrar" : "Esconder a galeria";
    });
  });
})();
