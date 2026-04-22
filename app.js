const data = window.dashboardData;

const navItems = [
  ['hero', 'Visão geral'],
  ['thesis', 'Tese'],
  ['offer', 'Oferta'],
  ['funnel', 'Funil'],
  ['assets', 'Ativos'],
  ['roadmap', 'Roadmap'],
  ['docs-map', 'Mapa dos docs'],
  ['updates', 'Atualizações']
];

const nav = document.getElementById('nav');
nav.innerHTML = navItems
  .map(([id, label]) => `<a class="nav-link" href="#${id}">${label}</a>`)
  .join('');

document.getElementById('status-badge').textContent = data.project.status;
document.getElementById('last-update').textContent = `Última atualização: ${data.project.updatedAt}`;

document.getElementById('hero').innerHTML = `
  <div>
    <p class="eyebrow">Painel estratégico inicial</p>
    <h2>${data.project.name}</h2>
    <p>${data.project.summary}</p>
    <div class="pill-row" style="margin-top: 18px;">
      <span class="pill">Owner: ${data.project.owner}</span>
      <span class="pill">Plataforma: ${data.project.platform}</span>
      <span class="pill">Meta: ${data.project.target}</span>
    </div>
  </div>
  <div class="hero-side">
    <span class="kicker">Promessa principal</span>
    <h3 style="margin:10px 0 0; font-size: 30px;">${data.project.promise}</h3>
    <ul>
      <li><strong>Big idea:</strong> ${data.project.bigIdea}</li>
      <li><strong>Posicionamento:</strong> IA como operador, não só como chat.</li>
      <li><strong>Formato:</strong> curso de entrada com trilha para upsell e software.</li>
    </ul>
  </div>
`;

document.getElementById('snapshot').innerHTML = data.snapshot
  .map(
    (item) => `
      <article class="metric-card">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <small>${item.note}</small>
      </article>
    `
  )
  .join('');

document.getElementById('thesis').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Base estratégica</p>
      <h3>Tese e posicionamento</h3>
    </div>
    <p class="muted">Tudo aqui precisa servir venda, ativação ou reutilização futura.</p>
  </div>
  <div class="pill-row" style="margin-bottom:20px;">
    ${data.thesis.pillars.map((item) => `<span class="pill">${item}</span>`).join('')}
  </div>
  <div class="card-grid">
    ${data.thesis.thesisCards
      .map(
        (card) => `
          <article class="card">
            <span class="kicker">Pilar</span>
            <h4>${card.title}</h4>
            <ul>
              ${card.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </article>
        `
      )
      .join('')}
  </div>
`;

document.getElementById('offer').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Oferta</p>
      <h3>O que está sendo vendido</h3>
    </div>
    <p class="muted">Curso prático para empresário implantar o primeiro agente dentro da empresa.</p>
  </div>
  <div class="card-grid">
    <article class="card">
      <span class="kicker">Para quem</span>
      <h4>Público-alvo</h4>
      <ul>${data.offer.audience.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
    <article class="card">
      <span class="kicker">Entrega</span>
      <h4>O que o aluno recebe</h4>
      <ul>${data.offer.deliverables.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
    <article class="card">
      <span class="kicker">Upside</span>
      <h4>Bônus e FAQs críticas</h4>
      <ul>
        ${data.offer.bonuses.map((item) => `<li>${item}</li>`).join('')}
        ${data.offer.faq.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </article>
  </div>
`;

document.getElementById('funnel').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Funil e métricas</p>
      <h3>Como o painel vai ler o negócio</h3>
    </div>
    <p class="muted">A pergunta central: onde exatamente estamos perdendo dinheiro, atenção ou ativação?</p>
  </div>
  <div class="funnel-grid" style="margin-bottom:20px;">
    ${data.funnel.stages
      .map(
        (stage, index) => `
          <article class="card">
            <span class="kicker">Etapa ${index + 1}</span>
            <h4>${stage}</h4>
          </article>
        `
      )
      .join('')}
  </div>
  <div class="card-grid">
    ${data.funnel.layers
      .map(
        (layer) => `
          <article class="card">
            <span class="kicker">Camada</span>
            <h4>${layer.title}</h4>
            <ul>${layer.metrics.map((metric) => `<li>${metric}</li>`).join('')}</ul>
          </article>
        `
      )
      .join('')}
  </div>
`;

document.getElementById('assets').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Ativos</p>
      <h3>Campanhas, criativos e produção</h3>
    </div>
    <p class="muted">Base suficiente para sair de tese e entrar em operação real.</p>
  </div>
  <div class="assets-grid">
    <article class="card">
      <span class="kicker">Setup</span>
      <h4>Operação comercial</h4>
      <ul>${data.assets.campaignSetup.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
    <article class="card">
      <span class="kicker">Biblioteca</span>
      <h4>Ângulos criativos</h4>
      <ul>${data.assets.angles.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
    <article class="card">
      <span class="kicker">Criativos</span>
      <h4>Peças já planejadas</h4>
      <ul>${data.assets.creatives.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
    <article class="card">
      <span class="kicker">Produção</span>
      <h4>O que precisa existir</h4>
      <ul>${data.assets.production.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>
  </div>
`;

document.getElementById('roadmap').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Roadmap</p>
      <h3>Como isso evolui daqui</h3>
    </div>
    <p class="muted">Entrega atual já pronta para virar operação viva.</p>
  </div>
  <div class="roadmap-grid">
    ${data.roadmap
      .map(
        (phase) => `
          <article class="card phase">
            <span class="kicker">${phase.phase}</span>
            <strong>${phase.name}</strong>
            <small>Status: ${phase.status}</small>
            <p>${phase.focus}</p>
          </article>
        `
      )
      .join('')}
  </div>
`;

document.getElementById('docs-map').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Mapa interno</p>
      <h3>Onde cada parte do projeto vive</h3>
    </div>
    <p class="muted">A área privada do repositório concentra a base estratégica completa.</p>
  </div>
  <div class="docs-grid">
    ${data.docsMap
      .map(
        (doc) => `
          <article class="card doc-card">
            <div>
              <span class="kicker">${doc.category}</span>
              <h4>${doc.description}</h4>
            </div>
            <div class="doc-meta">
              <span>${doc.files.length} arquivo(s)</span>
              <span>privado no repo</span>
            </div>
            <code>${doc.path}</code>
            <ul class="table-like">
              ${doc.files.map((file) => `<li>${file}</li>`).join('')}
            </ul>
          </article>
        `
      )
      .join('')}
  </div>
  <p class="footer-note">O dashboard mostra a visão executiva. O material bruto, os logs e a documentação completa ficam protegidos no repositório privado.</p>
`;

document.getElementById('updates').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Atualizações</p>
      <h3>Últimos marcos do projeto</h3>
    </div>
    <p class="muted">Cada avanço relevante deve ser registrado em log dentro do repositório.</p>
  </div>
  <div class="timeline">
    ${data.updates
      .map(
        (item) => `
          <article class="timeline-item">
            <span class="kicker">${item.tag}</span>
            <h4>${item.title}</h4>
            <p>${item.body}</p>
          </article>
        `
      )
      .join('')}
  </div>
`;
