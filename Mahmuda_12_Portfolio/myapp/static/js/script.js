document.addEventListener("DOMContentLoaded", () => {
    // --- SCROLL PROGRESS INDICATOR ---
    const scrollProgress = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if(scrollProgress) scrollProgress.style.width = scrolled + "%";
    });

    // --- NAVIGATION LOGIC ---
    const hamburger = document.getElementById("hamburger"), navLinks = document.querySelector(".nav-links");
    if(hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.innerHTML = navLinks.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // --- THEME & STICKY NAVBAR ---
    const themeToggle = document.getElementById("theme-toggle"), body = document.body, navbar = document.getElementById("navbar");
    if(themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            themeToggle.innerHTML = body.classList.contains("dark-mode") ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }
    window.addEventListener("scroll", () => navbar?.classList.toggle("sticky", window.scrollY > 50));

    // --- PER-SECTION CUSTOM ANIMATIONS ---
    const sectionAnimations = {
        'hero': (el) => {
            el.style.transform = 'translateX(-50px)';
            el.style.opacity = '1';
            el.animate([
                { opacity: 0, transform: 'translateX(-50px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });
        },
        'about': (el) => {
            el.animate([
                { opacity: 0, transform: 'scale(0.9) translateY(30px)' },
                { opacity: 1, transform: 'scale(1) translateY(0)' }
            ], { duration: 1000, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' });
        },
        'skills': (el) => {
            el.animate([
                { opacity: 0, transform: 'translateX(50px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });
        },
        'projects': (el) => {
            const cards = el.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                card.animate([
                    { opacity: 0, transform: 'perspective(1000px) rotateX(-30deg) translateY(50px)' },
                    { opacity: 1, transform: 'perspective(1000px) rotateX(0deg) translateY(0)' }
                ], { duration: 800, delay: index * 200, easing: 'ease-out', fill: 'forwards' });
            });
            el.style.opacity = '1';
        },
        'timeline': (el) => {
            const items = el.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                item.animate([
                    { opacity: 0, transform: 'translateY(100px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 800, delay: index * 300, easing: 'ease-out', fill: 'forwards' });
            });
            el.style.opacity = '1';
        },
        'contact': (el) => {
            el.animate([
                { opacity: 0, filter: 'blur(10px)', transform: 'scale(1.1)' },
                { opacity: 1, filter: 'blur(0)', transform: 'scale(1)' }
            ], { duration: 1200, easing: 'ease-in-out', fill: 'forwards' });
        }
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const sectionId = entry.target.id;
                if(sectionAnimations[sectionId]) {
                    sectionAnimations[sectionId](entry.target);
                    revealObserver.unobserve(entry.target);
                }
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll("section").forEach(section => {
        section.style.opacity = "0"; // Initial state for all sections
        revealObserver.observe(section);
    });

    // --- SPECIAL SKILLS PROGRESS BARS ---
    const skillsSection = document.getElementById("skills");
    if(skillsSection) {
        new IntersectionObserver((entries, observer) => {
            if(entries[0].isIntersecting) {
                document.querySelectorAll(".progress").forEach(bar => {
                    const w = bar.style.width; bar.style.width = '0%';
                    setTimeout(() => { bar.style.width = w; bar.style.transition = 'width 2s ease'; }, 500);
                });
                observer.disconnect();
            }
        }, { threshold: 0.5 }).observe(skillsSection);
    }

    // --- TILT, CURSOR & TYPING ---
    if (typeof VanillaTilt !== 'undefined') VanillaTilt.init(document.querySelectorAll(".project-card, .stat-box"), { max: 10, speed: 400 });
    const cursorDot = document.querySelector(".cursor-dot"), cursorOutline = document.querySelector(".cursor-outline");
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 300, fill: "forwards" });
    });

    const typedTextSpan = document.querySelector(".typed-text"), textArray = ["Software Developer", "Creative Designer", "Tech Innovator"];
    let textArrayIndex = 0, charIndex = 0;
    const type = () => {
        if(!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) { 
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++); setTimeout(type, 100); 
        } else setTimeout(erase, 2000);
    };
    const erase = () => {
        if (charIndex > 0) { 
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, --charIndex); setTimeout(erase, 50); 
        } else { textArrayIndex = (textArrayIndex + 1) % textArray.length; setTimeout(type, 500); }
    };
    if (typedTextSpan) setTimeout(type, 1000);

    // --- PARTICLES ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let pts = [];
        const init = () => {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            pts = Array(60).fill().map(() => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*2, dx: Math.random()-0.5, dy: Math.random()-0.5 }));
        };
        const draw = () => {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            pts.forEach(p => {
                p.x = (p.x+p.dx+canvas.width)%canvas.width; p.y = (p.y+p.dy+canvas.height)%canvas.height;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
                ctx.fillStyle = body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.1)'; ctx.fill();
            });
            requestAnimationFrame(draw);
        };
        window.addEventListener('resize', init); init(); draw();
    }
});
