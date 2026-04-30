// ════════════════════════════════════════
//  main.js — Portfolio Renderer
// ════════════════════════════════════════

const D = window.PORTFOLIO.loadData();

// ── LOGO ──────────────────────────────────────────────────────────
/**
 * Рендерит логотип в навбаре и футере из данных.
 * Если задан logoImage — показывает картинку, иначе текст.
 */
function renderLogo() {
  const h = D.hero;
  const text  = h.logoText  || 'DS.';
  const image = h.logoImage || '';

  const inner = image
    ? `<img src="${image}" alt="${text}" style="height:36px;width:auto;display:block;">`
    : `${text.replace(/\.$/, '')}<span class="dot">.</span>`;

  document.querySelectorAll('.nav-logo').forEach(el => { el.innerHTML = inner; });
}

// ── HERO ──────────────────────────────────────────────────────────
/** Заполняет секцию Hero из данных. */
function renderHero() {
  const h = D.hero;
  document.getElementById('heroAvailText').textContent = h.availableText;
  document.getElementById('heroBadge').style.display   = h.available ? '' : 'none';
  document.getElementById('heroTitle').childNodes[0].textContent = h.title + ' ';
  document.getElementById('heroHighlight').textContent = h.titleHighlight;
  document.getElementById('heroSub').textContent       = h.subtitle;
  document.getElementById('stat1Label').textContent    = h.stat1Label;
  document.getElementById('stat2Label').textContent    = h.stat2Label;
  document.getElementById('stat3Label').textContent    = h.stat3Label;
  document.getElementById('stat4Label').textContent    = h.stat4Label;

  // Счётчики из реальных данных
  const visible  = D.projects.filter(p => p.visible !== false);
  const landings = visible.filter(p => p.category === 'landing').length;
  const bots     = visible.filter(p => p.category === 'bot').length;
  document.getElementById('stat1').dataset.target = visible.length;
  document.getElementById('stat2').dataset.target = landings;
  document.getElementById('stat3').dataset.target = bots;
  document.getElementById('stat4').dataset.target = 2;

  // Telegram CTA
  const tgUrl = D.contacts.telegramUrl;
  if (tgUrl && !tgUrl.includes('YOUR')) {
    document.getElementById('heroTgBtn').href    = tgUrl;
    document.getElementById('heroTgBtn').target  = '_blank';
    document.getElementById('floatBtn').href     = tgUrl;
    document.getElementById('floatBtn').target   = '_blank';
  }
}

// ── PROJECT CARD BUILDER ──────────────────────────────────────────
/**
 * Создаёт DOM-элемент карточки проекта.
 * @param {object} p   - Объект проекта.
 * @param {number} idx - Индекс для задержки анимации.
 * @returns {HTMLElement}
 */
