let dialogOpener = null;
const savedInert = new Map();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Theme (light / dark) =====
(function initTheme() {
    const root = document.documentElement;
    let stored = null;
    try { stored = localStorage.getItem('portfolio-theme'); } catch (e) {}
    if (stored !== 'light' && stored !== 'dark') {
        stored = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    root.setAttribute('data-theme', stored);
    
    // Switch profile images based on initial theme
    const profileImgs = document.querySelectorAll('.hero-portrait img, .profile-img');
    profileImgs.forEach(img => {
        if (stored === 'light') {
            img.src = 'assets/profile-light.png';
        } else {
            img.src = 'assets/profile.png';
        }
    });
    
    // Listen for system theme changes if no manual preference
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        try {
            if (!localStorage.getItem('portfolio-theme')) {
                root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
                profileImgs.forEach(img => {
                    img.src = e.matches ? 'assets/profile-light.png' : 'assets/profile.png';
                });
                document.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { theme: e.matches ? 'light' : 'dark' } }));
            }
        } catch (err) {}
    });
})();

function setTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
    const btn = document.getElementById('themeToggle');
    if (btn) {
        const light = theme === 'light';
        btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
        btn.setAttribute('title', light ? 'Switch to dark theme' : 'Switch to light theme');
    }
    // Switch profile images based on theme
    const profileImgs = document.querySelectorAll('.hero-portrait img, .profile-img');
    profileImgs.forEach(img => {
        if (theme === 'light') {
            img.src = 'assets/profile-light.png';
        } else {
            img.src = 'assets/profile.png';
        }
    });
    document.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { theme: theme } }));
}
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        setTheme(next);
    });
}
const PARTICLE_COLORS = {
    dark: ['124, 58, 237', '99, 102, 241'],
    light: ['217, 119, 6', '245, 158, 11']
};
function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}
function particleColor() {
    const set = PARTICLE_COLORS[currentTheme()];
    return set[Math.floor(Math.random() * set.length)];
}

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .portfolio-item, .skill-card, .timeline-content, .contact-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ===== Particle Canvas =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = particleColor();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particleCount = reducedMotion ? 0 : Math.min(window.innerWidth < 768 ? 22 : 55, Math.floor(window.innerWidth / 24));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    if (document.hidden || reducedMotion) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${currentTheme() === 'light' ? '217, 119, 6' : '124, 58, 237'}, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();
document.addEventListener('visibilitychange', () => { if (!document.hidden && !reducedMotion) animateParticles(); });
// Recolor particles when the theme changes.
document.addEventListener('portfolio:themechange', () => {
    particles.forEach(p => { p.color = particleColor(); });
});

// ===== Navigation =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

function setMenu(open) {
    navToggle.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navLinks.inert = window.innerWidth <= 768 && !open;
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) { setMenu(false); navToggle.focus(); }
});
document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });
window.addEventListener('resize', () => setMenu(false));
setMenu(false);

// ===== Typing Effect =====
const typedText = document.getElementById('typedText');
const roles = [
    'Graphic Designer',
    'VFX Artist',
    'Motion Graphics Designer',
    'Brand Designer',
    'Web Designer',
    '3D CGI Artist',
    'Filmmaker'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (reducedMotion) { typedText.textContent = 'VFX Artist · 3D CGI · Filmmaker'; return; }
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing after page load
setTimeout(typeEffect, 1000);

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = reducedMotion ? 16 : 1500;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// ===== Skill Bar Animation =====
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const percent = card.getAttribute('data-percent');
            const progressBar = card.querySelector('.skill-progress');
            progressBar.style.width = percent + '%';
            skillObserver.unobserve(card);
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => skillObserver.observe(card));

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
    '.section-header, .about-image, .about-content, .skill-card, .timeline-item, .portfolio-item, .education-card, .extras-card, .contact-info, .contact-form, .service-card, .testimonial-card'
);

revealElements.forEach(el => {
    el.classList.add('reveal');
    if (el.classList.contains('about-image') || el.classList.contains('contact-info')) {
        el.classList.add('reveal-left');
    } else if (el.classList.contains('about-content') || el.classList.contains('contact-form')) {
        el.classList.add('reveal-right');
    }
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Portfolio Filter =====
const portfolioItems = document.querySelectorAll('.portfolio-item');

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    const formData = new FormData(contactForm);
    const subject = String(formData.get('subject_display') || '').trim();
    formData.set('subject', subject ? 'Portfolio Inquiry: ' + subject : 'New Portfolio Inquiry');
    formData.delete('subject_display');
    const status = document.getElementById('formStatus');
    status.textContent = 'Sending your message…';

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(20000)
        });

        const result = await response.json();
        if (response.ok && result.success) {
            btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            contactForm.reset();
            status.textContent = 'Thank you. Your message has been sent.';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Failed');
        }
    } catch {
        status.textContent = 'Message could not be sent. Please retry or contact me by email or WhatsApp.';
        btn.innerHTML = '<span>Error — Try Again</span><i class="fas fa-exclamation"></i>';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
            if (id === 'main') target.focus({preventScroll:true});
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
        }
    });
});

// ===== Nav Link Active State =====
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Intro Video Play Button =====
const introVideo = document.getElementById('introVideo');
const introPlayBtn = document.getElementById('introPlayBtn');
const introVideoFrame = document.getElementById('introVideoFrame');

if (introVideo && introPlayBtn) {
    introPlayBtn.addEventListener('click', () => {
        introVideo.play().catch(() => {
            introPlayBtn.classList.remove('hidden');
            introVideoFrame.classList.remove('video-playing');
        });
    });

    introVideo.addEventListener('pause', () => {
        if (introVideo.currentTime > 0 && !introVideo.ended) {
            introPlayBtn.classList.remove('hidden');
        }
    });

    introVideo.addEventListener('ended', () => {
        introPlayBtn.classList.remove('hidden');
        introVideoFrame.classList.remove('video-playing');
    });

    introVideo.addEventListener('play', () => {
        introPlayBtn.classList.add('hidden');
        introVideoFrame.classList.add('video-playing');
    });
}

