/* ============================================
   NEXUS — JavaScript
   - Stars canvas
   - Price ticker
   - Animated counters
   - Mini + Main charts (Canvas)
   - Market table
   - Reveal on scroll
   - Burger menu
   - CTA form + Modal
============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* === STARS CANVAS === */
    const starsCanvas = document.getElementById('stars-canvas');
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    function resizeStars() {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            r: Math.random() * 1.2 + 0.2,
            a: Math.random(),
            speed: Math.random() * 0.003 + 0.001,
            drift: (Math.random() - 0.5) * 0.15
        }));
    }
    resizeStars();
    window.addEventListener('resize', resizeStars);
    function animateStars() {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        stars.forEach(s => {
            s.a += s.speed;
            const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.a));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
            s.x += s.drift;
            if (s.x < 0) s.x = starsCanvas.width;
            if (s.x > starsCanvas.width) s.x = 0;
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    /* === COIN DATA === */
    const coins = [
        { sym: 'BTC', name: 'Bitcoin', icon: '₿', color: '#f7931a', price: 67420.50, change: 3.24, cap: '1.32T' },
        { sym: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627eea', price: 3540.20, change: -1.18, cap: '425B' },
        { sym: 'BNB', name: 'BNB', icon: '◆', color: '#f3ba2f', price: 612.80, change: 0.87, cap: '89B' },
        { sym: 'SOL', name: 'Solana', icon: '◎', color: '#9945ff', price: 185.40, change: 5.62, cap: '85B' },
        { sym: 'XRP', name: 'XRP', icon: '✕', color: '#00aae4', price: 0.6124, change: -0.43, cap: '34B' }
    ];

    /* === TICKER === */
    const ticker = document.getElementById('ticker');
    const tickerItems = [...coins, ...coins].map(c => {
        const div = document.createElement('div');
        div.className = 'ticker-item';
        const sign = c.change >= 0 ? '+' : '';
        const cls = c.change >= 0 ? 't-up' : 't-down';
        div.innerHTML = `<span class="t-name">${c.sym}</span><span class="t-price">$${c.price.toLocaleString()}</span><span class="${cls}">${sign}${c.change}%</span>`;
        return div;
    });
    tickerItems.forEach(i => ticker.appendChild(i));

    /* === MARKET TABLE === */
    const rowsContainer = document.getElementById('market-rows');
    coins.forEach((c, idx) => {
        const row = document.createElement('div');
        row.className = 'market-row';
        const sign = c.change >= 0 ? '+' : '';
        const cls = c.change >= 0 ? 'up' : 'down';
        row.innerHTML = `
            <span class="mr-rank">${idx + 1}</span>
            <span class="mr-coin">
                <span class="mr-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</span>
                <span><span class="mr-name">${c.name}</span><br><span class="mr-sym">${c.sym}</span></span>
            </span>
            <span class="mr-price">$${c.price.toLocaleString()}</span>
            <span class="mr-change ${cls}">${sign}${c.change}%</span>
            <span class="mr-cap">$${c.cap}</span>
            <span class="mr-spark"><canvas width="100" height="36" id="spark-${idx}"></canvas></span>
        `;
        rowsContainer.appendChild(row);
        setTimeout(() => drawSparkline(`spark-${idx}`, c.change >= 0), 0);
    });

    function drawSparkline(id, up) {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const c = canvas.getContext('2d');
        const pts = Array.from({ length: 12 }, () => Math.random() * 30 + 3);
        if (up) { pts[pts.length - 1] = Math.max(...pts) * 0.95; }
        else { pts[pts.length - 1] = Math.min(...pts) * 1.05; }
        const w = canvas.width, h = canvas.height;
        const max = Math.max(...pts), min = Math.min(...pts);
        const scaleY = v => h - ((v - min) / (max - min + 1)) * (h - 4) - 2;
        const scaleX = i => (i / (pts.length - 1)) * w;
        const color = up ? '#10b981' : '#ef4444';
        const grad = c.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, up ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        c.beginPath();
        pts.forEach((v, i) => i === 0 ? c.moveTo(scaleX(i), scaleY(v)) : c.lineTo(scaleX(i), scaleY(v)));
        c.strokeStyle = color; c.lineWidth = 1.5; c.stroke();
        c.lineTo(w, h); c.lineTo(0, h); c.closePath();
        c.fillStyle = grad; c.fill();
    }

    /* === MINI CHART (Hero) === */
    (function drawMiniChart() {
        const canvas = document.getElementById('mini-chart');
        if (!canvas) return;
        const c = canvas.getContext('2d');
        const pts = [42,44,41,45,49,47,52,50,54,58,55,60,63,61,65];
        const w = canvas.width, h = canvas.height;
        const max = Math.max(...pts), min = Math.min(...pts);
        const sx = i => (i / (pts.length - 1)) * w;
        const sy = v => h - ((v - min) / (max - min + 1)) * (h - 6) - 3;
        const grad = c.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(0,212,255,0.3)');
        grad.addColorStop(1, 'rgba(0,212,255,0)');
        c.beginPath();
        pts.forEach((v, i) => i === 0 ? c.moveTo(sx(i), sy(v)) : c.bezierCurveTo(sx(i-0.5), sy(pts[i-1]), sx(i-0.5), sy(v), sx(i), sy(v)));
        c.strokeStyle = '#00d4ff'; c.lineWidth = 2; c.stroke();
        c.lineTo(w, h); c.lineTo(0, h); c.closePath();
        c.fillStyle = grad; c.fill();
    })();

    /* === MAIN CHART === */
    let mainChartData = {};
    function generateChartData(points, basePrice, volatility) {
        const data = [];
        let price = basePrice;
        for (let i = 0; i < points; i++) {
            price += (Math.random() - 0.48) * volatility;
            price = Math.max(price, basePrice * 0.7);
            data.push(price);
        }
        return data;
    }
    mainChartData['1D'] = generateChartData(24, 64000, 800);
    mainChartData['1W'] = generateChartData(28, 62000, 1200);
    mainChartData['1M'] = generateChartData(30, 58000, 2000);
    mainChartData['1Y'] = generateChartData(52, 40000, 3000);

    function drawMainChart(period) {
        const canvas = document.getElementById('main-chart');
        if (!canvas) return;
        canvas.width = canvas.parentElement.clientWidth - 56;
        const c = canvas.getContext('2d');
        const pts = mainChartData[period];
        const w = canvas.width, h = canvas.height;
        const max = Math.max(...pts), min = Math.min(...pts);
        const sx = i => (i / (pts.length - 1)) * w;
        const sy = v => h - ((v - min) / (max - min)) * (h - 20) - 10;
        c.clearRect(0, 0, w, h);

        // Grid lines
        c.strokeStyle = 'rgba(255,255,255,0.05)'; c.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = (i / 4) * h;
            c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
        }

        // Chart line + fill
        const grad = c.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(0,212,255,0.2)');
        grad.addColorStop(1, 'rgba(0,212,255,0)');

        c.beginPath();
        pts.forEach((v, i) => {
            if (i === 0) c.moveTo(sx(i), sy(v));
            else {
                const cpx = (sx(i) + sx(i - 1)) / 2;
                c.bezierCurveTo(cpx, sy(pts[i-1]), cpx, sy(v), sx(i), sy(v));
            }
        });
        c.strokeStyle = '#00d4ff'; c.lineWidth = 2.5; c.stroke();
        c.lineTo(w, h); c.lineTo(0, h); c.closePath();
        c.fillStyle = grad; c.fill();

        // Last price label
        const last = pts[pts.length - 1];
        const ly = sy(last);
        c.strokeStyle = 'rgba(0,212,255,0.4)'; c.lineWidth = 1; c.setLineDash([4, 4]);
        c.beginPath(); c.moveTo(0, ly); c.lineTo(w, ly); c.stroke();
        c.setLineDash([]);
        c.fillStyle = 'rgba(0,212,255,0.15)';
        c.fillRect(w - 100, ly - 14, 100, 26);
        c.fillStyle = '#00d4ff'; c.font = 'bold 12px Space Mono,monospace';
        c.textAlign = 'right';
        c.fillText('$' + Math.round(last).toLocaleString(), w - 8, ly + 4);
    }

    document.querySelectorAll('.cp').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cp').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            drawMainChart(btn.dataset.period);
        });
    });
    setTimeout(() => drawMainChart('1D'), 300);
    window.addEventListener('resize', () => drawMainChart(document.querySelector('.cp.active')?.dataset.period || '1D'));

    /* === HERO COUNTERS === */
    function formatNumber(val, prefix, suffix, decimals) {
        let str;
        if (val >= 1000000) str = (val / 1000000).toFixed(1) + 'M';
        else if (val >= 1000) str = (val / 1000).toFixed(1) + 'K';
        else str = decimals ? val.toFixed(decimals) : Math.round(val).toString();
        return (prefix || '') + str + (suffix || '');
    }
    const statEls = document.querySelectorAll('.hero-stat-val');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const decimals = parseInt(el.dataset.decimals || '0');
            let current = 0;
            const steps = 60;
            let step = 0;
            const timer = setInterval(() => {
                step++;
                current = target * (step / steps);
                el.textContent = formatNumber(current, prefix, suffix, decimals);
                if (step >= steps) {
                    el.textContent = formatNumber(target, prefix, suffix, decimals);
                    clearInterval(timer);
                }
            }, 20);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });
    statEls.forEach(el => observer.observe(el));

    /* === REVEAL ON SCROLL === */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* === HEADER SCROLL === */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* === BURGER === */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
    }));

    /* === CTA FORM === */
    const form = document.getElementById('cta-form');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const emailInput = document.getElementById('cta-email');
        if (!emailInput.value.includes('@')) {
            emailInput.classList.add('error');
            return;
        }
        emailInput.classList.remove('error');
        modal.classList.add('active');
        form.reset();
    });
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

    /* === LIVE PRICE UPDATES (simulation) === */
    setInterval(() => {
        document.querySelectorAll('.market-row').forEach((row, i) => {
            const coin = coins[i];
            const delta = (Math.random() - 0.5) * 50;
            coin.price = Math.max(0.01, coin.price + delta);
            const priceEl = row.querySelector('.mr-price');
            if (priceEl) priceEl.textContent = '$' + coin.price.toLocaleString('en', { maximumFractionDigits: coin.price > 10 ? 2 : 4 });
        });
    }, 3000);

});
