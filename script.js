// Troque cada link "#" pelo endereço publicado do projeto quando tiver os links reais.
const projects = [
  {
    title: "GitHub RitaMarilize",
    description: "Perfil com meus repositórios, estudos e projetos front-end publicados no GitHub.",
    image: "assets/thumb-github.svg",
    icon: "</>",
    link: "https://github.com/RitaMarilize"
  },
  {
    title: "As Fases da Lua",
    description: "Projeto em HTML, CSS e JavaScript criado em curso online para explorar as fases da Lua.",
    image: "assets/thumb-fases-lua.svg",
    icon: "☾",
    link: "https://ritamarilize.github.io/"
  },
  {
    title: "Lista Inteligente",
    description: "Lista de mercado com orçamento mensal, produtos, histórico e resumo do dinheiro disponível.",
    image: "assets/thumb-lista-inteligente.svg",
    icon: "▤",
    link: "https://ritamarilize.github.io/listainteligente/"
  },
  {
    title: "Fechamento Diário",
    description: "Calculadora de metas com impostado, realizado, deltas e aderência do fechamento.",
    image: "assets/thumb-fechamento.svg",
    icon: "◎",
    link: "https://ritamarilize.github.io/fechamento/"
  },
  {
    title: "Pixel Adventure",
    description: "Jogo 2D em JavaScript com mecânicas de plataforma e estética retrô.",
    image: "assets/thumb-pixel.svg",
    icon: "✦",
    link: "#"
  }
];

const typewriterElement = document.querySelector("[data-typewriter]");

if (typewriterElement) {
  const typewriterText = typewriterElement.getAttribute("data-typewriter") || "";
  const typewriterOutput = typewriterElement.querySelector(".hero__eyebrow-text");

  if (typewriterOutput) {
    const typewriterLetters = Array.from(typewriterText);
    let letterIndex = 0;
    let isDeleting = false;

    function updateTypewriter() {
      typewriterOutput.textContent = typewriterLetters.slice(0, letterIndex).join("");

      if (!isDeleting && letterIndex < typewriterLetters.length) {
        letterIndex += 1;
        window.setTimeout(updateTypewriter, 82);
        return;
      }

      if (!isDeleting) {
        isDeleting = true;
        window.setTimeout(updateTypewriter, 1450);
        return;
      }

      if (letterIndex > 0) {
        letterIndex -= 1;
        window.setTimeout(updateTypewriter, 38);
        return;
      }

      isDeleting = false;
      window.setTimeout(updateTypewriter, 420);
    }

    window.setTimeout(updateTypewriter, 260);
  }
}

const grid = document.querySelector("#project-grid");

function createProjectCard(project) {
  const hasLink = project.link && project.link !== "#";
  const card = document.createElement(hasLink ? "a" : "article");
  card.className = "project-card";
  card.classList.toggle("project-card--pending", !hasLink);
  card.setAttribute("aria-label", hasLink ? "Abrir projeto " + project.title : "Projeto " + project.title + " aguardando link");

  if (hasLink) {
    card.href = project.link;
    card.target = project.link.startsWith("http") ? "_blank" : "_self";
    card.rel = project.link.startsWith("http") ? "noreferrer" : "";
  }

  const media = document.createElement("figure");
  media.className = "project-card__media";

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = "";
  image.loading = "lazy";

  const icon = document.createElement("span");
  icon.className = "project-card__icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = project.icon;

  const body = document.createElement("div");
  body.className = "project-card__body";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const cta = document.createElement("span");
  cta.className = "project-card__cta";
  cta.textContent = hasLink ? "Ver projeto" : "Link em breve";

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = hasLink ? "→" : "·";

  cta.append(arrow);
  body.append(title, description, cta);
  media.append(image, icon);
  card.append(media, body);

  return card;
}

grid.replaceChildren(...projects.map(createProjectCard));

const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".main-nav__link"));
const homeLink = document.querySelector("[data-home-link]");

function updateHeaderState() {
  document.body.classList.toggle("header-is-scrolled", window.scrollY > 24);
}

function setActiveNav(sectionId) {
  navLinks.forEach(function (link) {
    link.classList.toggle("is-active", link.hash === "#" + sectionId);
  });
}

function updateActiveSection() {
  const marker = window.scrollY + 130;
  let activeId = sections[0].id;

  sections.forEach(function (section) {
    if (section.offsetTop <= marker) {
      activeId = section.id;
    }
  });

  setActiveNav(activeId);
}

function handlePageScroll() {
  updateHeaderState();
  updateActiveSection();
}

window.addEventListener("scroll", handlePageScroll, { passive: true });
window.addEventListener("hashchange", function () {
  window.setTimeout(updateActiveSection, 100);
});

updateHeaderState();
updateActiveSection();