// ===== Video Modal =====
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoModalClose = document.getElementById('videoModalClose');

document.querySelectorAll('.video-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const videoId = trigger.getAttribute('data-video');
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.classList.add('active');
        activateDialog(videoModal);
        document.body.style.overflow = 'hidden';
    });
});

function closeVideoModal() {
    videoModal.classList.remove('active');
    deactivateDialog(videoModal);
    videoFrame.src = '';
    document.body.style.overflow = '';
}

videoModalClose.addEventListener('click', closeVideoModal);

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// ===== Project Detail Modal =====
const projectModal = document.getElementById('projectModal');
const projectModalContent = document.getElementById('projectModalContent');
const projectDetailContent = document.getElementById('projectDetailContent');
const projectModalClose = document.getElementById('projectModalClose');
let lastFocusElement = null;

const projectDetails = {
    '3d-cgi': {
        videoId: 'zpDXjtl4hls',
        category: '3D & VFX',
        title: "Kashmir's First Fantasy Film — VFX & CGI Glimpses",
        subtitle: 'A comprehensive 5-year journey through professional 3D animation, visual effects, and cinematic production',
        sections: [
            {
                icon: 'fas fa-film',
                heading: 'Project Overview',
                content: `
                    <p>This project represents <strong>5 years of dedicated work</strong> in the field of 3D CGI (Computer-Generated Imagery) and visual effects production. What began as a personal learning journey in 2020 evolved into a comprehensive showcase of professional-level 3D animation, compositing, color grading, and cinematic storytelling.</p>
                    <p>The project was developed and refined over half a decade, with each year adding new techniques, higher complexity, and more polished results. It serves as a complete portfolio piece demonstrating end-to-end production pipeline mastery — from initial concept and 3D modeling to final color grading and delivery.</p>
                    <div class="project-detail-stats">
                        <div class="project-detail-stat">
                            <span class="project-detail-stat-number">5</span>
                            <span class="project-detail-stat-label">Years of Work</span>
                        </div>
                        <div class="project-detail-stat">
                            <span class="project-detail-stat-number">7+</span>
                            <span class="project-detail-stat-label">Software Used</span>
                        </div>
                        <div class="project-detail-stat">
                            <span class="project-detail-stat-number">2020</span>
                            <span class="project-detail-stat-label">Year Started</span>
                        </div>
                    </div>
                `
            },
            {
                icon: 'fas fa-cube',
                heading: 'Blender 3D — Modeling, Texturing, Lighting & Rendering',
                content: `
                    <p><strong>Blender 3D</strong> served as the foundation of the entire production. As a free and open-source 3D creation suite, Blender provided all the tools necessary to bring imagination to life in three-dimensional space.</p>
                    <p>The modeling phase involved creating detailed 3D assets from scratch using polygonal modeling techniques. Every object, character, and environment was built vertex by vertex, edge by edge. The process included:</p>
                    <ul>
                        <li><strong>Hard-surface modeling</strong> — Creating precise mechanical objects, architectural elements, and product visualizations with clean topology and proper edge flow</li>
                        <li><strong>Organic modeling</strong> — Sculpting natural forms, characters, and organic surfaces using Blender's powerful sculpting brushes and dynamic topology</li>
                        <li><strong>UV unwrapping</strong> — Carefully flattening 3D surfaces into 2D coordinate spaces to allow precise texture application without distortion or stretching</li>
                        <li><strong>Procedural texturing</strong> — Using node-based shader networks to create realistic materials including metals, glass, skin, fabric, and volumetric surfaces</li>
                        <li><strong>Lighting design</strong> — Setting up three-point lighting, HDRI environment maps, area lights, and volumetric lighting to achieve cinematic mood and atmosphere</li>
                        <li><strong>Cycles rendering</strong> — Using Blender's physically-based path tracing render engine to produce photorealistic final frames with accurate global illumination, caustics, and motion blur</li>
                        <li><strong>Animation</strong> — Rigging characters with bone systems, creating keyframe animations, and simulating physics-based motion including cloth, rigid bodies, and particle systems</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-magic',
                heading: 'After Effects — Compositing, VFX & Motion Graphics',
                content: `
                    <p><strong>Adobe After Effects</strong> was the primary tool for compositing — the art of combining multiple visual elements from different sources into a single, cohesive image. This is where the magic of visual effects truly happens.</p>
                    <p>The compositing workflow involved layering 3D renders from Blender with live-action footage, matte paintings, and procedural effects. Key techniques included:</p>
                    <ul>
                        <li><strong>Multi-pass compositing</strong> — Combining diffuse, specular, ambient occlusion, depth, and reflection passes from Blender's render layers to achieve maximum control over the final look</li>
                        <li><strong>Rotoscoping</strong> — Manually tracing over footage frame by frame to isolate elements and create precise masks for compositing</li>
                        <li><strong>Motion tracking</strong> — Using 3D camera tracking to insert 3D elements into live-action footage with accurate perspective, scale, and movement</li>
                        <li><strong>Particle effects</strong> — Creating dust, smoke, sparks, sparks, magical effects, and atmospheric elements using built-in particle systems and plugins</li>
                        <li><strong>Chroma keying</strong> — Removing green screen backgrounds and cleanly integrating subjects into new environments with proper edge blending and color matching</li>
                        <li><strong>Color correction</strong> — Matching the color temperature, contrast, and exposure of all composited elements to ensure visual consistency</li>
                        <li><strong>Motion graphics</strong> — Designing animated titles, lower thirds, infographics, and UI elements with smooth easing curves and professional typography</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-video',
                heading: 'Premiere Pro — Video Editing & Assembly',
                content: `
                    <p><strong>Adobe Premiere Pro</strong> was used as the non-linear editing platform where all the pieces come together. Raw footage, rendered 3D sequences, sound effects, and music were assembled into the final timeline.</p>
                    <p>The editing process focused on storytelling and pacing — ensuring that every cut serves the narrative and maintains viewer engagement. The workflow included:</p>
                    <ul>
                        <li><strong>Timeline assembly</strong> — Organizing hundreds of clips into a coherent sequence with proper pacing, rhythm, and narrative flow</li>
                        <li><strong>Multi-camera editing</strong> — Syncing and switching between multiple camera angles for dynamic coverage of live-action segments</li>
                        <li><strong>Transitions</strong> — Designing custom transitions between scenes using wipes, dissolves, light leaks, and motion-matched cuts</li>
                        <li><strong>Audio mixing</strong> — Balancing dialogue, sound effects, and music tracks with precise level control and audio effects processing</li>
                        <li><strong>Speed ramping</strong> — Creating smooth slow-motion and time-remapping effects for dramatic emphasis and dynamic visual interest</li>
                        <li><strong>Export settings</strong> — Delivering final output in multiple formats and resolutions optimized for web, broadcast, and archival purposes</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-sun',
                heading: 'DaVinci Resolve — Color Grading & Finishing',
                content: `
                    <p><strong>DaVinci Resolve</strong> is the industry standard for color grading and was used to give the project its final cinematic color palette. Color grading is arguably the most critical post-production step — it unifies the visual look and establishes the emotional tone.</p>
                    <p>The grading workflow in DaVinci Resolve involved:</p>
                    <ul>
                        <li><strong>Primary color correction</strong> — Adjusting exposure, white balance, and contrast to create a neutral, balanced starting point for every shot</li>
                        <li><strong>Secondary color correction</strong> — Isolating and adjusting specific colors, skin tones, and objects using qualifiers, power windows, and tracking</li>
                        <li><strong>Look creation</strong> — Designing custom color grades using LUTs (Look-Up Tables), curves, and color wheels to achieve a distinctive cinematic aesthetic</li>
                        <li><strong>HDR grading</strong> — Working in high dynamic range to preserve detail in highlights and shadows for maximum visual impact</li>
                        <li><strong>Shot matching</strong> — Ensuring visual continuity across hundreds of shots filmed in different locations and lighting conditions</li>
                        <li><strong>Node-based workflow</strong> — Building complex grading trees with parallel and serial nodes for non-destructive, flexible color adjustments</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-fire',
                heading: 'EmberGen — Real-Time Fluid Simulation',
                content: `
                    <p><strong>EmberGen</strong> is a real-time volumetric fluid simulation software that was used to create photorealistic fire, smoke, and explosion effects. Unlike traditional simulation tools, EmberGen provides instant visual feedback through GPU-accelerated computation.</p>
                    <p>The simulation process involved:</p>
                    <ul>
                        <li><strong>Fire simulation</strong> — Creating realistic flames with proper turbulence, temperature gradients, and fuel combustion dynamics</li>
                        <li><strong>Smoke simulation</strong> — Generating volumetric smoke plumes with accurate dispersion patterns, density variations, and wind interaction</li>
                        <li><strong>Explosion effects</strong> — Combining fireballs, shockwaves, debris particles, and smoke for catastrophic destruction sequences</li>
                        <li><strong>Export to pipeline</strong> — Baking simulations to VDB (Voxel Data Base) format for seamless integration into Blender and other 3D applications</li>
                        <li><strong>Iteration speed</strong> — Leveraging real-time preview to rapidly experiment with different simulation parameters and artistic directions</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-image',
                heading: 'Photoshop — Texture Creation, Matte Painting & Image Editing',
                content: `
                    <p><strong>Adobe Photoshop</strong> played a crucial role throughout the production pipeline, serving as the primary tool for 2D image manipulation and texture creation for 3D assets.</p>
                    <p>The Photoshop workflow encompassed:</p>
                    <ul>
                        <li><strong>Texture painting</strong> — Hand-painting diffuse, normal, roughness, and metallic maps for 3D models to add surface detail and realism</li>
                        <li><strong>Matte painting</strong> — Creating detailed background environments and digital set extensions that would be impractical or expensive to build in 3D</li>
                        <li><strong>Photo compositing</strong> — Combining multiple photographs and elements into seamless, photorealistic scenes for backgrounds and reference</li>
                        <li><strong>Concept art</strong> — Sketching and painting initial visual concepts to guide the direction of 3D modeling and scene composition</li>
                        <li><strong>Color grading stills</strong> — Color-correcting and enhancing rendered still frames to establish the desired mood and atmosphere</li>
                        <li><strong>Masking and rotoscoping</strong> — Creating precise alpha masks and selections for compositing workflows in After Effects</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-pen-nib',
                heading: 'Illustrator — Vector Graphics, Logo Design & Branding',
                content: `
                    <p><strong>Adobe Illustrator</strong> was used for all vector-based design work within the project. Its precision and scalability made it ideal for creating graphic elements that needed to remain sharp at any resolution.</p>
                    <p>The Illustrator contributions included:</p>
                    <ul>
                        <li><strong>Logo design</strong> — Creating scalable vector logos and typographic treatments for fictional brands, products, and organizations within the 3D scenes</li>
                        <li><strong>UI/UX design</strong> — Designing futuristic user interfaces, HUD (Heads-Up Display) elements, and control panels for sci-fi themed sequences</li>
                        <li><strong>Vector illustrations</strong> — Creating clean, scalable illustrations for signage, labels, packaging, and graphic elements within the 3D environments</li>
                        <li><strong>Storyboard frames</strong> — Drawing vector storyboards and shot planning diagrams to pre-visualize complex sequences before production</li>
                        <li><strong>Asset preparation</strong> — Preparing vector files for import into Blender and After Effects with proper layer organization and color profiles</li>
                    </ul>
                `
            },
            {
                icon: 'fas fa-clock',
                heading: 'Production Timeline — 5 Years of Dedication',
                content: `
                    <p>This project was not created overnight. It represents a <strong>continuous 5-year commitment</strong> to learning, experimentation, and artistic growth. Each year brought new challenges and opportunities to expand technical and creative capabilities.</p>
                    <ul>
                        <li><strong>Year 1 (2020-2021)</strong> — Foundation building: Learning Blender basics, understanding 3D workflow fundamentals, creating simple models and basic animations, establishing the initial art direction</li>
                        <li><strong>Year 2 (2021-2022)</strong> — Skill expansion: Mastering advanced modeling techniques, exploring After Effects compositing, beginning color grading studies, producing first complete short sequences</li>
                        <li><strong>Year 3 (2022-2023)</strong> — Professional integration: Working with international freelance clients at Softofix, applying skills to real-world commercial projects, refining pipeline efficiency, integrating EmberGen for simulation work</li>
                        <li><strong>Year 4 (2023-2024)</strong> — Artistic refinement: Developing a distinctive personal style, experimenting with advanced lighting and rendering techniques, creating complex multi-software sequences, building the comprehensive showreel</li>
                        <li><strong>Year 5 (2024-2025)</strong> — Final polish: Perfecting every detail, optimizing renders, conducting thorough quality reviews, assembling the final portfolio presentation with full documentation</li>
                    </ul>
                    <p>The result is a body of work that demonstrates not just technical proficiency across <strong>7+ professional software applications</strong>, but also the persistence, dedication, and passion required to master the craft of digital visual storytelling.</p>
                    <div class="software-tags">
                        <span class="software-tag"><i class="fas fa-cube"></i> Blender 3D</span>
                        <span class="software-tag"><i class="fas fa-magic"></i> After Effects</span>
                        <span class="software-tag"><i class="fas fa-video"></i> Premiere Pro</span>
                        <span class="software-tag"><i class="fas fa-sun"></i> DaVinci Resolve</span>
                        <span class="software-tag"><i class="fas fa-fire"></i> EmberGen</span>
                        <span class="software-tag"><i class="fas fa-image"></i> Photoshop</span>
                        <span class="software-tag"><i class="fas fa-pen-nib"></i> Illustrator</span>
                    </div>
                `
            }
        ]
    },
    'madiotic': {
        videoId: 'heXCfJPTP-k',
        category: 'YouTube Channel',
        title: 'Madiotic — Travel Vlogs & Cinematic Edits',
        subtitle: 'Travel films edited with Premiere Pro, DaVinci Resolve, After Effects & more',
        channelHeader: true,
        channelBanner: '',
        channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mSYwn7SoRGrjr2NAUoVu17xOhA4g_9XmU1xywDzG5fbm0=s900-c-k-c0x00ffffff-no-rj',
        channelName: 'Madiotic',
        channelSubs: '3.37K Subscribers',
        channelDesc: 'Cinematic travel vlogs, adventure documentaries & highlight reels from Azad Kashmir, Pakistan & around the world. Every video filmed, edited & produced entirely by me.',
        channelUrl: 'https://www.youtube.com/channel/UCmCXdyQ-zh-mJEQcpq3d4Xg?sub_confirmation=1',
        sections: [
            {
                icon: 'fas fa-youtube',
                heading: 'Channel Overview',
                content: `
                    <p><strong>Madiotic</strong> is my personal YouTube channel where I create cinematic travel vlogs, adventure documentaries, and highlight reels from Azad Kashmir, Pakistan, and around the world. Every video is <strong>filmed, edited, color graded, and produced</strong> entirely by me.</p>
                    <p>From drone shots of Leepa Valley to paragliding adventures in Muzaffarabad — each video showcases professional-level editing, color grading, sound design, and storytelling using <strong>Premiere Pro, DaVinci Resolve, After Effects, and Blender 3D</strong>.</p>
                    <div class="project-detail-stats">
                        <div class="project-detail-stat">
                            <span class="project-detail-stat-number">57</span>
                            <span class="project-detail-stat-label">Videos Published</span>
                        </div>
                        <div class="project-detail-stat">
                            <span class="project-detail-stat-number">92.2K</span>
                            <span class="project-detail-stat-label">Total Views</span>
                        </div>
                        <div class="project-detail-stat">
                            <span class="project-detail-stat-number">3.37K</span>
                            <span class="project-detail-stat-label">Subscribers</span>
                        </div>
                    </div>
                `
            },
            {
                icon: 'fas fa-play-circle',
                heading: 'All Videos',
                content: `
                    <div class="yt-inline-player" id="ytInlinePlayer">
                        <iframe id="ytInlineFrame" src="https://www.youtube.com/embed/heXCfJPTP-k?rel=0" title="Video Player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="yt-video-grid">
                        <div class="yt-video-item yt-video-active" onclick="openYtVideo('heXCfJPTP-k', this)">
                            <img src="https://i1.ytimg.com/vi/heXCfJPTP-k/hqdefault.jpg" alt="The Mighty 12 HAZARI" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">The Mighty 12 HAZARI | Leepa Valley</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 1,857 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('I6pTnEHmsb4', this)">
                            <img src="https://i2.ytimg.com/vi/I6pTnEHmsb4/hqdefault.jpg" alt="12 Hazari Leepa Valley Episode 02" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">12 Hazari | Leepa Valley | Episode 02</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 760 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('m816D5fWD3c', this)">
                            <img src="https://i2.ytimg.com/vi/m816D5fWD3c/hqdefault.jpg" alt="12 Hazari Leepa Valley Episode 01" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">12 Hazari | Leepa Valley | Episode 01</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 639 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('0d_PKDYAL3c', this)">
                            <img src="https://i1.ytimg.com/vi/0d_PKDYAL3c/hqdefault.jpg" alt="Neelum Valley Sharda Arangkel" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Neelum Valley | Sharda | Arangkel</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 603 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('WhzCzCUHerk', this)">
                            <img src="https://i4.ytimg.com/vi/WhzCzCUHerk/hqdefault.jpg" alt="Sultan Almaas Exclusive Interview" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Sultan Almaas | Exclusive Interview</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 481 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('s64fmaaEsuk', this)">
                            <img src="https://i4.ytimg.com/vi/s64fmaaEsuk/hqdefault.jpg" alt="Cycling in Kashmir" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Cycling in Kashmir | Sudhan Gali to Chakaar</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 353 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('uXNTX-8D8ek', this)">
                            <img src="https://i2.ytimg.com/vi/uXNTX-8D8ek/hqdefault.jpg" alt="Ganga Choti" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Till My Heart Goes LA LA LA | Ganga Choti</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 343 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('6Ivq1PqWZTg', this)">
                            <img src="https://i3.ytimg.com/vi/6Ivq1PqWZTg/hqdefault.jpg" alt="Cycling Downhill Ganga Choti" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Cycling in Downhill Traffic | Ganga Choti</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 317 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('ZFRMVdnZnsM', this)">
                            <img src="https://i3.ytimg.com/vi/ZFRMVdnZnsM/hqdefault.jpg" alt="Paragliding" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Taking Game Slow | Paragliding</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 297 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('25RSC7vhYkU', this)">
                            <img src="https://i3.ytimg.com/vi/25RSC7vhYkU/hqdefault.jpg" alt="Dubai Tour Highlights" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Dubai Tour Highlights | UAE, KSA, BAH</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 262 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('w7InWvI-0i0', this)">
                            <img src="https://i4.ytimg.com/vi/w7InWvI-0i0/hqdefault.jpg" alt="Relaxing Cycling Chakaar to Dhani" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Relaxing & Cycling | Chakaar to Dhani</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 258 views</span>
                            </div>
                        </div>
                        <div class="yt-video-item" onclick="openYtVideo('RFLsCGqXbK4', this)">
                            <img src="https://i3.ytimg.com/vi/RFLsCGqXbK4/hqdefault.jpg" alt="Relaxing Cycling Village" loading="lazy">
                            <div class="yt-video-play"><i class="fas fa-play"></i></div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">Relaxing & Cycling Around Village</span>
                                <span class="yt-video-views"><i class="fas fa-eye"></i> 181 views</span>
                            </div>
                        </div>
                        <a href="https://www.youtube.com/channel/UCmCXdyQ-zh-mJEQcpq3d4Xg?sub_confirmation=1" target="_blank" rel="noopener noreferrer" class="yt-video-item yt-view-more-card">
                            <div class="yt-view-more-icon">
                                <i class="fab fa-youtube"></i>
                            </div>
                            <div class="yt-video-info">
                                <span class="yt-video-title">View More Videos on YouTube</span>
                                <span class="yt-video-views"><i class="fas fa-external-link-alt"></i> Subscribe for more</span>
                            </div>
                        </a>
                    </div>
                `
            },
            {
                icon: 'fas fa-tools',
                heading: 'Software Used & My Role',
                content: `
                    <p>Every video on the <strong>Madiotic</strong> channel is created entirely by me — from filming and editing to thumbnails and branding. Here's exactly which software I used and how:</p>

                    <h3 style="margin:20px 0 10px; font-size:1rem;"><i class="fas fa-video" style="color:var(--accent-light); margin-right:6px;"></i> Video Editing — Premiere Pro</h3>
                    <p>These videos were edited in <strong>Adobe Premiere Pro</strong>. This includes:</p>
                    <ul>
                        <li><strong>Timeline editing</strong> — Cutting, trimming, and arranging raw footage into a polished final video</li>
                        <li><strong>Audio mixing</strong> — Balancing background music, voiceover, and natural sounds for a cinematic listening experience</li>
                        <li><strong>Speed ramping</strong> — Creating dramatic slow-motion and time-lapse sequences for drone and action shots</li>
                        <li><strong>Multi-track editing</strong> — Layering drone footage, ground camera shots, GoPro clips, and B-roll into seamless sequences</li>
                        <li><strong>Export optimization</strong> — Rendering in 4K and 1080p at the right bitrate for YouTube's best quality</li>
                    </ul>

                    <h3 style="margin:20px 0 10px; font-size:1rem;"><i class="fas fa-sun" style="color:var(--accent-light); margin-right:6px;"></i> Color Grading — DaVinci Resolve</h3>
                    <p>After editing in Premiere Pro, every video goes through <strong>DaVinci Resolve</strong> for professional color grading:</p>
                    <ul>
                        <li><strong>Cinematic color grading</strong> — Applying rich, film-like color tones to make Kashmir's landscapes look breathtaking</li>
                        <li><strong>Shot matching</strong> — Matching colors across different cameras (drone, phone, action cam) so every clip looks consistent</li>
                        <li><strong>Sky and landscape enhancement</strong> — Boosting blues in skies, greens in valleys, and warm tones in sunsets</li>
                        <li><strong>Low-light correction</strong> — Fixing exposure and noise in dawn, dusk, and night footage</li>
                        <li><strong>LUT application</strong> — Using custom Look-Up Tables for a signature Madiotic color style</li>
                    </ul>

                    <h3 style="margin:20px 0 10px; font-size:1rem;"><i class="fas fa-image" style="color:var(--accent-light); margin-right:6px;"></i> Thumbnails — Photoshop</h3>
                    <p>Every YouTube thumbnail is designed in <strong>Adobe Photoshop</strong>:</p>
                    <ul>
                        <li><strong>Photo compositing</strong> — Combining the best frames from each video into one eye-catching thumbnail image</li>
                        <li><strong>Color enhancement</strong> — Boosting saturation, contrast, and clarity to make thumbnails pop in the YouTube feed</li>
                        <li><strong>Text overlays</strong> — Adding bold, readable text with shadows and outlines for maximum click-through rate</li>
                        <li><strong>Face retouching</strong> — Enhancing expressions and skin tones for engaging, professional-looking thumbnails</li>
                        <li><strong>Before/After effects</strong> — Adding visual effects, glows, and dramatic lighting to thumbnails</li>
                    </ul>

                    <h3 style="margin:20px 0 10px; font-size:1rem;"><i class="fas fa-pen-nib" style="color:var(--accent-light); margin-right:6px;"></i> Branding & Graphics — Illustrator</h3>
                    <p><strong>Adobe Illustrator</strong> is used for all vector-based branding on the channel:</p>
                    <ul>
                        <li><strong>Channel logo</strong> — Designing the Madiotic logo as a scalable vector that looks sharp at any size</li>
                        <li><strong>Lower thirds</strong> — Creating clean, animated name tags and location labels that appear in videos</li>
                        <li><strong>Watermark design</strong> — Designing the Madiotic watermark that appears in the corner of every video</li>
                        <li><strong>Intro/outro graphics</strong> — Creating vector-based title cards, end screens, and subscribe animations</li>
                        <li><strong>Social media graphics</strong> — Designing consistent branding elements for Instagram, Facebook, and TikTok</li>
                    </ul>

                    <h3 style="margin:20px 0 10px; font-size:1rem;"><i class="fas fa-magic" style="color:var(--accent-light); margin-right:6px;"></i> Motion Graphics — After Effects</h3>
                    <p>Advanced motion graphics and effects in <strong>Adobe After Effects</strong>:</p>
                    <ul>
                        <li><strong>Animated titles</strong> — Creating cinematic opening titles and location reveals for each vlog</li>
                        <li><strong>Map animations</strong> — Designing animated travel route maps showing the journey path</li>
                        <li><strong>Text animations</strong> — Adding kinetic typography and animated captions throughout videos</li>
                        <li><strong>Transitions</strong> — Creating custom whip-pan, zoom, and light-leak transitions between scenes</li>
                    </ul>

                    <div class="software-tags">
                        <span class="software-tag"><i class="fas fa-video"></i> Premiere Pro — Video Editing</span>
                        <span class="software-tag"><i class="fas fa-sun"></i> DaVinci Resolve — Color Grading</span>
                        <span class="software-tag"><i class="fas fa-image"></i> Photoshop — Thumbnails</span>
                        <span class="software-tag"><i class="fas fa-pen-nib"></i> Illustrator — Branding</span>
                        <span class="software-tag"><i class="fas fa-magic"></i> After Effects — Motion Graphics</span>
                    </div>
                `
            },
            {
                icon: 'fas fa-external-link-alt',
                heading: 'Watch on YouTube',
                content: `
                    <p>Watch all these videos directly on YouTube, subscribe to the channel for new content, and follow Madiotic on social media for behind-the-scenes content.</p>
                    <a href="https://www.youtube.com/channel/UCmCXdyQ-zh-mJEQcpq3d4Xg?sub_confirmation=1" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top:8px;">
                        <i class="fab fa-youtube"></i> <span>Subscribe on YouTube</span>
                    </a>
                `
            }
        ]
    }
};

