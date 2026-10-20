/* Enhancements: scroll progress, back to top, tools marquee, hero portrait parallax. */
(function () {
    'use strict';
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    function $(s, r) { return (r || document).querySelector(s); }

    // Scroll progress bar
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    // Back to top (appears after 600px)
    var topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'fab-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    topBtn.addEventListener('click', function () { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
    document.body.appendChild(topBtn);

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

    // Tools marquee under the hero
    var hero = $('.hero');
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
        strip.innerHTML = '<div class="tool-marquee-track">' + items + '<span style="display:contents" aria-hidden="true">' + items + '</span></div>';
        hero.insertAdjacentElement('afterend', strip);
    }

    // Hero portrait parallax (mouse devices only)
    if (!fine || reduce || !hero) return;
    var portrait = $('.hero-portrait');
    var img = portrait && $('img', portrait);
    var orbit = portrait && $('.portrait-orbit', portrait);
    if (!img) return;
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
})();
