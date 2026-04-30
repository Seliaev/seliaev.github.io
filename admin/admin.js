// Admin Panel Logic — use window.PORTFOLIO.* to avoid name collisions with data.js
const _P = window.PORTFOLIO;
let D = _P.loadData();
let editingProjectId = null;

// ── AUTH ─────────────────────────────────────────────────────────
const SESSION_KEY = 'portfolio_admin_session';

function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === '1'; }

function tryLogin() {
  const pass = document.getElementById('loginPass').value;
  const storedHash = D.admin?.passwordHash || _P.DEFAULT_DATA.admin.passwordHash;
  if (_P.checkPassword(pass, storedHash)) {
    sessionStorage.setItem(SESSION_KEY, '1');
    showAdmin();
  } else {
    const err = document.getElementById('loginError');
    err.classList.add('show');
    setTimeout(() => err.classList.remove('show'), 3000);
  }
}

function showAdmin() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('adminPanel').classList.remove('hidden');
  populateAll();
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
}

// ── TABS ─────────────────────────────────────────────────────────
const tabTitles = { projects:'Проекты', hero:'Hero секция', services:'Услуги', stack:'Стек технологий', contacts:'Контакты', settings:'Настройки' };

function switchTab(name) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === 'tab-' + name);
    p.classList.toggle('hidden', p.id !== 'tab-' + name);
  });
  document.getElementById('pageTitle').textContent = tabTitles[name] || name;
}

// ── PROJECTS ─────────────────────────────────────────────────────
function renderProjectsList() {
  const list = document.getElementById('projectsList');
  list.innerHTML = '';
  D.projects.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'project-row' + (p.visible === false ? ' hidden-proj' : '');
    row.dataset.idx = i;
    row.innerHTML = `
      <span class="proj-emoji">${p.emoji || '📄'}</span>
      <div class="proj-info">
        <h4>${p.name} ${p.featured ? '<span style="font-size:11px;color:var(--primary);border:1px solid rgba(99,102,241,.3);border-radius:50px;padding:2px 8px">featured</span>' : ''}</h4>
        <p>${p.category === 'landing' ? 'Лендинг' : 'Бот'} · ${p.visible === false ? '🙈 скрыт' : '👁 виден'}</p>
      </div>
      <div class="proj-actions">
        <button class="btn btn-ghost btn-sm" onclick="editProject(${i})">✏️ Изм.</button>
        <button class="btn btn-ghost btn-sm" onclick="toggleProject(${i})">${p.visible === false ? '👁' : '🙈'}</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="deleteProject(${i})">🗑</button>
      </div>`;
    list.appendChild(row);
  });
}

function editProject(idx) {
  const p = D.projects[idx];
  editingProjectId = p.id;
  document.getElementById('modalTitle').textContent = 'Редактировать: ' + p.name;
  document.getElementById('p-id').value = p.id || '';
  document.getElementById('p-name').value = p.name || '';
  document.getElementById('p-desc').value = p.description || '';
  document.getElementById('p-cat').value = p.category || 'landing';
  document.getElementById('p-badge').value = p.badge || '';
  document.getElementById('p-badge-color').value = p.badgeColor || '';
  document.getElementById('p-time').value = p.time || '';
  document.getElementById('p-emoji').value = p.emoji || '';
  document.getElementById('p-image').value = p.image || '';
  document.getElementById('p-bg').value = p.bgGradient || '';
  document.getElementById('p-tags').value = (p.tags || []).join(', ');
  document.getElementById('p-demo').value = p.demoUrl || '';
  document.getElementById('p-github').value = p.githubUrl || '';
  document.getElementById('p-direct').value = p.directUrl || '';
  document.getElementById('p-direct-label').value = p.directLabel || '';
  document.getElementById('p-visible').checked = p.visible !== false;
  document.getElementById('p-featured').checked = !!p.featured;
  openModal();
}