// ===== YouTube API — Live Channel Stats =====
const YT_API_KEY = 'AIzaSyAQWXYjD40-l-9LqQaYm-6Mde6AhwcMDCw';
const YT_CHANNEL_ID = 'UCmCXdyQ-zh-mJEQcpq3d4Xg';
let cachedYtStats = null;
let cachedYtTime = 0;

async function fetchYtStats() {
    if (cachedYtStats && Date.now() - cachedYtTime < 300000) return cachedYtStats;
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`, { signal: AbortSignal.timeout(10000) });
        if (!response.ok) return null;
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            cachedYtTime = Date.now();
            return cachedYtStats = {
                subscribers: parseInt(stats.subscriberCount),
                videos: parseInt(stats.videoCount),
                views: parseInt(stats.viewCount)
            };
        }
    } catch (e) {
        console.log('YouTube API error:', e);
    }
    return null;
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1') + 'K';
    return num.toString();
}

function updateChannelHeader(stats) {
    if (!stats) return;
    const subsEl = document.querySelector('.yt-channel-subs');
    if (subsEl) {
        subsEl.innerHTML = `<i class="fas fa-users"></i> ${formatNumber(stats.subscribers)} Subscribers`;
    }

    const cardStats = document.querySelectorAll('[data-category="youtube"] .portfolio-stat');
    [formatNumber(stats.videos) + ' Videos', formatNumber(stats.views) + ' Views', formatNumber(stats.subscribers) + ' Subscribers'].forEach((value, i) => {
        if (cardStats[i]) cardStats[i].lastChild.textContent = ' ' + value;
    });

    // Update project detail stats
    const statNumbers = document.querySelectorAll('.project-detail-stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = formatNumber(stats.videos);
        statNumbers[1].textContent = formatNumber(stats.views);
        if (statNumbers[2]) statNumbers[2].textContent = formatNumber(stats.subscribers);
    }
}

async function openProjectDetail(projectKey) {
    const project = projectDetails[projectKey];
    if (!project) return;

    projectDetailContent.dataset.project = projectKey;
    let headerHTML = '';
    if (project.channelHeader) {
        headerHTML = `
            <div class="yt-channel-header">
                <div class="yt-channel-banner" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%);">
                    ${project.channelBanner ? `<img src="${project.channelBanner}" alt="Channel Banner" class="yt-channel-banner-img" onerror="this.style.display='none'">` : ''}
                </div>
                <div class="yt-channel-profile">
                    <img src="${project.channelAvatar}" alt="${project.channelName}" class="yt-channel-avatar" onerror="this.src='https://i1.ytimg.com/vi/heXCfJPTP-k/hqdefault.jpg'">
                </div>
                <div class="yt-channel-info">
                    <h2 class="yt-channel-name">${project.channelName}</h2>
                    <span class="yt-channel-subs"><i class="fas fa-users"></i> <span id="ytSubsText">${project.channelSubs}</span></span>
                    <p class="yt-channel-desc">${project.channelDesc}</p>
                    <a href="${project.channelUrl}" target="_blank" rel="noopener noreferrer" class="yt-channel-subscribe">
                        <i class="fab fa-youtube"></i> Subscribe on YouTube
                    </a>
                </div>
            </div>
        `;
    } else {
        headerHTML = `
            <div class="project-detail-video">
                <iframe src="https://www.youtube.com/embed/${project.videoId}?autoplay=0&rel=0" title="Project Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }

    let sectionsHTML = '';
    project.sections.forEach(section => {
        sectionsHTML += `
            <div class="project-detail-section">
                <h3><i class="${section.icon}"></i> ${section.heading}</h3>
                ${section.content}
            </div>
        `;
    });

    const viewMoreHTML = '';

    projectDetailContent.innerHTML = `
        ${headerHTML}
        <span class="project-detail-category">${project.category}</span>
        <h2>${project.title}</h2>
        <p class="project-detail-subtitle">${project.subtitle}</p>
        ${sectionsHTML}
        ${viewMoreHTML}
    `;

    // Fetch live YouTube stats for channel projects
    if (project.channelHeader) {
        fetchYtStats().then(stats => {
            if (stats && projectModal.classList.contains('active') && projectDetailContent.dataset.project === projectKey) updateChannelHeader(stats);
        });
    }

    projectModalContent.scrollTop = 0;
    projectModal.classList.add('active');
    activateDialog(projectModal);
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    deactivateDialog(projectModal);
    projectDetailContent.innerHTML = '';
    document.body.style.overflow = '';
}

