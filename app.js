const data = window.dashboardData;

const navItems = [
  ['hero', 'Visão geral'],
  ['execution-stages', 'Etapas'],
  ['thesis', 'Tese'],
  ['offer', 'Oferta'],
  ['funnel', 'Funil'],
  ['assets', 'Ativos'],
  ['roadmap', 'Próximos blocos'],
  ['docs-map', 'Mapa dos docs'],
  ['updates', 'Atualizações']
];

const statusClassMap = {
  concluído: 'is-done',
  feito: 'is-done',
  'em andamento': 'is-active',
  próximo: 'is-next',
  'não iniciado': 'is-todo',
  bloqueado: 'is-blocked'
};

const nav = document.getElementById('nav');
nav.innerHTML = navItems
  .map(([id, label]) => `<a class="nav-link" href="#${id}">${label}</a>`)
  .join('');

const getStatusClass = (status) => statusClassMap[(status || '').toLowerCase()] || 'is-neutral';

const renderList = (items, className = '') =>
  `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

const renderStatusChip = (status) =>
  `<span class="status-chip ${getStatusClass(status)}">${status}</span>`;

document.getElementById('status-badge').textContent = data.project.status;
document.getElementById('last-update').textContent = `Última atualização: ${data.project.updatedAt}`;

document.getElementById('hero').innerHTML = `
  <div>
    <p class="eyebrow">Painel estratégico</p>
    <h2>${data.project.name}</h2>
    <p>${data.project.summary}</p>
    <div class="pill-row" style="margin-top: 18px;">
      <span class="pill">Owner: ${data.project.owner}</span>
      <span class="pill">Plataforma: ${data.project.platform}</span>
      <span class="pill">Meta: ${data.project.target}</span>
    </div>
    <div class="hero-actions">
      ${data.project.links
        .map(
          (link) => `<a class="hero-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`
        )
        .join('')}
    </div>
  </div>
  <div class="hero-side">
    <span class="kicker">Promessa principal</span>
    <h3>${data.project.promise}</h3>
    <ul>
      <li><strong>Big idea:</strong> ${data.project.bigIdea}</li>
      <li><strong>Posicionamento:</strong> IA como operador, não só como chat.</li>
      <li><strong>Uso interno:</strong> o painel agora mostra etapa por etapa o que já existe e o que ainda falta.</li>
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

document.getElementById('live-state').innerHTML = data.liveState
  .map(
    (item) => `
      <article class="live-card">
        <div class="live-head">
          <span class="kicker">${item.label}</span>
          ${renderStatusChip(item.status)}
        </div>
        <strong>${item.value}</strong>
        <p>${item.note}</p>
      </article>
    `
  )
  .join('');

document.getElementById('execution-stages').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Roadmap visual</p>
      <h3>Etapas do projeto, uma por uma</h3>
    </div>
    <p class="muted">A lógica é simples: ver rápido o que já ficou pronto, o que está em execução e o que ainda precisa nascer.</p>
  </div>
  <div class="stages-grid">
    ${data.executionStages
      .map(
        (stage) => `
          <article class="stage-card">
            <div class="stage-top">
              <span class="stage-number">Etapa ${stage.number}</span>
              ${renderStatusChip(stage.status)}
            </div>
            <h4>${stage.title}</h4>
            <p class="stage-objective">${stage.objective}</p>
            <div class="stage-meta">
              <span><strong>Owner:</strong> ${stage.owner}</span>
              <span><strong>Agora:</strong> ${stage.current}</span>
            </div>
            <div class="stage-block">
              <span class="mini-label">Entregáveis</span>
              ${renderList(stage.deliverables, 'table-like')}
            </div>
            <div class="stage-block">
              <span class="mini-label">Critério de pronto</span>
              <p class="stage-ready">${stage.ready}</p>
            </div>
          </article>
        `
      )
      .join('')}
  </div>
`;

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
            ${renderList(card.items, 'table-like')}
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
      ${renderList(data.offer.audience, 'table-like')}
    </article>
    <article class="card">
      <span class="kicker">Entrega</span>
      <h4>O que o aluno recebe</h4>
      ${renderList(data.offer.deliverables, 'table-like')}
    </article>
    <article class="card">
      <span class="kicker">Upside</span>
      <h4>Bônus e FAQs críticas</h4>
      ${renderList([...data.offer.bonuses, ...data.offer.faq], 'table-like')}
    </article>
  </div>
`;

document.getElementById('funnel').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Funil e métricas</p>
      <h3>Como o painel vai ler o negócio</h3>
    </div>
    <p class="muted">${data.funnel.note}</p>
  </div>
  <div class="funnel-grid" style="margin-bottom:20px;">
    ${data.funnel.stages
      .map(
        (stage, index) => `
          <article class="card compact-card">
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
            ${renderList(layer.metrics, 'table-like')}
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
    <p class="muted">Base suficiente para sair de tese e entrar em operação real sem fingir que já temos tráfego quando ainda não temos.</p>
  </div>
  <div class="assets-grid">
    <article class="card">
      <span class="kicker">Setup</span>
      <h4>Operação comercial</h4>
      ${renderList(data.assets.campaignSetup, 'table-like')}
    </article>
    <article class="card">
      <span class="kicker">Biblioteca</span>
      <h4>Ângulos criativos</h4>
      ${renderList(data.assets.angles, 'table-like')}
    </article>
    <article class="card">
      <span class="kicker">Criativos</span>
      <h4>Peças já planejadas</h4>
      ${renderList(data.assets.creatives, 'table-like')}
    </article>
    <article class="card">
      <span class="kicker">Produção</span>
      <h4>O que precisa existir</h4>
      ${renderList(data.assets.production, 'table-like')}
    </article>
  </div>
`;

document.getElementById('roadmap').innerHTML = `
  <div class="section-header">
    <div>
      <p class="eyebrow">Próximos blocos</p>
      <h3>O que entra depois do que já foi fechado</h3>
    </div>
    <p class="muted">Aqui fica a leitura macro da sequência operacional, sem perder o detalhe das etapas acima.</p>
  </div>
  <div class="roadmap-grid">
    ${data.roadmap
      .map(
        (phase) => `
          <article class="card phase">
            <div class="phase-top">
              <span class="kicker">${phase.phase}</span>
              ${renderStatusChip(phase.status)}
            </div>
            <strong>${phase.name}</strong>
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
    <p class="muted">A área privada do repositório concentra a base estratégica completa. O público vê só a camada sanitizada.</p>
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
            ${renderList(doc.files, 'table-like')}
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
    <p class="muted">Cada avanço relevante vira log ou documento para o projeto não depender só da conversa.</p>
  </div>
  <div class="timeline">
    ${data.updates
      .map(
        (item) => `
          <article class="timeline-item">
            <div class="live-head">
              <span class="kicker">${item.tag}</span>
              ${renderStatusChip(item.status)}
            </div>
            <h4>${item.title}</h4>
            <p>${item.body}</p>
          </article>
        `
      )
      .join('')}
  </div>
`;
