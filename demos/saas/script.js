document.addEventListener('DOMContentLoaded', () => {

    /* === PARTICLES CANVAS === */
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 60; i++) {
        particles.push({ x: Math.random()*1920, y: Math.random()*1080, r: Math.random()*1.5+0.3,
            vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, o: Math.random()*.5+.1 });
    }
    function drawParticles() {
        ctx.clearRect(0,0,W,H);
        particles.forEach(p => {
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle = `rgba(124,58,237,${p.o})`; ctx.fill();
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0)p.x=W; if(p.x>W)p.x=0;
            if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    /* === HERO MAIN CHART === */
    const hCtx = document.getElementById('main-chart')?.getContext('2d');
    if (hCtx) {
        const hData = Array.from({length:20}, (_,i) => 60+Math.sin(i*.5)*20+Math.random()*15);
        function drawHeroChart() {
            const c = hCtx; const w=360,h=120;
            c.clearRect(0,0,w,h);
            const mn=Math.min(...hData),mx=Math.max(...hData),rng=mx-mn||1;
            const pts = hData.map((v,i) => [i*(w/(hData.length-1)), h-((v-mn)/rng)*(h-16)-8]);
            const grad = c.createLinearGradient(0,0,0,h);
            grad.addColorStop(0,'rgba(124,58,237,0.3)');
            grad.addColorStop(1,'rgba(124,58,237,0)');
            c.beginPath(); c.moveTo(pts[0][0],h);
            pts.forEach(p => c.lineTo(p[0],p[1]));
            c.lineTo(pts[pts.length-1][0],h); c.closePath();
            c.fillStyle=grad; c.fill();
            c.beginPath(); c.moveTo(pts[0][0],pts[0][1]);
            pts.forEach(p => c.lineTo(p[0],p[1]));
            c.strokeStyle='#7c3aed'; c.lineWidth=2; c.stroke();
        }
        drawHeroChart();
        setInterval(() => {
            hData.shift(); hData.push(60+Math.random()*40);
            drawHeroChart();
            const rev = 4000000 + Math.floor(Math.random()*200000);
            const el = document.getElementById('hero-revenue');
            if(el) el.textContent = '₽'+rev.toLocaleString('ru-RU');
        }, 1800);
    }

    /* === HERO DONUT === */
    const dCtx = document.getElementById('donut-chart')?.getContext('2d');
    if (dCtx) {
        const slices=[{v:.64,c:'#7c3aed'},{v:.36,c:'rgba(255,255,255,0.1)'}];
        let a=-Math.PI/2;
        dCtx.clearRect(0,0,80,80);
        slices.forEach(s=>{
            dCtx.beginPath(); dCtx.moveTo(40,40);
            dCtx.arc(40,40,34,a,a+s.v*Math.PI*2);
            dCtx.closePath(); dCtx.fillStyle=s.c; dCtx.fill();
            a+=s.v*Math.PI*2;
        });
        dCtx.beginPath(); dCtx.arc(40,40,22,0,Math.PI*2);
        dCtx.fillStyle='#0e1220'; dCtx.fill();
    }

    /* === FEATURE CHART === */
    const fCtx = document.getElementById('feature-chart')?.getContext('2d');
    if (fCtx) {
        const fData = Array.from({length:16},()=>20+Math.random()*80);
        const fData2 = fData.map(v=>v*.8+Math.random()*10);
        const w=300,h=160;
        function drawFeatureChart() {
            fCtx.clearRect(0,0,w,h);
            const mn=10,rng=90;
            const p1 = fData.map((v,i)=>[i*(w/(fData.length-1)),h-((v-mn)/rng)*(h-20)-10]);
            const p2 = fData2.map((v,i)=>[i*(w/(fData2.length-1)),h-((v-mn)/rng)*(h-20)-10]);
            const g1=fCtx.createLinearGradient(0,0,0,h);
            g1.addColorStop(0,'rgba(124,58,237,0.3)'); g1.addColorStop(1,'transparent');
            fCtx.beginPath(); fCtx.moveTo(p1[0][0],h);
            p1.forEach(p=>fCtx.lineTo(p[0],p[1]));
            fCtx.lineTo(p1[p1.length-1][0],h); fCtx.closePath();
            fCtx.fillStyle=g1; fCtx.fill();
            fCtx.beginPath(); fCtx.moveTo(p1[0][0],p1[0][1]);
            p1.forEach(p=>fCtx.lineTo(p[0],p[1]));
            fCtx.strokeStyle='#7c3aed'; fCtx.lineWidth=2; fCtx.stroke();
            fCtx.beginPath(); fCtx.moveTo(p2[0][0],p2[0][1]);
            p2.forEach(p=>fCtx.lineTo(p[0],p[1]));
            fCtx.strokeStyle='#06b6d4'; fCtx.lineWidth=1.5; fCtx.setLineDash([4,4]); fCtx.stroke();
            fCtx.setLineDash([]);
        }
        drawFeatureChart();
    }

    /* === DASHBOARD MAIN CHART === */
    function drawDpChart() {
        const c = document.getElementById('dp-main-chart')?.getContext('2d');
        if(!c) return;
        const w=480,h=160;
        const fact = [40,55,48,70,65,88,75,90,85,100,95,110];
        const plan = [50,60,60,75,75,90,85,95,95,100,100,105];
        const mn=30,rng=90;
        c.clearRect(0,0,w,h);
        // Grid lines
        for(let i=0;i<4;i++){
            const y = 10+(h-20)*(i/3);
            c.beginPath(); c.moveTo(0,y); c.lineTo(w,y);
            c.strokeStyle='rgba(255,255,255,0.05)'; c.lineWidth=1; c.stroke();
        }
        function drawLine(data, color, dashed) {
            const pts = data.map((v,i)=>[i*(w/(data.length-1)), h-((v-mn)/rng)*(h-20)-10]);
            if(dashed){c.setLineDash([5,5]);}else{c.setLineDash([]);}
            c.beginPath(); c.moveTo(pts[0][0],pts[0][1]);
            pts.forEach(p=>c.lineTo(p[0],p[1]));
            c.strokeStyle=color; c.lineWidth=2; c.stroke();
            c.setLineDash([]);
        }
        drawLine(fact,'#7c3aed',false);
        drawLine(plan,'#06b6d4',true);
    }
    drawDpChart();

    /* === DASHBOARD DONUT === */
    function drawDpDonut() {
        const c = document.getElementById('dp-donut')?.getContext('2d');
        if(!c) return;
        const channels=[
            {label:'Органика',pct:38,color:'#7c3aed'},
            {label:'Реклама',pct:27,color:'#06b6d4'},
            {label:'Прямой',pct:20,color:'#10b981'},
            {label:'Реферал',pct:15,color:'#f59e0b'},
        ];
        const leg = document.getElementById('donut-legend');
        if(leg) {
            leg.innerHTML = channels.map(ch=>
                `<div class="dl-item"><span style="display:flex;align-items:center"><span class="dl-dot" style="background:${ch.color}"></span>${ch.label}</span><span>${ch.pct}%</span></div>`
            ).join('');
        }
        let a=-Math.PI/2;
        c.clearRect(0,0,180,180);
        channels.forEach(ch=>{
            const span=ch.pct/100*Math.PI*2;
            c.beginPath(); c.moveTo(90,90);
            c.arc(90,90,80,a,a+span); c.closePath();
            c.fillStyle=ch.color; c.fill();
            a+=span;
        });
        c.beginPath(); c.arc(90,90,50,0,Math.PI*2);
        c.fillStyle='#0e1220'; c.fill();
    }
    drawDpDonut();

    /* === DASHBOARD TABS === */
    const dtabs = document.querySelectorAll('.dtab');
    const tabData = {
        overview: { title:'Обзор · апрель 2026', kpis:[['Выручка','₽4.8M','up','↑ 23%'],['Пользователи','142K','up','↑ 11%'],['Конверсия','8.7%','down','↓ 0.3%'],['MRR','₽890K','up','↑ 34%']] },
        marketing: { title:'Маркетинг · апрель 2026', kpis:[['CAC','₽1 240','down','↓ 8%'],['ROI','312%','up','↑ 45%'],['CTR','4.2%','up','↑ 0.8%'],['Показы','2.1M','up','↑ 19%']] },
        sales: { title:'Продажи · апрель 2026', kpis:[['Сделки','148','up','↑ 31%'],['Ср. чек','₽32K','up','↑ 12%'],['Pipeline','₽8.4M','up','↑ 22%'],['Win rate','67%','up','↑ 5%']] },
        product: { title:'Продукт · апрель 2026', kpis:[['DAU','28.4K','up','↑ 9%'],['Retention D7','61%','down','↓ 2%'],['NPS','74','up','↑ 6%'],['Чёрн. час','12:00','','—']] },
    };
    dtabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dtabs.forEach(t=>t.classList.remove('active'));
            tab.classList.add('active');
            const d = tabData[tab.dataset.tab];
            const title = document.getElementById('dp-page-title');
            if(title) title.textContent = d.title;
            const kpis = document.getElementById('dp-kpis');
            if(kpis) kpis.innerHTML = d.kpis.map(([l,v,dir,delta])=>
                `<div class="kpi-card"><span class="kpi-label">${l}</span><span class="kpi-val">${v}</span><span class="kpi-delta ${dir}">${delta}</span></div>`
            ).join('');
            drawDpChart(); drawDpDonut();
        });
    });

    /* === INTEGRATIONS MARQUEE === */
    const intgs = [
        {icon:'🐘',name:'PostgreSQL'},{icon:'⚡',name:'BigQuery'},{icon:'🔴',name:'Salesforce'},
        {icon:'💳',name:'Stripe'},{icon:'📊',name:'Google Ads'},{icon:'💙',name:'ВКонтакте'},
        {icon:'🟠',name:'Amplitude'},{icon:'🟦',name:'Mixpanel'},{icon:'🐬',name:'MySQL'},
        {icon:'🔵',name:'Facebook Ads'},{icon:'🟢',name:'Slack'},{icon:'📧',name:'SendGrid'},
        {icon:'🏪',name:'Shopify'},{icon:'🎯',name:'Notion'},{icon:'📦',name:'Airtable'},
        {icon:'🔷',name:'Snowflake'},{icon:'🌩️',name:'AWS S3'},{icon:'☁️',name:'Google Cloud'},
    ];
    const track = document.getElementById('marquee-track');
    if(track) {
        const doubled = [...intgs,...intgs];
        track.innerHTML = doubled.map(i=>`<div class="int-chip"><span class="int-icon">${i.icon}</span>${i.name}</div>`).join('');
    }

    /* === PRICING TOGGLE === */
    const ptogs = document.querySelectorAll('.ptog');
    ptogs.forEach(btn => {
        btn.addEventListener('click', () => {
            ptogs.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const period = btn.dataset.period;
            document.querySelectorAll('.pc-amount').forEach(el => {
                const mv = el.dataset.monthly, yv = el.dataset.yearly;
                if(mv === 'custom') { el.textContent = 'По запросу'; return; }
                const val = period==='yearly' ? yv : mv;
                el.textContent = val==='0' ? '₽0' : '₽'+parseInt(val).toLocaleString('ru-RU');
            });
        });
    });

    /* === COUNTERS === */
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(!e.isIntersecting) return;
            const el = e.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix||'';
            let step=0, steps=60;
            const timer = setInterval(()=>{
                step++;
                const cur = target*(step/steps);
                el.textContent = (target%1===0?Math.round(cur):cur.toFixed(1))+suffix;
                if(step>=steps){el.textContent=target+suffix;clearInterval(timer);}
            },20);
            counterObs.unobserve(el);
        });
    },{threshold:.5});
    document.querySelectorAll('.stat-num').forEach(el=>counterObs.observe(el));

    /* === REVEAL === */
    const revObs = new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);}});
    },{threshold:.1});
    document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

    /* === HEADER SCROLL === */
    const header = document.getElementById('header');
    window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>50));

    /* === BURGER === */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    burger.addEventListener('click',()=>{burger.classList.toggle('active');nav.classList.toggle('open');});
    document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('active');nav.classList.remove('open');}));

    /* === FAQ === */
    document.querySelectorAll('.faq-item').forEach(item=>{
        item.querySelector('.faq-q').addEventListener('click',()=>{
            const isOpen = item.dataset.open==='true';
            document.querySelectorAll('.faq-item').forEach(i=>i.dataset.open='false');
            item.dataset.open = isOpen?'false':'true';
        });
    });

    /* === CTA FORM === */
    const ctaForm = document.getElementById('cta-form');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    ctaForm?.addEventListener('submit',e=>{
        e.preventDefault();
        const email = document.getElementById('cta-email');
        if(!email.value||!email.value.includes('@')){email.classList.add('error');return;}
        email.classList.remove('error');
        toastMsg.textContent=`Отлично! Письмо отправлено на ${email.value}`;
        toast.classList.add('show');
        ctaForm.reset();
        setTimeout(()=>toast.classList.remove('show'),4000);
    });

});
