// Motor simples de "escolha sua aventura"
const scenes = {
  start: {
    title: "Começo da aventura",
    text: `Um dia desses, dentro de um livro da biblioteca da escola, eu descobri uma carta antiga sobre uma cidade perdida, escondida por riquezas e belezas naturais. Nessa carta, a autora deixa algumas pistas para encontrar essa cidade e eu decidi segui-las!`,
    image: "assets/floresta.jpg", // opcional. Se não tiver, pode remover ou deixar vazio.
    alt: "Ilustração de floresta tropical com cachoeira ao centro.",
    options: [
      { label: "Rio de Janeiro", next: "rio_intro", style: "primary" },
      { label: "Pernambuco", next: "pe_intro" }
    ]
  },

  rio_intro: {
    title: "Rio de Janeiro",
    text: `Você começa sua jornada no Rio de Janeiro, subindo o Pico da Tijuca ao amanhecer para encontrar a primeira pista.`,
    image: "assets/rio-pico.jpg",
    alt: "Trilha montanhosa com vegetação típica, ao amanhecer.",
    options: [
      { label: "Procurar a pista no topo do pico", next: "pico_topo", style: "primary" },
      { label: "Desistir e voltar para casa", next: "desistir", style: "danger" }
    ]
  },

  pico_topo: {
    title: "Topo do Pico da Tijuca",
    text: `No topo do Pico da Tijuca, você encontra uma antiga inscrição apontando que a próxima pista está localizada no Amazonas.`,
    image: "assets/inscricao-antiga.jpg",
    alt: "Inscrição antiga entalhada em pedra, parcialmente coberta por musgo.",
    options: [
      { label: "Seguir para o Amazonas", next: "amazonas_bifurcacao", style: "primary" }
    ]
  },

  amazonas_bifurcacao: {
    title: "Bifurcação no Amazonas",
    text: `No Amazonas, a busca pela cidade perdida se intensifica. Você se depara com um rio bifurcado.`,
    image: "assets/amazonas-rio.jpg",
    alt: "Rio largo cercado por floresta, dividindo-se em dois braços.",
    options: [
      { label: "Seguir pelo rio à esquerda", next: "rio_esquerda", style: "primary" },
      { label: "Seguir pelo rio à direita", next: "rio_direita" }
    ]
  },

  rio_direita: {
    title: "Área pantanosa",
    text: `O rio à direita termina em uma área pantanosa. Apesar de belas vistas, não há sinais da cidade perdida aqui.`,
    image: "assets/pantano.jpg",
    alt: "Área alagada com vegetação densa e névoa baixa.",
    options: [
      { label: "Retornar e tentar o outro rio", next: "rio_esquerda", style: "primary" }
    ]
  },

  rio_esquerda: {
    title: "Cachoeira escondida",
    text: `Retornando e escolhendo o rio à esquerda, você finalmente encontra a cachoeira escondida e as inscrições que levam à cidade perdida.`,
    image: "assets/cachoeira.jpg",
    alt: "Cachoeira escondida entre paredões de pedra cobertos de vegetação.",
    options: [
      { label: "Explorar a cidade perdida", next: "final", style: "primary" }
    ]
  },

  final: {
    title: "Cidade perdida",
    text: `Entre ruínas cobertas pela selva, símbolos brilham sob a água da cachoeira. Você encontrou a cidade perdida. Mas cada descoberta abre novas perguntas...`,
    image: "assets/cidade-perdida.jpg",
    alt: "Ruínas antigas com arcos de pedra e raízes entrelaçadas.",
    options: [
      { label: "Jogar novamente", next: "start", style: "primary" }
    ]
  },

  desistir: {
    title: "De volta para casa",
    text: `Você decide voltar para casa. A carta fica na sua mesa, silenciosa. Talvez em outra ocasião a aventura recomece.`,
    image: "assets/casa.jpg",
    alt: "Mesa com carta antiga ao lado de uma xícara de chá.",
    options: [
      { label: "Recomeçar", next: "start", style: "primary" }
    ]
  },

  // Caminho alternativo para Pernambuco — opcional
  pe_intro: {
    title: "Pernambuco",
    text: `Em Pernambuco, você visita a Biblioteca Pública do Recife e encontra referências sobre expedições antigas, mas nenhuma pista direta sobre a cidade perdida. Talvez o caminho comece no Rio de Janeiro.`,
    image: "assets/recife-biblioteca.jpg",
    alt: "Estantes de livros antigas com iluminação suave.",
    options: [
      { label: "Voltar e escolher Rio de Janeiro", next: "rio_intro", style: "primary" },
      { label: "Reiniciar", next: "start" }
    ]
  }
};

// Elementos do DOM
const storyEl = document.getElementById("story");
const choicesEl = document.getElementById("choices");
const imageEl = document.getElementById("scene-image");

function renderScene(id) {
  const scene = scenes[id];
  if (!scene) return;

  // Atualiza título da aba (bom para contexto)
  document.title = `${scene.title} — Aventura Interativa`;

  // Texto
  storyEl.textContent = scene.text;

  // Imagem (só mostra se houver caminho válido)
  if (scene.image) {
    imageEl.src = scene.image;
    imageEl.alt = scene.alt || "";
    imageEl.style.display = "block";
  } else {
    imageEl.removeAttribute("src");
    imageEl.alt = "";
    imageEl.style.display = "none";
  }

  // Opções
  choicesEl.innerHTML = "";
  scene.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = `button ${opt.style || ""}`;
    btn.type = "button";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      renderScene(opt.next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // Acessibilidade: setinha através de teclado já funciona por ser button
    btn.setAttribute("aria-label", `Opção ${idx + 1}: ${opt.label}`);
    choicesEl.appendChild(btn);
  });
}

// Inicia no começo
renderScene("start");
