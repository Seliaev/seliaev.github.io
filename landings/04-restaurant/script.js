/* ============================================
   GUSTO — JavaScript
   - Menu tabs + data
   - Animated counters
   - Reveal on scroll
   - Header scroll
   - Burger menu
   - Guests picker
   - Form + Modal
   - Phone mask
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================
       MENU DATA
    ============================== */
    const menuData = {
        starters: [
            { icon: '🐟', name: 'Тартар из тунца', desc: 'Свежий тунец, авокадо, соус понзу, хрустящий рис, кунжутное масло', price: '890 ₽', badge: 'Популярное' },
            { icon: '🦆', name: 'Фуа-гра с трюфелем', desc: 'Утиная печень, трюфельный жюс, бриошь, малиновый конфи', price: '1 290 ₽', badge: 'Шеф рекомендует' },
            { icon: '🥗', name: 'Карпаччо из говядины', desc: 'Мраморная говядина, руккола, пармезан 24 мес., каперсы, лимонный дрессинг', price: '790 ₽', badge: '' },
            { icon: '🦐', name: 'Гребешки а-ля Провансаль', desc: 'Морские гребешки, сливочное масло, тимьян, чеснок, томаты черри', price: '1 100 ₽', badge: 'Новинка' },
            { icon: '🥣', name: 'Крем-суп из белых грибов', desc: 'Белые грибы с фермы, трюфельное масло, пенка из пармезана, чипс из хлеба', price: '650 ₽', badge: '' },
            { icon: '🫙', name: 'Паштет из кролика', desc: 'Деревенский кролик, бренди, мадера, подается с бриошью и корнишонами', price: '720 ₽', badge: '' },
        ],
        mains: [
            { icon: '🥩', name: 'Рибай сухой выдержки', desc: '450 г, выдержка 45 дней, соус Беарнез, картофель Дофинуа, сезонные овощи', price: '3 200 ₽', badge: 'Шеф рекомендует' },
            { icon: '🦆', name: 'Утиная грудка Magret', desc: 'Конфи из бедра, апельсиновый жюс, глазированная морковь, соус Биаррад', price: '1 680 ₽', badge: 'Популярное' },
            { icon: '🐟', name: 'Турбо на гриле', desc: 'Камбала-тюрбо, картофель «Бонн Фам», мидии в белом вине, лимонное масло', price: '2 100 ₽', badge: '' },
            { icon: '🥦', name: 'Ризотто с трюфелем', desc: 'Карнарли, белый трюфель сезона, пармезан, сливочное масло, листы шалфея', price: '1 450 ₽', badge: 'Веган' },
            { icon: '🐑', name: 'Каре ягнёнка', desc: 'Фермерский ягнёнок, соус Жю-д\'Аньо, гратен из батата, пюре из горошка', price: '2 400 ₽', badge: '' },
            { icon: '🍝', name: 'Паста Тальятелле', desc: 'Свежая паста, рагу из телятины 8 часов, трюфельная стружка, пармезан', price: '1 200 ₽', badge: 'Новинка' },
        ],
        desserts: [
            { icon: '🍰', name: 'Мильфёй ванильный', desc: 'Слоёное тесто, крем Дипломат, ягоды сезона, карамельная корочка', price: '580 ₽', badge: 'Популярное' },
            { icon: '🍫', name: 'Шоколадный фондан', desc: 'Горький шоколад Valrhona 70%, ванильное мороженое, шоколадный соус', price: '620 ₽', badge: 'Шеф рекомендует' },
            { icon: '🍋', name: 'Тарт Татен с грушей', desc: 'Груши Комис, карамель Бёр Сале, миндальный крем, ванильный шарик', price: '560 ₽', badge: '' },
            { icon: '🍮', name: 'Крем-брюле', desc: 'Классический ванильный крем, хрустящая карамельная корочка, сезонные ягоды', price: '490 ₽', badge: '' },
            { icon: '🍓', name: 'Павлова с клубникой', desc: 'Меренга, маскарпоне, свежая клубника, клубничный кули, базилик', price: '540 ₽', badge: 'Сезонное' },
            { icon: '🧁', name: 'Авторское пирожное', desc: 'Меняется еженедельно — спросите у официанта о составе сегодняшнего дня', price: '420 ₽', badge: 'Сюрприз!' },
        ],
        wine: [
            { icon: '🍷', name: 'Château Margaux 2018', desc: 'Бордо, Франция · Каберне Совиньон / Мерло / Пти Вердо · Полнотелое', price: '24 000 ₽', badge: 'Коллекция' },
            { icon: '🥂', name: 'Pol Roger Brut Réserve', desc: 'Шампань, Франция · Шардоне / Пино Нуар · NV · Элегантное, минеральное', price: '8 500 ₽', badge: 'Популярное' },
            { icon: '🍾', name: 'Barolo Cannubi 2019', desc: 'Пьемонт, Италия · Неббиоло · Танинное, сложное, с нотами фиалки и дёгтя', price: '12 000 ₽', badge: '' },
            { icon: '🫧', name: 'Chablis Premier Cru 2021', desc: 'Бургундия, Франция · Шардоне · Минеральное, с нотами цитруса и кремня', price: '6 800 ₽', badge: 'К рыбе' },
            { icon: '🍷', name: 'Sassicaia 2020', desc: 'Тоскана, Италия · Каберне Совиньон · «Супертосканец», интенсивный, сложный', price: '18 500 ₽', badge: 'Шеф рекомендует' },
            { icon: '🍶', name: 'Сезонный хаус-вайн', desc: 'Подбирается сомелье еженедельно — лучшее соотношение цены и качества', price: '490 ₽/бокал', badge: 'Бокал' },
        ]
    };

    /* ==============================
       MENU TABS
    ============================== */
    const grid = document.getElementById('menu-grid');
    const tabs = document.querySelectorAll('.mtab');

    function renderMenu(cat) {
        grid.innerHTML = '';
        menuData[cat].forEach(item => {
            const el = document.createElement('div');
            el.className = 'menu-item';
            el.innerHTML = `
                <span class="mi-icon">${item.icon}</span>
                <div class="mi-name">${item.name}</div>
                <div class="mi-desc">${item.desc}</div>
                <div class="mi-footer">
                    <span class="mi-price">${item.price}</span>
                    ${item.badge ? `<span class="mi-badge">${item.badge}</span>` : ''}
                </div>
            `;
            grid.appendChild(el);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenu(tab.dataset.cat);
        });
    });
    renderMenu('starters');

    /* ==============================
       ANIMATED COUNTERS
    ============================== */
    function formatStat(val, suffix) {
        let str;
        if (val >= 1000) str = (val / 1000).toFixed(0) + 'K';
        else str = Math.round(val).toString();
        return str + (suffix || '');
    }

    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            let step = 0, steps = 60;
            const timer = setInterval(() => {
                step++;
                const cur = target * (step / steps);
                el.textContent = formatStat(cur, suffix);
                if (step >= steps) {
                    el.textContent = formatStat(target, suffix);
                    clearInterval(timer);
                }
            }, 20);
            statObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

    /* ==============================
       REVEAL ON SCROLL
    ============================== */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ==============================
       HEADER SCROLL
    ============================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* ==============================
       BURGER MENU
    ============================== */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
    }));

    /* ==============================
       GUESTS PICKER
    ============================== */
    let guests = 2;
    const guestCount = document.getElementById('guests-count');
    const guestLabel = document.querySelector('.guests-label');
    function updateGuestLabel() {
        const labels = ['', 'гость', 'гостя', 'гостя', 'гостя', 'гостей', 'гостей', 'гостей', 'гостей', 'гостей', 'гостей'];
        guestLabel.textContent = labels[Math.min(guests, 10)] || 'гостей';
        guestCount.textContent = guests;
    }
    document.getElementById('guests-minus').addEventListener('click', () => {
        if (guests > 1) { guests--; updateGuestLabel(); }
    });
    document.getElementById('guests-plus').addEventListener('click', () => {
        if (guests < 20) { guests++; updateGuestLabel(); }
    });
    updateGuestLabel();

    /* ==============================
       PHONE MASK
    ============================== */
    const phoneInput = document.getElementById('res-phone');
    phoneInput.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.startsWith('8')) v = '7' + v.slice(1);
        if (v.startsWith('7')) {
            e.target.value = '+7 (' + v.slice(1,4) + (v.length > 4 ? ') ' + v.slice(4,7) : '') + (v.length > 7 ? '-' + v.slice(7,9) : '') + (v.length > 9 ? '-' + v.slice(9,11) : '');
        }
    });

    /* ==============================
       SET MIN DATE
    ============================== */
    const dateInput = document.getElementById('res-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;

    /* ==============================
       RESERVATION FORM + MODAL
    ============================== */
    const form = document.getElementById('reserve-form');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');

    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        const name = document.getElementById('res-name');
        const phone = document.getElementById('res-phone');
        const time = document.getElementById('res-time');
        [name, phone, time].forEach(el => el.classList.remove('error'));
        if (!name.value.trim()) { name.classList.add('error'); valid = false; }
        if (phone.value.length < 10) { phone.classList.add('error'); valid = false; }
        if (!time.value) { time.classList.add('error'); valid = false; }
        if (!valid) return;
        modal.classList.add('active');
        form.reset();
        guests = 2; updateGuestLabel();
        dateInput.value = today;
    });

    function closeModal() { modal.classList.remove('active'); }
    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', e => { e.preventDefault(); closeModal(); });
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

});