projectModalClose.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (projectModal.classList.contains('active')) {
            closeProjectModal();
        }
        if (videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    }
});

// Open project detail when clicking portfolio card button
document.querySelectorAll('.portfolio-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.portfolio-item');
        const category = card.getAttribute('data-category');
        if (category === '3d') {
            openProjectDetail('3d-cgi');
        } else if (category === 'youtube') {
            openProjectDetail('madiotic');
        }
    });
});

// Open project detail when clicking portfolio image
document.querySelectorAll('.portfolio-image').forEach(img => {
    img.addEventListener('click', () => {
        const card = img.closest('.portfolio-item');
        const category = card.getAttribute('data-category');
        if (category === '3d') {
            openProjectDetail('3d-cgi');
        } else if (category === 'youtube') {
            openProjectDetail('madiotic');
        }
    });
});

function openYtVideo(videoId, el) {
    const inlineFrame = document.getElementById('ytInlineFrame');
    if (inlineFrame) {
        inlineFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        document.getElementById('ytInlinePlayer').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    } else {
        // Fallback for 3D project — update top video iframe
        const content = document.getElementById('projectDetailContent');
        const topVideo = content.querySelector('.project-detail-video iframe');
        if (topVideo) {
            topVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            document.getElementById('projectModalContent').scrollTop = 0;
        }
    }
    // Highlight active video
    document.querySelectorAll('.yt-video-item').forEach(item => item.classList.remove('yt-video-active'));
    if (el) el.classList.add('yt-video-active');
}

