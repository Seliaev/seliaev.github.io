/**
 * IRONCORE — Фитнес-студия
 * Логика: меню, калькулятор калорий, валидация форм, анимации
 */

'use strict';

/* ====================================================
   Инициализация после загрузки DOM
==================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initRevealAnimations();
    initCalorieCalc();
    initPhoneMask();
    initTrialForm();
    initModal();
});

/* ====================================================
   Шапка: фон при скролле
==================================================== */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ====================================================
   Мобильное меню
==================================================== */
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        burger.classList.toggle('active', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Закрытие при клике на ссылку
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            nav.classList.remove('open');
            burger.classList.remove('active');
        }
    });
}

/* ====================================================
   Анимации появления при скролле
==================================================== */
function initRevealAnimations() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Каскадная задержка для карточек в одной строке
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Number(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Добавляем задержки для элементов в сетках
    addGridDelays('.programs-grid .program-card', 80);
    addGridDelays('.pricing-grid .price-card', 100);
    addGridDelays('.trainers-grid .trainer-card', 100);

    elements.forEach(el => observer.observe(el));
}

/**
 * Добавляет каскадные задержки карточкам в сетке
 * @param {string} selector - CSS-селектор карточек
 * @param {number} step - шаг задержки в мс
 */
function addGridDelays(selector, step) {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.dataset.delay = String(i * step);
    });
}

/* ====================================================
   Калькулятор калорий (формула Миффлина — Сан-Жеора)
==================================================== */
function initCalorieCalc() {
    const form = document.getElementById('calc-form');
    const resultBlock = document.getElementById('calc-result');
    if (!form || !resultBlock) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const gender = form.querySelector('input[name="gender"]:checked').value;
        const age = parseFloat(document.getElementById('calc-age').value);
        const height = parseFloat(document.getElementById('calc-height').value);
        const weight = parseFloat(document.getElementById('calc-weight').value);
        const activity = parseFloat(document.getElementById('calc-activity').value);

        if (!age || !height || !weight) return;

        // Расчёт базального метаболизма (BMR)
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        const total = Math.round(bmr * activity);
        const bmrRound = Math.round(bmr);
        const loss = Math.round(total * 0.8);     // -20% для похудения
        const maintain = total;
        const gain = Math.round(total * 1.15);    // +15% для набора массы

        // Анимированное обновление значений
        animateCounter('result-bmr', bmrRound, ' ккал');
        animateCounter('result-total', maintain, ' ккал');
        animateCounter('result-loss', loss, ' ккал');
        animateCounter('result-maintain', maintain, ' ккал');
        animateCounter('result-gain', gain, ' ккал');

        resultBlock.style.display = 'flex';
    });
}

/**
 * Анимирует числовой счётчик
 * @param {string} id - ID элемента
 * @param {number} target - целевое значение
 * @param {string} suffix - суффикс (единица измерения)
 */
function animateCounter(id, target, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    const duration = 600;
    const start = performance.now();
    const startVal = parseInt(el.textContent) || 0;

    const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(startVal + (target - startVal) * eased);
        el.textContent = current.toLocaleString('ru-RU') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
}

/* ====================================================
   Маска телефона
==================================================== */
function initPhoneMask() {
    const phoneInput = document.getElementById('trial-phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');

        if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1);
        val = val.slice(0, 10);

        let masked = '+7';
        if (val.length > 0) masked += ' (' + val.slice(0, 3);
        if (val.length >= 3) masked += ') ' + val.slice(3, 6);
        if (val.length >= 6) masked += '-' + val.slice(6, 8);
        if (val.length >= 8) masked += '-' + val.slice(8, 10);

        e.target.value = masked;
    });

    phoneInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && phoneInput.value === '+7') {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) phoneInput.value = '+7';
    });
}

/* ====================================================
   Форма пробной тренировки
==================================================== */
function initTrialForm() {
    const form = document.getElementById('trial-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('trial-name');
        const phone = document.getElementById('trial-phone');
        const program = document.getElementById('trial-program');
        let valid = true;

        // Валидация имени
        if (!name.value.trim() || name.value.trim().length < 2) {
            setError(name, true);
            valid = false;
        } else {
            setError(name, false);
        }

        // Валидация телефона (минимум 18 символов в маске)
        const phoneDigits = phone.value.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
            setError(phone, true);
            valid = false;
        } else {
            setError(phone, false);
        }

        if (!valid) return;

        // Имитация отправки
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Отправляем...';

        await new Promise(r => setTimeout(r, 1000));

        form.reset();
        btn.disabled = false;
        btn.textContent = 'Записаться бесплатно';

        openModal();
    });
}

/**
 * Устанавливает / снимает состояние ошибки у поля
 * @param {HTMLElement} field
 * @param {boolean} hasError
 */
function setError(field, hasError) {
    field.classList.toggle('error', hasError);
    field.addEventListener('input', () => setError(field, false), { once: true });
}

/* ====================================================
   Модальное окно
==================================================== */
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modal-close');
    if (!modal) return;

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
