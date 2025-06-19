 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background change on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Intersection Observer untuk animasi timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Animasi untuk revolution cards
        const cards = document.querySelectorAll('.revolution-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Animasi counter untuk impact numbers
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target === Infinity) {
                    element.textContent = '∞';
                } else {
                    element.textContent = Math.floor(current) + 'x';
                }
            }, 20);
        }

        // Trigger counter animation when in view
        const impactNumbers = document.querySelectorAll('.impact-number');
        const impactObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target;
                    const text = number.textContent;
                    
                    if (text === '∞') {
                        return;
                    }
                    
                    const value = parseInt(text.replace('x', ''));
                    number.textContent = '0x';
                    animateCounter(number, value);
                    impactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        impactNumbers.forEach(number => {
            impactObserver.observe(number);
        });

        // Parallax effect untuk hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Mobile menu toggle (jika diperlukan)
        const createMobileMenu = () => {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            
            if (window.innerWidth <= 768) {
                if (!document.querySelector('.mobile-menu-btn')) {
                    const menuBtn = document.createElement('button');
                    menuBtn.className = 'mobile-menu-btn';
                    menuBtn.innerHTML = '☰';
                    menuBtn.style.cssText = `
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        display: block;
                    `;
                    
                    menuBtn.addEventListener('click', () => {
                        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.position = 'absolute';
                        navLinks.style.top = '100%';
                        navLinks.style.left = '0';
                        navLinks.style.width = '100%';
                        navLinks.style.background = 'rgba(0, 0, 0, 0.95)';
                        navLinks.style.padding = '1rem';
                    });
                    
                    nav.appendChild(menuBtn);
                }
            }
        };

        // Initialize mobile menu
        createMobileMenu();
        window.addEventListener('resize', createMobileMenu);