if (homeLink) {
  homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    const startSection = document.querySelector("#inicio");

    if (startSection) {
      startSection.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#inicio");
      setActiveNav("inicio");
    }
  });
}

const constellationCanvas = document.querySelector(".constellation-canvas");
const canUseConstellation = constellationCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseConstellation) {
  const context = constellationCanvas.getContext("2d");
  const stars = [];
  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    active: false
  };
  let canvasWidth = 0;
  let canvasHeight = 0;
  let drawFrame = null;

  function createStars(total) {
    stars.length = 0;

    for (let index = 0; index < total; index += 1) {
      stars.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: .75 + Math.random() * 1.15,
        tone: Math.random()
      });
    }
  }

  function resizeConstellation() {
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    constellationCanvas.width = Math.floor(canvasWidth * density);
    constellationCanvas.height = Math.floor(canvasHeight * density);
    constellationCanvas.style.width = canvasWidth + "px";
    constellationCanvas.style.height = canvasHeight + "px";
    context.setTransform(density, 0, 0, density, 0, 0);

    const starCount = Math.max(44, Math.min(92, Math.round((canvasWidth * canvasHeight) / 18000)));
    createStars(starCount);
    queueConstellationDraw();
  }

  function drawLine(start, end, opacity) {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = "rgba(114, 226, 220, " + opacity + ")";
    context.lineWidth = 1;
    context.stroke();
  }

  function drawConstellation() {
    drawFrame = null;
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const nearbyStars = [];
    const visibleStars = [];

    stars.forEach(function (star) {
      const distanceToPointer = Math.hypot(star.x - pointer.x, star.y - pointer.y);
      const influence = pointer.active ? Math.max(0, 1 - distanceToPointer / 190) : 0;
      const baseOpacity = .22 + star.tone * .16;
      const pointOpacity = Math.min(.78, baseOpacity + influence * .5);

      if (influence > 0) {
        nearbyStars.push({ star: star, influence: influence });
      }

      visibleStars.push({
        star: star,
        influence: influence,
        opacity: pointOpacity
      });
    });

    if (pointer.active && nearbyStars.length > 1) {
      const constellationPath = nearbyStars
        .sort(function (first, second) {
          const firstDistance = Math.hypot(first.star.x - pointer.x, first.star.y - pointer.y);
          const secondDistance = Math.hypot(second.star.x - pointer.x, second.star.y - pointer.y);
          return firstDistance - secondDistance;
        })
        .slice(0, 4);

      constellationPath.forEach(function (current, index) {
        const next = constellationPath[index + 1];

        if (!next) {
          return;
        }

        const starDistance = Math.hypot(current.star.x - next.star.x, current.star.y - next.star.y);

        if (starDistance > 118) {
          return;
        }

        const opacity = Math.min(.26, (1 - starDistance / 118) * current.influence * next.influence * .5);
        drawLine(current.star, next.star, opacity);
      });
    }

    visibleStars.forEach(function (item) {
      context.beginPath();
      context.arc(item.star.x, item.star.y, item.star.radius + item.influence * .85, 0, Math.PI * 2);
      context.fillStyle = item.star.tone > .56
        ? "rgba(142, 120, 255, " + item.opacity + ")"
        : "rgba(114, 226, 220, " + item.opacity + ")";
      context.fill();
    });
  }

  function queueConstellationDraw() {
    if (drawFrame) {
      return;
    }

    drawFrame = window.requestAnimationFrame(drawConstellation);
  }

  window.addEventListener("resize", resizeConstellation);
  window.addEventListener("pointermove", function (event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    queueConstellationDraw();
  }, { passive: true });

  window.addEventListener("pointerleave", function () {
    pointer.active = false;
    queueConstellationDraw();
  });

  resizeConstellation();
}

const customCursor = document.querySelector(".cursor-aura");
const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (customCursor && canUseCustomCursor) {
  document.body.classList.add("has-custom-cursor");

  let cursorX = -80;
  let cursorY = -80;
  let cursorFrame = null;

  window.addEventListener("pointermove", function (event) {
    cursorX = event.clientX;
    cursorY = event.clientY;

    if (cursorFrame) {
      return;
    }

    cursorFrame = window.requestAnimationFrame(function () {
      customCursor.style.transform = "translate3d(" + cursorX + "px, " + cursorY + "px, 0)";
      cursorFrame = null;
    });
  });

  window.addEventListener("pointerleave", function () {
    document.body.classList.remove("has-custom-cursor");
  });

  window.addEventListener("pointerenter", function () {
    document.body.classList.add("has-custom-cursor");
  });

  document.addEventListener("pointerover", function (event) {
    document.body.classList.toggle("cursor-on-link", Boolean(event.target.closest("a")));
  });

  document.addEventListener("pointerout", function (event) {
    if (event.target.closest("a")) {
      document.body.classList.remove("cursor-on-link");
    }
  });
}