function addProject() {
  editingProjectId = null;
  document.getElementById('modalTitle').textContent = 'Новый проект';
  ['p-id','p-name','p-desc','p-badge','p-badge-color','p-time','p-emoji','p-image','p-bg','p-tags','p-demo','p-github','p-direct','p-direct-label'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('p-cat').value = 'landing';
  document.getElementById('p-visible').checked = true;
  document.getElementById('p-featured').checked = false;
  openModal();
}

function saveProject() {
  const data = {
    id: document.getElementById('p-id').value.trim() || ('proj-' + Date.now()),
    name: document.getElementById('p-name').value.trim(),
    description: document.getElementById('p-desc').value.trim(),
    category: document.getElementById('p-cat').value,
    badge: document.getElementById('p-badge').value.trim(),
    badgeColor: document.getElementById('p-badge-color').value.trim(),
    time: document.getElementById('p-time').value.trim(),
    emoji: document.getElementById('p-emoji').value.trim(),
    image: document.getElementById('p-image').value.trim(),
    bgGradient: document.getElementById('p-bg').value.trim(),
    tags: document.getElementById('p-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    demoUrl: document.getElementById('p-demo').value.trim(),
    githubUrl: document.getElementById('p-github').value.trim(),
    directUrl: document.getElementById('p-direct').value.trim(),
    directLabel: document.getElementById('p-direct-label').value.trim(),
    visible:  document.getElementById('p-visible').checked,
    featured: document.getElementById('p-featured').checked
  };
  if (editingProjectId) {
    const idx = D.projects.findIndex(p => p.id === editingProjectId);
    if (idx >= 0) D.projects[idx] = data;
  } else {
    D.projects.push(data);
  }
  _P.saveData(D);     // сохраняем сразу в localStorage
  closeModal();
  renderProjectsList();
  showToast();
}

function deleteProject(idx) {
  if (!confirm('Удалить проект?')) return;
  D.projects.splice(idx, 1);
  _P.saveData(D);     // сохраняем сразу в localStorage
  renderProjectsList();
}

function toggleProject(idx) {
  D.projects[idx].visible = !D.projects[idx].visible;
  _P.saveData(D);     // сохраняем сразу в localStorage
  renderProjectsList();
}

// ── MODAL ────────────────────────────────────────────────────────
function openModal() { document.getElementById('modalOverlay').classList.remove('hidden'); }
function closeModal() { document.getElementById('modalOverlay').classList.add('hidden'); }

// ── HERO ─────────────────────────────────────────────────────────
function populateHero() {
  const h = D.hero;
  document.getElementById('h-title').value = h.title || '';
  document.getElementById('h-highlight').value = h.titleHighlight || '';
  document.getElementById('h-sub').value = h.subtitle || '';
  document.getElementById('h-available-text').value = h.availableText || '';
  document.getElementById('h-available').checked = !!h.available;
  document.getElementById('h-stat1').value = h.stat1Label || '';
  document.getElementById('h-stat2').value = h.stat2Label || '';
  document.getElementById('h-stat3').value = h.stat3Label || '';
  document.getElementById('h-stat4').value = h.stat4Label || '';
  document.getElementById('h-logo-text').value  = h.logoText  || '';
  document.getElementById('h-logo-image').value = h.logoImage || '';
}

function collectHero() {
  D.hero.title = document.getElementById('h-title').value;
  D.hero.titleHighlight = document.getElementById('h-highlight').value;
  D.hero.subtitle = document.getElementById('h-sub').value;
  D.hero.availableText = document.getElementById('h-available-text').value;
  D.hero.available = document.getElementById('h-available').checked;
  D.hero.stat1Label = document.getElementById('h-stat1').value;
  D.hero.stat2Label = document.getElementById('h-stat2').value;
  D.hero.stat3Label = document.getElementById('h-stat3').value;
  D.hero.stat4Label = document.getElementById('h-stat4').value;
  D.hero.logoText   = document.getElementById('h-logo-text').value.trim();
  D.hero.logoImage  = document.getElementById('h-logo-image').value.trim();
}

// ── SERVICES ─────────────────────────────────────────────────────
function renderServicesAdmin() {
  document.getElementById('servicesAdmin').innerHTML = D.services.map((s, si) => `
    <div class="service-admin-card">
      <h4>${s.icon} ${s.name}</h4>
      <div class="field-grid">
        <div class="form-group"><label>Иконка</label><input class="s-icon" data-si="${si}" value="${s.icon}"></div>
        <div class="form-group"><label>Название</label><input class="s-name" data-si="${si}" value="${s.name}"></div>
        <div class="form-group"><label>Цена</label><input class="s-price" data-si="${si}" value="${s.price}"></div>
        <div class="form-group"><label><input type="checkbox" class="s-featured" data-si="${si}" ${s.featured?'checked':''}> Популярно</label></div>
      </div>
      <div class="service-features" id="sf-${si}">
        ${s.features.map((f,fi)=>`<div class="feature-row"><input class="s-feat" data-si="${si}" data-fi="${fi}" value="${f}"><button onclick="removeFeat(${si},${fi})">×</button></div>`).join('')}
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-top:10px" onclick="addFeat(${si})">+ Пункт</button>
    </div>`).join('');
}

function collectServices() {
  D.services.forEach((s, si) => {
    const icon = document.querySelector(`.s-icon[data-si="${si}"]`);
    const name = document.querySelector(`.s-name[data-si="${si}"]`);
    const price = document.querySelector(`.s-price[data-si="${si}"]`);
    const feat = document.querySelector(`.s-featured[data-si="${si}"]`);
    if (icon) s.icon = icon.value;
    if (name) s.name = name.value;
    if (price) s.price = price.value;
    if (feat) s.featured = feat.checked;
    s.features = [...document.querySelectorAll(`.s-feat[data-si="${si}"]`)].map(el => el.value).filter(Boolean);
  });
}

function addFeat(si) {
  D.services[si].features.push('Новый пункт');
  renderServicesAdmin();
}
function removeFeat(si, fi) {
  D.services[si].features.splice(fi, 1);
  renderServicesAdmin();
}

// ── STACK ────────────────────────────────────────────────────────
const groups = ['frontend','backend','ai','tools'];

function renderStackAdmin() {
  document.getElementById('stackAdmin').innerHTML = D.stack.map((item, i) => `
    <div class="stack-row-admin">
      <input style="width:48px" value="${item.icon}" data-field="icon" data-idx="${i}">
      <input style="flex:1" value="${item.name}" data-field="name" data-idx="${i}">
      <select data-field="group" data-idx="${i}">
        ${groups.map(g=>`<option value="${g}" ${item.group===g?'selected':''}>${g}</option>`).join('')}
      </select>
      <button class="del-btn" onclick="removeStack(${i})">×</button>
    </div>`).join('');
}

function collectStack() {
  D.stack = [...document.querySelectorAll('.stack-row-admin')].map((row, i) => ({
    icon: row.querySelector('[data-field="icon"]').value,
    name: row.querySelector('[data-field="name"]').value,
    group: row.querySelector('[data-field="group"]').value
  }));
}

function addStack() {
  D.stack.push({ icon:'⚡', name:'Новый', group:'tools' });
  renderStackAdmin();
}
function removeStack(i) { D.stack.splice(i, 1); renderStackAdmin(); }

// ── CONTACTS ─────────────────────────────────────────────────────
function populateContacts() {
  const c = D.contacts;
  document.getElementById('c-tg-handle').value = c.telegramHandle || '';
  document.getElementById('c-tg-url').value = c.telegramUrl || '';
  document.getElementById('c-gh-handle').value = c.githubHandle || '';
  document.getElementById('c-gh-url').value = c.githubUrl || '';
  document.getElementById('c-email').value = c.email || '';
  document.getElementById('c-kwork').value = c.kworkUrl || '';
  document.getElementById('c-kwork-label').value = c.kworkLabel || '';
}

function collectContacts() {
  D.contacts.telegramHandle = document.getElementById('c-tg-handle').value;
  D.contacts.telegramUrl = document.getElementById('c-tg-url').value;
  D.contacts.githubHandle = document.getElementById('c-gh-handle').value;
  D.contacts.githubUrl = document.getElementById('c-gh-url').value;
  D.contacts.email = document.getElementById('c-email').value;
  D.contacts.kworkUrl = document.getElementById('c-kwork').value;
  D.contacts.kworkLabel = document.getElementById('c-kwork-label').value;
}

// ── SETTINGS ─────────────────────────────────────────────────────
function changePassword() {
  const oldPass = document.getElementById('s-old-pass').value;
  const newPass = document.getElementById('s-new-pass').value;
  const newPass2 = document.getElementById('s-new-pass2').value;
  const msg = document.getElementById('passMsg');
  if (!newPass) { msg.textContent = '❌ Введите новый пароль'; msg.style.color='#f87171'; return; }
  if (newPass !== newPass2) { msg.textContent = '❌ Пароли не совпадают'; msg.style.color='#f87171'; return; }
  const stored = D.admin?.passwordHash || _P.DEFAULT_DATA.admin.passwordHash;
  if (!_P.checkPassword(oldPass, stored)) { msg.textContent = '❌ Неверный текущий пароль'; msg.style.color='#f87171'; return; }
  D.admin = D.admin || {};
  D.admin.passwordHash = _P.hashPassword(newPass);
  _P.saveData(D);
  msg.textContent = '✅ Пароль изменён'; msg.style.color = '#4ade80';
  ['s-old-pass','s-new-pass','s-new-pass2'].forEach(id => document.getElementById(id).value = '');
}

function populateSettings() {
  const s = D.settings || {};
  const el = id => document.getElementById(id);
  if (el('s-tg-token'))   el('s-tg-token').value   = s.tgBotToken || '';
  if (el('s-tg-chat-id')) el('s-tg-chat-id').value = s.tgChatId   || '';
}

function collectSettings() {
  D.settings = D.settings || {};
  const el = id => document.getElementById(id);
  if (el('s-tg-token'))   D.settings.tgBotToken = el('s-tg-token').value.trim();
  if (el('s-tg-chat-id')) D.settings.tgChatId   = el('s-tg-chat-id').value.trim();
}

// ── SAVE ALL ─────────────────────────────────────────────────────
function saveAll() {
  collectHero();
  collectServices();
  collectStack();
  collectContacts();
  collectSettings();
  _P.saveData(D);
  showToast();
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

function populateAll() {
  renderProjectsList();
  populateHero();
  renderServicesAdmin();
  renderStackAdmin();
  populateContacts();
  populateSettings();
}

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) showAdmin();

  document.getElementById('loginBtn').addEventListener('click', tryLogin);
  document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  document.getElementById('logoutBtn').addEventListener('click', logout);

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('saveBtn').addEventListener('click', saveAll);
  document.getElementById('addProjectBtn').addEventListener('click', addProject);
  document.getElementById('modalSave').addEventListener('click', saveProject);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  document.getElementById('addStackBtn').addEventListener('click', addStack);
  document.getElementById('changePassBtn').addEventListener('click', changePassword);
  document.getElementById('resetDataBtn').addEventListener('click', () => {
    if (confirm('Сбросить все данные к стандартным? Это действие нельзя отменить.')) {
      localStorage.removeItem('portfolio_data');
      D = _P.loadData();
      populateAll();
      showToast();
    }
  });
});
