document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // DOOR ANIMATION
    // ==========================================
    setTimeout(() => {
        const doors = document.querySelector('.shoji-door-container');
        const loadingContainer = document.querySelector('.loading-container');

        if (doors) {
            doors.classList.add('open');
        }

        if (loadingContainer) {
            loadingContainer.style.opacity = '0';
            setTimeout(() => { 
                loadingContainer.style.display = 'none'; 
            }, 800);
        }
        
        // Start petals after doors open
        setTimeout(createPetals, 1500);
    }, 4000); // change to 4000 for testing

    // ==========================================
    // PETAL ANIMATION
    // ==========================================
    function createPetals() {
        const container = document.getElementById('petalsContainer');
        if (!container) return;
        
        const petalCount = 12;
        
        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal';
                
                const startLeft = Math.random() * 100;
                const duration = 8 + Math.random() * 8;
                const delay = Math.random() * 5;
                const scale = 0.5 + Math.random() * 0.5;
                
                petal.style.left = `${startLeft}%`;
                petal.style.animationDuration = `${duration}s`;
                petal.style.animationDelay = `${delay}s`;
                petal.style.transform = `scale(${scale})`;
                
                const hue = 340 + Math.random() * 20;
                petal.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 88%) 0%, hsl(${hue}, 80%, 92%) 100%)`;
                
                container.appendChild(petal);
                
                setTimeout(() => {
                    petal.remove();
                    createSinglePetal();
                }, (duration + delay) * 1000);
                
            }, i * 300);
        }
    }
    
    function createSinglePetal() {
        const container = document.getElementById('petalsContainer');
        if (!container) return;
        
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const startLeft = Math.random() * 100;
        const duration = 8 + Math.random() * 8;
        const scale = 0.5 + Math.random() * 0.5;
        
        petal.style.left = `${startLeft}%`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.transform = `scale(${scale})`;
        
        const hue = 340 + Math.random() * 20;
        petal.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 88%) 0%, hsl(${hue}, 80%, 92%) 100%)`;
        
        container.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
            createSinglePetal();
        }, duration * 1000);
    }

    // ==========================================
    // PARALLAX SCROLLING
    // ==========================================
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const heroContent = document.querySelector('.hero-content');
    const nav = document.querySelector('.main-nav');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax layers
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        // Hero fade
        if (heroContent && scrolled < windowHeight) {
            const opacity = 1 - (scrolled / (windowHeight * 0.5));
            heroContent.style.opacity = Math.max(0, opacity);
        }
        
        // Nav background
        if (nav) {
            if (scrolled > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ==========================================
    // MIXITUP FILTERING
    // ==========================================
    let mixer;
    const projectsGrid = document.getElementById('projects-grid');

    // Initialize MixItUp filtering
    const containerEl = document.querySelector('.portfolio__grid');
    if (containerEl) {
        mixitup(containerEl, {
            selectors: {
                target: '.portfolio__card' // Matches your card class
            },
            animation: {
                duration: 300
            }
        });
    }
    
    if (projectsGrid && typeof mixitup !== 'undefined') {
        mixer = mixitup(projectsGrid, {
            selectors: {
                target: '.mix'
            },
            animation: {
                duration: 400,
                effects: 'fade translateY(-20px)',
                easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
            },
            load: {
                filter: 'all'
            }
        });

        // Filter button click handlers
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
                
                // Filter
                const filterValue = btn.getAttribute('data-filter');
                mixer.filter(filterValue);
            });
        });
    }

    // ==========================================
    // MODAL FUNCTIONALITY
    // ==========================================
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalVideo = document.getElementById('modal-video');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    const thumbContainer = document.getElementById('modal-thumbnails');

    if (modal && modalTitle && modalDesc && modalVideo && modalImage) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-description');
                const type = card.getAttribute('data-type');
                const singleSrc = card.getAttribute('data-src');
                const githubLink = card.getAttribute('data-link'); // Get the link attribute
                
                // Look for comma-separated images
                const imagesString = card.getAttribute('data-images');
                const images = imagesString ? imagesString.split(',').map(s => s.trim()) : [];

                modalTitle.textContent = title || '';
                
                // 1. SET DESCRIPTION + ADD BUTTON IF LINK EXISTS
                modalDesc.innerHTML = desc || ''; 
                if (githubLink) {
                    modalDesc.innerHTML += `
                        <div class="modal-action-area">
                            <a href="${githubLink}" target="_blank" class="modal-btn">
                                <i class="ri-github-line"></i> View Source Code
                            </a>
                        </div>`;
                }

                // Reset Modal State
                modalVideo.style.display = 'none';
                modalImage.style.display = 'none';
                modalVideo.pause();
                modalVideo.src = "";
                if (thumbContainer) thumbContainer.innerHTML = ''; 

                if (type === 'video') {
                    modalVideo.src = singleSrc;
                    modalVideo.style.display = 'block';
                } else if (type === 'image') {
                    modalImage.style.display = 'block';
                    if (images.length > 0) {
                        modalImage.src = images[0];
                        images.forEach((imgUrl, index) => {
                            const thumb = document.createElement('img');
                            thumb.src = imgUrl;
                            thumb.classList.add('thumb-item');
                            if (index === 0) thumb.classList.add('active');
                            thumb.addEventListener('click', (e) => {
                                e.stopPropagation(); 
                                modalImage.src = imgUrl;
                                document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
                                thumb.classList.add('active');
                            });
                            thumbContainer.appendChild(thumb);
                        });
                    } else {
                        modalImage.src = singleSrc;
                    }
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = "";
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }

    // ==========================================
    // CONTACT FORM (Formspree Version)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const btn = contactForm.querySelector('button');
            
            // 1. Give the user visual feedback that the "send" is happening
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // 2. We DO NOT use e.preventDefault(). 
            // We want the browser to naturally send the data to the 
            // Formspree URL you put in your HTML 'action'.
        });
    }

});