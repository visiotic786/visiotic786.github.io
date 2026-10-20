/* Enhancements layer: loads after script.js. Safe: every feature checks that its elements exist. */
(function () {
    'use strict';
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    function $(s, r) { return (r || document).querySelector(s); }
    function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

    // Scroll progress bar
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    // Animated aurora behind the hero
    var hero = $('.hero');
    if (hero && !reduce) {
        var aurora = document.createElement('div');
        aurora.className = 'hero-aurora';
        aurora.setAttribute('aria-hidden', 'true');
        aurora.innerHTML = '<i></i><i></i>';
        hero.prepend(aurora);
    }

    // Tools marquee strip under the hero
    if (hero) {
        var tools = [
            ['fa-cube', 'Blender 3D'], ['fa-pen-nib', 'Photoshop'], ['fa-bezier-curve', 'Illustrator'],
            ['fa-film', 'After Effects'], ['fa-video', 'Premiere Pro'], ['fa-layer-group', 'Figma'],
            ['fa-palette', 'DaVinci Resolve'], ['fa-fire', 'EmberGen']
        ];
        var items = tools.map(function (t) { return '<span><i class="fas ' + t[0] + '"></i>' + t[1] + '</span>'; }).join('');
        var strip = document.createElement('div');
        strip.className = 'tool-marquee';
        strip.setAttribute('aria-label', 'Tools I use');
        strip.innerHTML = '<div class="tool-marquee-track">' + items + '<span class="dup" aria-hidden="true" style="display:contents">' + items + '</span></div>';
        hero.insertAdjacentElement('afterend', strip);
    }

    // Floating actions: WhatsApp + back to top
    var stack = document.createElement('div');
    stack.className = 'fab-stack';
    stack.innerHTML =
        '<button type="button" class="fab fab-top" aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>' +
        '<a class="fab fab-wa" href="https://wa.me/923175251823" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>';
    document.body.appendChild(stack);
    var topBtn = $('.fab-top', stack);
    topBtn.addEventListener('click', function () { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

    // Scroll-driven UI (throttled with rAF)
    var ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            var max = document.documentElement.scrollHeight - innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ')';
            topBtn.classList.toggle('show', scrollY > 600);
            ticking = false;
        });
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!fine || reduce) return;

    // Cursor spotlight + 3D tilt on cards
    $$('.portfolio-card,.skill-card,.cv-card,.education-card,.extras-card,.timeline-content').forEach(function (card) {
        var glow = document.createElement('span');
        glow.className = 'fx-glow';
        glow.setAttribute('aria-hidden', 'true');
        card.classList.add('fx-card');
        card.appendChild(glow);
        var tilt = card.matches('.portfolio-card,.skill-card,.cv-card');
        card.addEventListener('pointermove', function (e) {
            var r = card.getBoundingClientRect();
            var x = e.clientX - r.left, y = e.clientY - r.top;
            card.style.setProperty('--mx', x + 'px');
            card.style.setProperty('--my', y + 'px');
            var revealed = !card.classList.contains('reveal') || card.classList.contains('active');
            if (tilt && revealed) {
                var rx = (y / r.height - 0.5) * -6, ry = (x / r.width - 0.5) * 6;
                card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
            }
        });
        card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });

    // Magnetic buttons
    $$('.btn,.social-link').forEach(function (b) {
        b.addEventListener('pointermove', function (e) {
            var r = b.getBoundingClientRect();
            b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.28) + 'px)';
        });
        b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });

    // Hero portrait parallax
    var portrait = $('.hero-portrait');
    var img = portrait && $('img', portrait);
    var orbit = portrait && $('.portrait-orbit', portrait);
    if (hero && img) {
        hero.addEventListener('pointermove', function (e) {
            var r = hero.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
            img.style.transform = 'translate3d(' + px * 14 + 'px,' + py * 14 + 'px,0)';
            if (orbit) orbit.style.transform = 'translate3d(' + px * -22 + 'px,' + py * -22 + 'px,0)';
        });
        hero.addEventListener('pointerleave', function () {
            img.style.transform = '';
            if (orbit) orbit.style.transform = '';
        });
    }
})();
