// =====================================================
// 🚀 ANIMAÇÃO AO SCROLL (SECTIONS)
// =====================================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

sections.forEach((section) => observer.observe(section));


// =====================================================
// 🧭 SCROLL SUAVE MENU
// =====================================================

const links = document.querySelectorAll("nav a");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    const section = document.querySelector(id);

    section.scrollIntoView({
      behavior: "smooth",
    });
  });
});


// =====================================================
// 💬 WHATSAPP (CORRIGIDO)
// =====================================================

const whatsapp = document.getElementById("whatsapp");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    whatsapp.classList.add("show");
  } else {
    whatsapp.classList.remove("show");
  }
});


// =====================================================
// ⭐ AVALIAÇÃO COM LOCALSTORAGE (SALVA NO NAVEGADOR)
// =====================================================

const avaliacoes = document.querySelectorAll("#avaliacoes article");

avaliacoes.forEach((card, index) => {
  const estrelasContainer = document.createElement("div");
  estrelasContainer.classList.add("estrelas");

  const feedback = document.createElement("div");
  feedback.classList.add("feedback");

  card.appendChild(estrelasContainer);
  card.appendChild(feedback);

  // 🔥 pega do localStorage (se existir)
  let selecionado = localStorage.getItem(`avaliacao-${index}`) || 0;

  // 🎯 cria estrelas
  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("span");
    estrela.classList.add("estrela");
    estrela.textContent = "★";

    estrelasContainer.appendChild(estrela);

    // ✨ hover
    estrela.addEventListener("mouseenter", () => {
      pintar(i);
      feedback.textContent = pegarTexto(i);
    });

    // 🔥 clique salva
    estrela.addEventListener("click", () => {
      selecionado = i;

      // 💾 SALVA no navegador
      localStorage.setItem(`avaliacao-${index}`, i);

      pintar(i);
      feedback.textContent = pegarTexto(i);
    });
  }

  // 👉 ao sair
  estrelasContainer.addEventListener("mouseleave", () => {
    pintar(selecionado);
    feedback.textContent = pegarTexto(selecionado);
  });

  // 🚀 inicializa com valor salvo
  pintar(selecionado);
  feedback.textContent = pegarTexto(selecionado);

  function pintar(qtd) {
    const estrelas = estrelasContainer.querySelectorAll(".estrela");

    estrelas.forEach((el, i) => {
      el.classList.toggle("ativa", i < qtd);
    });
  }
});


// =====================================================
// 💬 TEXTO DAS ESTRELAS
// =====================================================

function pegarTexto(nota) {
  switch (parseInt(nota)) {
    case 1:
      return "😕 Muito ruim";
    case 2:
      return "🙂 Regular";
    case 3:
      return "👍 Bom";
    case 4:
      return "😃 Muito bom";
    case 5:
      return "🔥 Excelente!";
    default:
      return "Avalie este atendimento";
  }
}

// =====================================================
// 🔥 VER MAIS SERVIÇOS
// =====================================================

const btnServicos = document.getElementById("verMaisServicos");
const servicosHidden = document.querySelectorAll(".servico-hidden");

let aberto = false;

// 🔒 GARANTE QUE COMEÇA ESCONDIDO
servicosHidden.forEach((item) => {
  item.style.display = "none";
});

btnServicos.addEventListener("click", () => {
  aberto = !aberto;

  servicosHidden.forEach((item) => {
    if (aberto) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });

  btnServicos.textContent = aberto
    ? "Ver menos"
    : "Ver mais atendimentos";
});


// =====================================================
// 💳 ABRIR DETALHE DOS PLANOS
// =====================================================

const botoesPlanos = document.querySelectorAll("#planos button");
const detalhePlanos = document.getElementById("detalhe-planos");

botoesPlanos.forEach((btn) => {
  btn.addEventListener("click", () => {
    detalhePlanos.style.display = "block";

    detalhePlanos.scrollIntoView({
      behavior: "smooth",
    });
  });
});


// =====================================================
// 🧠 EFEITO 3D NOS CARDS
// =====================================================

const cards = document.querySelectorAll(".card-especialidade");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});


// =====================================================
// 🎬 ANIMAÇÃO INDIVIDUAL DOS CARDS 🧠 ESPECIALIDADES
// =====================================================

const observerCards = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 150);
    }
  });
});

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "0.9s ease";

  observerCards.observe(card);
});


// =====================================================
// 🔥 VER MAIS ESPECIALIDADES 
// =====================================================

const btnEspecialidades = document.getElementById("verMaisEspecialidades");
const especialidadesHidden = document.querySelectorAll(".especialidade-hidden");

let abertoEspecialidades = false;

// garante que começa escondido
especialidadesHidden.forEach((item) => {
  item.style.display = "none";
});

btnEspecialidades.addEventListener("click", () => {
  abertoEspecialidades = !abertoEspecialidades;

  especialidadesHidden.forEach((item) => {
    if (abertoEspecialidades) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  btnEspecialidades.textContent = abertoEspecialidades
    ? "Ver menos"
    : "Ver mais especialidades";
});