function buildCard(p, idx) {
  const hasDirect = p.directUrl && p.directUrl.trim();
  const hasDemo   = p.demoUrl   && p.demoUrl.trim();
  const hasGithub = p.githubUrl && p.githubUrl.trim();

  const primaryBtn = hasDirect
    ? `<a href="${p.directUrl}" class="btn btn-primary btn-sm" target="_blank">${p.directLabel || 'Открыть →'}</a>`
    : hasDemo
      ? `<a href="${p.demoUrl}" class="btn btn-primary btn-sm" target="_blank">Демо →</a>`
      : '';

  const githubBtn = hasGithub
    ? `<a href="${p.githubUrl}" class="btn btn-ghost btn-sm" target="_blank">GitHub</a>`
    : '';

  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="img-placeholder" style="background:${p.bgGradient};display:none">
         <span>${p.emoji}</span><p>${p.name}</p>
       </div>`
    : `<div class="img-placeholder" style="background:${p.bgGradient}">
         <span>${p.emoji}</span><p>${p.name}</p>
       </div>`;

  const card = document.createElement('div');
  card.className = 'card project-card reveal';
  card.dataset.cat = p.category;
  card.dataset.id  = p.id;
  card.innerHTML = `
    <div class="card-preview">
      ${imgContent}
      <div class="card-badge" style="background:${p.badgeColor}">${p.badge}</div>
      <div class="card-time">⚡ ${p.time}</div>
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="card-actions">${primaryBtn}${githubBtn}</div>
    </div>`;

  setTimeout(() => card.classList.add('visible'), 60 * idx);
  return card;
}

// ── PROJECTS (главная — только featured) ─────────────────────────
let activeFilter = 'all';

/**
 * Рендерит сетку проектов на главной странице.
 * Показывает только проекты с featured=true (и visible=true),
 * с учётом текущего фильтра по категории.
 * @param {string} [filter='all'] - Категория фильтра.
 */
function renderProjects(filter) {
  activeFilter = filter || 'all';
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const visible  = D.projects.filter(p => p.visible !== false && p.featured);
  const toRender = activeFilter === 'all'
    ? visible
    : visible.filter(p => p.category === activeFilter);

  toRender.forEach((p, idx) => grid.appendChild(buildCard(p, idx)));

  // Показать/скрыть кнопку "Все работы" если есть невидимые
  const allVisible = D.projects.filter(p => p.visible !== false);
  const btn = document.getElementById('allWorksBtn');
  if (btn) btn.style.display = allVisible.length > toRender.length ? '' : 'none';
}

/** Инициализирует фильтр-таббар. */
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

// ── SERVICES ──────────────────────────────────────────────────────
/** Рендерит сетку услуг. */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = D.services.map(s => `
    <div class="card service-card${s.featured ? ' service-card-featured' : ''} reveal">
      ${s.featured ? '<div class="featured-label">Популярно</div>' : ''}
      <div class="service-icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <div class="price">${s.price}</div>
      <ul class="service-list">${s.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
      <a class="btn btn-primary" href="#contact">Заказать</a>
    </div>`).join('');
}

// ── STACK ─────────────────────────────────────────────────────────
const GROUP_META = {
  frontend: { label: "Frontend",          color: "#6366f1" },
  backend:  { label: "Backend & Боты",    color: "#06b6d4" },
  ai:       { label: "AI-инструменты 🧠", color: "#8b5cf6", note: "Использую для ускорения разработки и генерации рутинного кода" },
  tools:    { label: "Инструменты",       color: "#22c55e" }
};

/** Рендерит секцию технологического стека по группам. */
function renderStack() {
  const groups = {};
  D.stack.forEach(item => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });

  const container = document.getElementById('stackGroups');
  if (!container) return;
  container.innerHTML = Object.entries(groups).map(([key, items]) => {
    const meta = GROUP_META[key] || { label: key, color: '#6366f1' };
    return `
      <div class="stack-group reveal">
        <div class="stack-group-header">
          <span class="stack-group-label" style="color:${meta.color}">${meta.label}</span>
          ${meta.note ? `<span class="stack-group-note">${meta.note}</span>` : ''}
        </div>
        <div class="stack-row">
          ${items.map(i => `
            <div class="stack-item">
              <div class="stack-icon">${i.icon}</div>
              <span>${i.name}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

// ── CONTACTS ──────────────────────────────────────────────────────
/** Рендерит блок контактных ссылок. */
function renderContacts() {
  const c = D.contacts;
  const links = [
    { icon: '✈️', label: 'Telegram', sub: c.telegramHandle, url: c.telegramUrl },
    { icon: '🐙', label: 'GitHub',   sub: c.githubHandle,   url: c.githubUrl },
    { icon: '📧', label: 'Email',    sub: c.email,          url: `mailto:${c.email}` },
    { icon: '💼', label: 'Kwork',    sub: c.kworkLabel,     url: c.kworkUrl }
  ];
  const el = document.getElementById('contactLinks');
  if (!el) return;
  el.innerHTML = links.map(l => `
    <a class="contact-link" href="${l.url}" target="_blank">
      <div class="clink-icon">${l.icon}</div>
      <div><strong>${l.label}</strong><span>${l.sub || ''}</span></div>
    </a>`).join('');
}

// ── COUNTERS ──────────────────────────────────────────────────────
/**
 * Анимирует числовой счётчик от 0 до target.
 * @param {HTMLElement} el - Элемент с data-target.
 */
function animateCounter(el) {
  const target = +el.dataset.target;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { el.textContent = target; clearInterval(t); }
    else el.textContent = cur;
  }, 40);
}

// ── REVEAL ────────────────────────────────────────────────────────
/** Инициализирует анимацию появления элементов при прокрутке. */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── COUNTER TRIGGER ───────────────────────────────────────────────
/** Запускает анимацию счётчиков при попадании hero-stats в viewport. */
function initCounters() {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.hstat-num').forEach(animateCounter);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(statsEl);
}

// ── NAVBAR ────────────────────────────────────────────────────────
/** Инициализирует навбар: скролл-класс, бургер-меню. */
function initNavbar() {
  const nb     = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 40), { passive: true });
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ── FORM ──────────────────────────────────────────────────────────
/** Инициализирует форму обратной связи с отправкой в Telegram. */
function initForm() {
  const form = document.getElementById('contactForm');
  const succ = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Отправляем...'; btn.disabled = true;

    const inputs  = form.querySelectorAll('input[type="text"]');
    const name    = inputs[0]?.value || '';
    const contact = inputs[1]?.value || '';
    const service = form.querySelector('select')?.value || '';
    const message = form.querySelector('textarea')?.value || '';

    const s           = D.settings || {};
    const workerUrl   = s.workerUrl   || '';   // Cloudflare Worker (работает из РФ)
    const tgToken     = s.tgBotToken  || '';   // прямой Telegram (работает вне РФ)
    const tgChatId    = s.tgChatId    || '';

    // ── 1. Cloudflare Worker (приоритет — токен скрыт, обходит блокировку РФ) ──
    if (workerUrl) {
      try {
        const res = await fetch(workerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, contact, service, message })
        });
        const json = await res.json();
        if (json.ok) {
          console.log('✅ Уведомление отправлено через Worker');
        } else {
          console.warn('⚠️ Worker error:', json.error);
        }
      } catch (err) {
        console.warn('Worker недоступен, пробуем прямой Telegram:', err.message);
        // ── 2. Прямой Telegram API (fallback — для Саудии и других стран без блокировки) ──
        if (tgToken && tgChatId) {
          await sendDirectTelegram(tgToken, tgChatId, { name, contact, service, message });
        }
      }
    } else if (tgToken && tgChatId) {
      // Worker не настроен — пробуем напрямую
      await sendDirectTelegram(tgToken, tgChatId, { name, contact, service, message });
    } else {
      console.warn('Уведомления не настроены: нет workerUrl и нет tgBotToken/tgChatId');
    }

    setTimeout(() => {
      succ.classList.add('show'); form.reset();
      btn.textContent = 'Отправить заявку 🚀'; btn.disabled = false;
      setTimeout(() => succ.classList.remove('show'), 5000);
    }, 400);
  });
}

async function sendDirectTelegram(token, chatId, { name, contact, service, message }) {
  const text = [
    '📨 <b>Новая заявка с портфолио!</b>',
    `👤 <b>Имя:</b> ${name}`,
    `📞 <b>Контакт:</b> ${contact}`,
    `🛠 <b>Услуга:</b> ${service}`,
    `📝 <b>Описание:</b> ${message || '—'}`,
    `⏰ ${new Date().toLocaleString('ru-RU')}`
  ].join('\n');
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
    const json = await res.json();
    if (json.ok) {
      console.log('✅ Telegram уведомление отправлено напрямую');
    } else {
      console.error('❌ Telegram API error:', json.description);
    }
  } catch (err) {
    console.error('❌ Прямой Telegram недоступен (заблокирован?):', err.message);
  }
}


// ── NAV HIGHLIGHT ─────────────────────────────────────────────────
/** Подсвечивает активный пункт навигации при прокрутке. */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : '';
    });
  }, { passive: true });
}

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderLogo();
  renderHero();
  renderProjects('all');
  renderServices();
  renderStack();
  renderContacts();
  initFilter();
  initReveal();
  initCounters();
  initNavbar();
  initForm();
  initNavHighlight();
});
