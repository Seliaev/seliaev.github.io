/**
 * BLADE Barbershop — Скрипты лендинга
 * Модули: навигация, анимации, форма, счётчики
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initBurger();
    initSmoothScroll();
    initRevealAnimations();
    initCounters();
    initBookingForm();
    initModal();
    setMinDate();
});


/* ===== Фиксированная шапка ===== */

function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Добавляем фон шапки после прокрутки 80px
        header.classList.toggle('scrolled', scrollY > 80);
        lastScroll = scrollY;
    });
}


/* ===== Бургер-меню (мобильная навигация) ===== */

function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
        // Блокируем прокрутку при открытом меню
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Закрываем меню при клике на ссылку
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}


/* ===== Плавная прокрутка к якорям ===== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}


/* ===== Анимации появления при скролле ===== */

function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Небольшая задержка для каскадного эффекта
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    // Каскадная задержка для элементов в сетках
    document.querySelectorAll('.services-grid, .team-grid, .gallery-grid').forEach(grid => {
        grid.querySelectorAll('.reveal').forEach((item, i) => {
            item.dataset.delay = i * 100;
        });
    });

    reveals.forEach(el => observer.observe(el));
}


/* ===== Анимированные счётчики статистики ===== */

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/**
 * Анимирует числовой счётчик от 0 до целевого значения
 * @param {HTMLElement} el — элемент со значением data-target
 */
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000; // длительность анимации в мс
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Функция замедления (easeOutQuart)
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        el.textContent = current.toLocaleString('ru-RU');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString('ru-RU');
        }
    }

    requestAnimationFrame(update);
}


/* ===== Валидация и отправка формы записи ===== */

function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        if (validateForm(form)) {
            // Имитируем отправку формы (в реальном проекте — fetch на бэкенд)
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Отправляем...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showModal();
                form.reset();
                submitBtn.textContent = 'Отправить заявку';
                submitBtn.disabled = false;
            }, 1200);
        }
    });
}

/**
 * Проверяет обязательные поля формы
 * @param {HTMLFormElement} form — форма записи
 * @returns {boolean} — результат валидации
 */
function validateForm(form) {
    let isValid = true;

    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const service = form.querySelector('#service');
    const date = form.querySelector('#date');
    const time = form.querySelector('#time');

    if (!name.value.trim()) {
        showError(name, 'name-error', 'Укажите ваше имя');
        isValid = false;
    }

    if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 10) {
        showError(phone, 'phone-error', 'Введите корректный номер телефона');
        isValid = false;
    }

    if (!service.value) {
        service.classList.add('error');
        isValid = false;
    }

    if (!date.value) {
        date.classList.add('error');
        isValid = false;
    }

    if (!time.value) {
        time.classList.add('error');
        isValid = false;
    }

    return isValid;
}

/** Показывает сообщение об ошибке под полем */
function showError(input, errorId, message) {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
}

/** Очищает все ошибки формы */
function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

/** Устанавливает минимальную дату — сегодня */
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}


/* ===== Модальное окно ===== */

function initModal() {
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('modal-close');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

/** Показывает модалку успешной отправки */
function showModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('active');
}
