// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768) {
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
        this.color = Math.random() > 0.5 ? '124, 58, 237' : '99, 102, 241';
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
const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
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
                ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
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

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Typing Effect =====
const typedText = document.getElementById('typedText');
const roles = [
    'Graphic Designer',
    'VFX Artist',
    'Motion Graphics Designer',
    'Brand Designer',
    'Web Designer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
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
            const duration = 2000;
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
    '.section-header, .about-image, .about-content, .skill-card, .timeline-item, .portfolio-item, .education-card, .extras-card, .contact-info, .contact-form'
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
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    const formData = new FormData(contactForm);
    formData.delete('subject_display');

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Failed');
        }
    } catch {
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
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
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
        document.body.style.overflow = 'hidden';
    });
});

function closeVideoModal() {
    videoModal.classList.remove('active');
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

const projectDetails = {
    '3d-cgi': {
        videoId: 'zpDXjtl4hls',
        category: '3D & VFX',
        title: '3D CGI Production — Complete Case Study',
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
    }
};

function openProjectDetail(projectKey) {
    const project = projectDetails[projectKey];
    if (!project) return;

    let sectionsHTML = '';
    project.sections.forEach(section => {
        sectionsHTML += `
            <div class="project-detail-section">
                <h3><i class="${section.icon}"></i> ${section.heading}</h3>
                ${section.content}
            </div>
        `;
    });

    projectDetailContent.innerHTML = `
        <div class="project-detail-video">
            <iframe src="https://www.youtube.com/embed/${project.videoId}?autoplay=0&rel=0" title="Project Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <span class="project-detail-category">${project.category}</span>
        <h2>${project.title}</h2>
        <p class="project-detail-subtitle">${project.subtitle}</p>
        ${sectionsHTML}
    `;

    projectModalContent.scrollTop = 0;
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
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

// Open project detail when clicking portfolio item
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        if (category === '3d') {
            openProjectDetail('3d-cgi');
        }
    });
});