// Keyboard support for the project image buttons.
document.querySelectorAll('.portfolio-image').forEach(image => {
    image.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); image.click(); }
    });
});
document.getElementById('copyrightYear').textContent = new Date().getFullYear();

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    });
}

// Dialog focus is contained and restored; the background cannot receive clicks or focus.
function activateDialog(dialog) {
    dialogOpener = document.activeElement;
    dialog.setAttribute('aria-hidden', 'false');
    Array.from(document.body.children).forEach(el => {
        if (el !== dialog && el.tagName !== 'SCRIPT') { savedInert.set(el, el.inert); el.inert = true; }
    });
    dialog.querySelector('button').focus();
}
function deactivateDialog(dialog) {
    dialog.setAttribute('aria-hidden', 'true');
    savedInert.forEach((value, el) => el.inert = value);
    savedInert.clear();
    if (dialogOpener?.isConnected) dialogOpener.focus();
}
document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const dialog = document.querySelector('.project-modal.active, .video-modal.active');
    if (!dialog) return;
    const items = Array.from(dialog.querySelectorAll('a[href], button, input, iframe, [tabindex="0"]')).filter(el => !el.disabled && el.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ============================================================
   ENHANCEMENTS (merged from enhancements.js)
   Scroll progress, back to top, tools marquee, hero portrait parallax.
   ============================================================ */
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
/* ============================================================
   v3 interactions — ambient spotlight, appearance customizer,
   AI lab
   ============================================================ */
(function () {
    'use strict';

    // ===== Appearance Customizer =====
    var paletteBtn = document.getElementById('themePalette');
    var palettePopup = document.getElementById('palettePopup');
    var allPaletteItems = Array.from(document.querySelectorAll('.palette-item'));
    var body = document.body;
    var html = document.documentElement;

    // ---- Accent color ----
    var accentItems = Array.from(document.querySelectorAll('.palette-item[data-theme-color]'));
    var savedColor = localStorage.getItem('portfolio-theme-color');

    function applyColorTheme(color) {
        if (!color) return;
        html.setAttribute('data-theme-color', color);
        localStorage.setItem('portfolio-theme-color', color);
        accentItems.forEach(function (item) {
            item.setAttribute('aria-pressed', String(item.dataset.themeColor === color));
        });
    }

    if (savedColor) applyColorTheme(savedColor);

    // ---- Nav logo icon ----
    var iconItems = Array.from(document.querySelectorAll('.palette-item[data-logo-icon]'));
    var savedIcon = localStorage.getItem('portfolio-logo-icon');
    var logoIconEl = document.querySelector('.nav-logo-mark i');

    function applyLogoIcon(iconClass) {
        if (!iconClass || !logoIconEl) return;
        logoIconEl.className = 'fas fa-' + iconClass + ' active-icon';
        html.setAttribute('data-logo-icon', iconClass);
        localStorage.setItem('portfolio-logo-icon', iconClass);
        iconItems.forEach(function (item) {
            item.setAttribute('aria-pressed', String(item.dataset.logoIcon === iconClass));
        });
    }

    if (savedIcon) applyLogoIcon(savedIcon);

    // ---- Background style ----
    var bgItems = Array.from(document.querySelectorAll('.palette-item[data-bg-style]'));
    var savedBg = localStorage.getItem('portfolio-bg-style');

    function applyBgStyle(style) {
        if (!style) return;
        body.setAttribute('data-bg-style', style);
        localStorage.setItem('portfolio-bg-style', style);
        bgItems.forEach(function (item) {
            item.setAttribute('aria-pressed', String(item.dataset.bgStyle === style));
        });
    }

    if (savedBg) applyBgStyle(savedBg);

    // ---- Ambient effect toggles ----
    var toggles = {
        embers: document.getElementById('toggleEmbers'),
        grid: document.getElementById('toggleGrid'),
        noise: document.getElementById('toggleNoise'),
        spotlight: document.getElementById('toggleSpotlight')
    };

    function applyToggle(key, el) {
        var on = el.checked;
        body.setAttribute('data-' + key, String(on));
        localStorage.setItem('portfolio-' + key, String(on));
    }

    Object.keys(toggles).forEach(function (key) {
        var el = toggles[key];
        if (!el) return;
        var saved = localStorage.getItem('portfolio-' + key);
        if (saved !== null) el.checked = saved === 'true';
        body.setAttribute('data-' + key, String(el.checked));
        el.addEventListener('change', function () { applyToggle(key, el); });
    });

    // ---- Open/close + click handlers ----
    if (paletteBtn && palettePopup) {
        paletteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = palettePopup.classList.toggle('open');
            paletteBtn.setAttribute('aria-expanded', String(isOpen));
        });

        allPaletteItems.forEach(function (item) {
            item.addEventListener('click', function () {
                var color = item.getAttribute('data-theme-color');
                var icon = item.getAttribute('data-logo-icon');
                var bg = item.getAttribute('data-bg-style');

                if (color) {
                    applyColorTheme(color);
                } else if (icon) {
                    applyLogoIcon(icon);
                } else if (bg) {
                    applyBgStyle(bg);
                }

                palettePopup.classList.remove('open');
                paletteBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function (e) {
            if (palettePopup.classList.contains('open') && !palettePopup.contains(e.target) && e.target !== paletteBtn) {
                palettePopup.classList.remove('open');
                paletteBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    var spotlight = document.querySelector('.ambient-spotlight');
    if (spotlight) {
        document.addEventListener('pointermove', function (e) {
            spotlight.style.setProperty('--mx', (e.clientX / innerWidth * 100) + '%');
            spotlight.style.setProperty('--my', (e.clientY / innerHeight * 100) + '%');
        }, { passive: true });
    }

    var badgeLabel = document.getElementById('heroChipLabel');
    var chips = Array.from(document.querySelectorAll('.float-chip'));
    var skillsSection = document.getElementById('skills');
    var aiSection = document.getElementById('ai');

    function closeAllChips() {
        chips.forEach(function (c) { c.classList.remove('is-open'); });
    }

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            closeAllChips();
            chip.classList.add('is-open');

            var skill = chip.dataset.skill;
            var model = chip.dataset.model;

            if (skill) {
                if (badgeLabel) badgeLabel.textContent = 'Now — ' + skill;
                var card = Array.from(skillsSection.querySelectorAll('.skill-card')).find(function (c) {
                    var h = c.querySelector('h3');
                    return h && h.textContent.trim() === skill;
                });
                if (card) {
                    card.classList.add('skill-card--flash');
                    card.addEventListener('animationend', function () { card.classList.remove('skill-card--flash'); }, { once: true });
                    setTimeout(function () { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60);
                } else {
                    setTimeout(function () { skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
                }
                return;
            }

            if (model) {
                if (badgeLabel) badgeLabel.textContent = 'Exploring — ' + model;
                var modelCard = document.querySelector('.ai-model-card[data-model="' + model + '"]');
                document.querySelectorAll('.ai-model-card').forEach(function (c) {
                    c.classList.remove('is-open', 'is-focus');
                });
                if (modelCard) {
                    modelCard.classList.add('is-open', 'is-focus');
                    setTimeout(function () { modelCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 80);
                    var btn = modelCard.querySelector('button') || modelCard;
                    setTimeout(function () { btn.focus({ preventScroll: true }); }, 350);
                } else {
                    aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }

            setTimeout(function () { aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
        });
    });

    // Model shelf filters
    var filters = Array.from(document.querySelectorAll('.ai-filter'));
    var modelCards = Array.from(document.querySelectorAll('.ai-model-card'));
    filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filters.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');
            var cat = btn.dataset.filter;
            modelCards.forEach(function (c) {
                var show = cat === 'all' || c.dataset.cat === cat;
                c.toggleAttribute('hidden', !show);
                c.classList.remove('is-open', 'is-focus');
            });
        });
    });

    // Nav AI link
    var navAi = document.querySelector('.nav-link--ai');
    if (navAi && badgeLabel && aiSection) {
        navAi.addEventListener('click', function (e) {
            e.preventDefault();
            if (badgeLabel) badgeLabel.textContent = 'AI Creative Lab';
            closeAllChips();
            aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
})();
