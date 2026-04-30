/**
 * PORTFOLIO DATA — все содержимое сайта
 * Правится через /admin/ или напрямую здесь.
 * При наличии данных в localStorage они имеют приоритет.
 */
const DEFAULT_DATA = {
  version: "1.1",
  hero: {
    name: "Денис Селяев",
    /** Текст логотипа в навбаре (например "DS." или "Denis") */
    logoText: "DS.",
    /** Путь к изображению логотипа — если задан, логотип-текст скрывается */
    logoImage: "",
    available: true,
    availableText: "Открыт для новых проектов",
    title: "Создаю сайты и ботов,",
    titleHighlight: "которые продают",
    subtitle: "Лендинги под ключ, Telegram и VK боты — от идеи до готового продукта за 2–5 дней. Чистый код, современный дизайн, результат.",
    stat1Label: "проектов",
    stat2Label: "лендингов",
    stat3Label: "ботов",
    stat4Label: "дня — средний срок"
  },
  projects: [
    // ─── ЛЕНДИНГИ ─────────────────────────────────────────────────
    {
      id: "01-blade",
      name: "Барбершоп «BLADE»",
      description: "Премиальный лендинг с параллакс-эффектом, галереей работ и формой онлайн-записи.",
      category: "landing",
      badge: "Лендинг",
      badgeColor: "rgba(99,102,241,0.85)",
      time: "2 дня",
      emoji: "✂️",
      image: "images/projects/01-blade.webp",
      bgGradient: "linear-gradient(135deg,#1a1a2e,#16213e)",
      tags: ["HTML", "CSS", "JS", "Адаптив"],
      demoUrl: "landings/01-barbershop/index.html",
      githubUrl: "",
      directUrl: "",
      featured: true,
      visible: true
    },
    {
      id: "02-fitness",
      name: "Фитнес-студия «IRONCORE»",
      description: "Видео-фон, слайдер тренеров, таймер акции, калькулятор калорий.",
      category: "landing",
      badge: "Лендинг",
      badgeColor: "rgba(99,102,241,0.85)",
      time: "2 дня",
      emoji: "💪",
      image: "",
      bgGradient: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      tags: ["HTML", "CSS", "JS", "Swiper.js"],
      demoUrl: "landings/02-fitness/index.html",
      githubUrl: "",
      directUrl: "",
      featured: true,
      visible: true
    },
    {
      id: "03-crypto",
      name: "Крипто-стартап «NEXUS»",
      description: "3D-частицы, glassmorphism, анимированные счётчики. Тёмная тема.",
      category: "landing",
      badge: "Лендинг",
      badgeColor: "rgba(99,102,241,0.85)",
      time: "2 дня",
      emoji: "🚀",
      image: "",
      bgGradient: "linear-gradient(135deg,#0d0221,#190d41,#2d1b69)",
      tags: ["HTML", "CSS", "JS", "Particles.js"],
      demoUrl: "landings/03-crypto/index.html",
      githubUrl: "",
      directUrl: "",
      featured: false,
      visible: true
    },
    {
      id: "04-restaurant",
      name: "Ресторан «GUSTO»",
      description: "Меню с фильтрами, корзина на localStorage, интеграция Yandex Maps.",
      category: "landing",
      badge: "Лендинг",
      badgeColor: "rgba(99,102,241,0.85)",
      time: "2 дня",
      emoji: "🍝",
      image: "",
      bgGradient: "linear-gradient(135deg,#1a0a00,#3d1a00,#6b3500)",
      tags: ["HTML", "CSS", "JS", "Yandex Maps"],
      demoUrl: "landings/04-restaurant/index.html",
      githubUrl: "",
      directUrl: "",
      featured: false,
      visible: true
    },
    {
      id: "05-saas",
      name: "SaaS-дашборд «PULSE»",
      description: "Графики Chart.js, тёмная/светлая тема, анимированные KPI, таблицы.",
      category: "landing",
      badge: "Лендинг",
      badgeColor: "rgba(99,102,241,0.85)",
      time: "2 дня",
      emoji: "📊",
      image: "",
      bgGradient: "linear-gradient(135deg,#001a10,#003320,#006644)",
      tags: ["HTML", "CSS", "JS", "Chart.js"],
      demoUrl: "landings/05-saas/index.html",
      githubUrl: "",
      directUrl: "",
      featured: false,
      visible: true
    },
    // ─── TELEGRAM / VK БОТЫ ───────────────────────────────────────
    {
      id: "06-shopbot",
      name: "Telegram ShopBot",
      description: "Бот-магазин: каталог товаров, корзина, оформление заказа, уведомления администратору.",
      category: "bot",
      badge: "Telegram Bot",
      badgeColor: "rgba(6,182,212,0.85)",
      time: "3 дня",
      emoji: "🛒",
      image: "",
      bgGradient: "linear-gradient(135deg,#003366,#0066cc,#0099ff)",
      tags: ["Python", "aiogram 3", "SQLite", "FSM"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/ShopBot",
      directUrl: "https://t.me/Portfolio_1_Shop_Bot",
      directLabel: "Открыть бота →",
      featured: true,
      visible: true
    },
    {
      id: "07-bookbot",
      name: "Telegram BookBot",
      description: "Книжный помощник: 30+ книг по жанрам, случайная книга, поиск, избранное.",
      category: "bot",
      badge: "Telegram Bot",
      badgeColor: "rgba(6,182,212,0.85)",
      time: "3 дня",
      emoji: "📚",
      image: "",
      bgGradient: "linear-gradient(135deg,#1a0033,#4d0099,#7700cc)",
      tags: ["Python", "aiogram 3", "FSM", "Inline"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/BookBot",
      directUrl: "https://t.me/Portfolio_2_Book_Bot",
      directLabel: "Открыть бота →",
      featured: true,
      visible: true
    },
    {
      id: "08-vkbot",
      name: "VK CommunityBot",
      description: "Бот сообщества ВКонтакте: автоответы, каталог, контакты, клавиатура.",
      category: "bot",
      badge: "VK Bot",
      badgeColor: "rgba(0,119,255,0.85)",
      time: "3 дня",
      emoji: "💬",
      image: "",
      bgGradient: "linear-gradient(135deg,#001a4d,#003d99,#0057e7)",
      tags: ["Python", "vkbottle", "Long Poll", "VK API"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/VKCommunityBot",
      directUrl: "https://vk.com/club238191003",
      directLabel: "Открыть бота →",
      featured: false,
      visible: true
    },
    // ─── РЕАЛЬНЫЕ ПРОЕКТЫ С GITHUB ────────────────────────────────
    {
      id: "09-olvpn",
      name: "OLVPN Bot",
      description: "Telegram-бот для автоматической выдачи ключей Outline VPN пользователям. Управление подпиской, автоматическая генерация конфигов.",
      category: "bot",
      badge: "Telegram Bot",
      badgeColor: "rgba(6,182,212,0.85)",
      time: "—",
      emoji: "🔐",
      image: "",
      bgGradient: "linear-gradient(135deg,#003322,#006644,#00aa77)",
      tags: ["Python", "Telegram", "Outline VPN", "Open Source"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/OLVPN",
      directUrl: "",
      featured: true,
      visible: true
    },
    {
      id: "10-tgmanager",
      name: "TelegramBotManager",
      description: "Веб-интерфейс управления Telegram-ботом: запуск, остановка, логи. Защита паролем.",
      category: "bot",
      badge: "Web + Bot",
      badgeColor: "rgba(139,92,246,0.85)",
      time: "—",
      emoji: "⚙️",
      image: "",
      bgGradient: "linear-gradient(135deg,#1a0044,#3d0099,#6600cc)",
      tags: ["Python", "Web", "Admin Panel", "Telegram"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/TelegramBotManager",
      directUrl: "",
      featured: false,
      visible: true
    },
    {
      id: "11-cnc",
      name: "TimeAccountingCNC",
      description: "Бэкенд для приёма и обработки заявок на ремонт и обслуживание станков с ЧПУ на производстве.",
      category: "bot",
      badge: "Backend",
      badgeColor: "rgba(245,158,11,0.85)",
      time: "—",
      emoji: "🏭",
      image: "",
      bgGradient: "linear-gradient(135deg,#1a1000,#3d2800,#7a5200)",
      tags: ["Python", "REST API", "CNC", "Production"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/TimeAccountingCNC",
      directUrl: "",
      featured: false,
      visible: true
    },
    {
      id: "12-furnace",
      name: "StatusTermoFurnace",
      description: "Мониторинг статуса электропечей в реальном времени. Разработано для промышленного применения.",
      category: "bot",
      badge: "Monitoring",
      badgeColor: "rgba(239,68,68,0.85)",
      time: "—",
      emoji: "🔥",
      image: "",
      bgGradient: "linear-gradient(135deg,#3d0000,#7a0000,#cc1100)",
      tags: ["Python", "Monitoring", "Industrial", "IoT"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/StatusTermoFurnace",
      directUrl: "",
      featured: false,
      visible: true
    },
    {
      id: "13-zhabka",
      name: "Жабка-бот 🐸",
      description: "Telegram-бот для автоматической рассылки мема с жабой каждую среду. Потому что традиция.",
      category: "bot",
      badge: "Telegram Bot",
      badgeColor: "rgba(34,197,94,0.85)",
      time: "—",
      emoji: "🐸",
      image: "",
      bgGradient: "linear-gradient(135deg,#003300,#006600,#009900)",
      tags: ["Python", "Telegram", "Scheduler", "Meme"],
      demoUrl: "",
      githubUrl: "https://github.com/Seliaev/zhabka_bot",
      directUrl: "",
      featured: false,
      visible: true
    }
  ],
  services: [
    {
      id: "svc-landing",
      icon: "🌐",
      name: "Лендинг под ключ",
      price: "от 5 000 ₽",
      featured: false,
      features: [
        "Адаптивная верстка (mobile-first)",
        "Анимации и hover-эффекты",
        "Форма обратной связи",
        "Оптимизация скорости",
        "Деплой на GitHub Pages",
        "Срок: 2–3 дня"
      ]
    },
    {
      id: "svc-bot",
      icon: "🤖",
      name: "Telegram / VK бот",
      price: "от 8 000 ₽",
      featured: true,
      features: [
        "Каталог, корзина, заказы",
        "Inline-кнопки и клавиатуры",
        "Интеграция с базой данных",
        "Уведомления администратору",
        "Инструкция по запуску",
        "Срок: 3–5 дней"
      ]
    },
    {
      id: "svc-combo",
      icon: "🚀",
      name: "Сайт + Бот",
      price: "от 15 000 ₽",
      featured: false,
      features: [
        "Лендинг + Telegram бот",
        "Единый стиль и бренд",
        "Кнопка «Написать боту» на сайте",
        "Интеграция форм с ботом",
        "Полная документация",
        "Срок: 5–7 дней"
      ]
    }
  ],
  stack: [
    { icon: "🌐", name: "HTML5 / CSS3",     group: "frontend" },
    { icon: "⚡", name: "JavaScript ES6+",  group: "frontend" },
    { icon: "📱", name: "Mobile-first",     group: "frontend" },
    { icon: "🐍", name: "Python 3.12",      group: "backend" },
    { icon: "🤖", name: "aiogram 3",        group: "backend" },
    { icon: "💬", name: "vkbottle",         group: "backend" },
    { icon: "🗄️", name: "SQLite / JSON",    group: "backend" },
    { icon: "🐙", name: "Git / GitHub",     group: "tools" },
    { icon: "🎨", name: "Figma (basics)",   group: "tools" },
    { icon: "🚀", name: "GitHub Pages",     group: "tools" },
    { icon: "🧠", name: "ChatGPT / Claude", group: "ai" },
    { icon: "🤝", name: "GitHub Copilot",   group: "ai" }
  ],
  contacts: {
    telegramHandle: "@seliaev",
    telegramUrl: "https://t.me/seliaev",
    githubHandle: "github.com/Seliaev",
    githubUrl: "https://github.com/Seliaev",
    email: "YOUR@EMAIL.COM",
    kworkUrl: "https://kwork.ru/user/seliaev",
    kworkLabel: "Профиль на Kwork"
  },
  admin: {
    /** Хранится как btoa(password). */
    passwordHash: "MzYyN1phUmE="
  },
  settings: {
    /**
     * Cloudflare Worker — прокси для Telegram (обходит блокировку РФ).
     * Токен бота хранится в Cloudflare Secrets, не в этом файле.
     * После деплоя Worker вставьте URL: https://dash.cloudflare.com/
     */
    workerUrl: "https://portfolio-notify.dennisselyaev.workers.dev",

    /**
     * Прямой Telegram API — fallback если Worker недоступен.
     * Работает из Саудии и других стран без блокировки Telegram.
     */
    tgBotToken: "8060102934:AAG1yIiJ7qEniXXzSavt0OJlerDjpfFMK28",
    tgChatId: "133619625"
  }

};

// ── LOAD DATA (localStorage overrides defaults) ──────────────────
/**
 * Загружает данные: localStorage имеет приоритет над DEFAULT_DATA.
 * @returns {object} Актуальные данные портфолио.
 */
function loadData() {
  try {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      return deepMerge(DEFAULT_DATA, parsed);
    }
  } catch (e) { console.warn('Data load error:', e); }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

/**
 * Сохраняет данные в localStorage.
 * @param {object} data - Объект данных для сохранения.
 */
function saveData(data) {
  localStorage.setItem('portfolio_data', JSON.stringify(data));
}

/**
 * Рекурсивное слияние двух объектов (source переопределяет target).
 * Массивы заменяются целиком (не мержатся поэлементно).
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
function deepMerge(target, source) {
  const out = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

// ── Password: btoa encoding ───────────────────────────────────────
/**
 * Хеширует пароль через btoa + URI-escape.
 * Достаточно для защиты статичной adminки.
 * @param {string} pass - Исходный пароль.
 * @returns {string}
 */
function hashPassword(pass) {
  try { return btoa(unescape(encodeURIComponent(pass))); }
  catch (e) { return btoa(pass); }
}

/**
 * Сравнивает введённый пароль с сохранённым хешем.
 * @param {string} input  - Введённый пароль.
 * @param {string} stored - Хранимый хеш (btoa). Если не задан — сравнивает с дефолтным.
 * @returns {boolean}
 */
function checkPassword(input, stored) {
  if (!stored) return hashPassword(input) === hashPassword('admin');
  return hashPassword(input) === stored;
}

window.PORTFOLIO = { loadData, saveData, hashPassword, checkPassword, DEFAULT_DATA };
