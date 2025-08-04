    const monthsData = [
            {
                name: "Janeiro",
                season: "Verão",
                file: "janeiro.html",
                gradient: "linear-gradient(135deg, #c31432, #240b36)"
            },
            {
                name: "Fevereiro",
                season: "Verão",
                file: "fevereiro.html",
                gradient: "linear-gradient(135deg, #007e7e, #045d56)"
            },
            {
                name: "Março",
                season: "Outono",
                file: "marco.html",
                gradient: "linear-gradient(135deg, #8a2387, #e94057)"
            },
            {
                name: "Abril",
                season: "Outono",
                file: "abril.html",
                gradient: "linear-gradient(135deg, #1a2980, #26d0ce)"
            },
            {
                name: "Maio",
                season: "Outono",
                file: "maio.html",
                gradient: "linear-gradient(135deg, #3a1c71, #d76d77)"
            },
            {
                name: "Junho",
                season: "Inverno",
                file: "junho.html",
                gradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            },
            {
                name: "Julho",
                season: "Inverno",
                file: "julho.html",
                gradient: "linear-gradient(135deg, #2e3c58, #544a7d)"
            },
            {
                name: "Agosto",
                season: "Inverno",
                file: "agosto.html",
                gradient: "linear-gradient(135deg, #3f2b96, #a8c0ff)"
            },
            {
                name: "Setembro",
                season: "Primavera",
                file: "setembro.html",
                gradient: "linear-gradient(135deg, #1e3c72, #2a5298)"
            },
            {
                name: "Outubro",
                season: "Primavera",
                file: "outubro.html",
                gradient: "linear-gradient(135deg, #42275a, #734b6d)"
            },
            {
                name: "Novembro",
                season: "Primavera",
                file: "novembro.html",
                gradient: "linear-gradient(135deg, #4b1248, #f0c27b)"
            },
            {
                name: "Dezembro",
                season: "Verão",
                file: "dezembro.html",
                gradient: "linear-gradient(135deg, #232526, #414345)"
            }
        ];

        // Função para gerar cards dos meses
        function generateMonthCards() {
            const monthsGrid = document.getElementById('monthsGrid');
            monthsData.forEach((month, index) => {
                const card = document.createElement('div');
                card.className = 'month-card';
                card.style.background = month.gradient;
                card.style.animationDelay = `${index * 0.1}s`;
                card.innerHTML = `
                    <h3>${month.name}</h3>
                    <p>${month.season}</p>
                `;
                card.addEventListener('click', () => {
                    window.location.href = month.file;
                });
                monthsGrid.appendChild(card);
            });
        }

        // Função para scroll suave
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Função para animação de entrada dos elementos
        function animateOnScroll() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            // Observar elementos que devem ser animados
            const animatedElements = document.querySelectorAll('.about-card, .month-card, .tip-card');
            animatedElements.forEach(el => observer.observe(el));
        }

        // Função para adicionar efeito parallax ao hero
        function initParallax() {
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                }
            });
        }

        // Função para navbar responsiva
        function initNavbar() {
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Função para adicionar efeito de hover nos cards
        function initCardEffects() {
            const cards = document.querySelectorAll('.about-card, .tip-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Função para adicionar efeito de ripple nos botões
        function initRippleEffect() {
            const buttons = document.querySelectorAll('.cta-button, .month-card');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    this.appendChild(ripple);
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Função para adicionar CSS do ripple
        function addRippleCSS() {
            const style = document.createElement('style');
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                .month-card, .cta-button {
                    position: relative;
                    overflow: hidden;
                }
                .navbar.scrolled {
                    background: rgba(255, 255, 255, 0.98);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
            `;
            document.head.appendChild(style);
        }

        // Função para inicializar contador animado
        function initCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                const updateCounter = () => {
                    const current = parseInt(counter.innerText);
                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }

        // Função para adicionar loading animation
        function showLoading() {
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Carregando...</p>
                </div>
            `;
            document.body.appendChild(loading);
            setTimeout(() => {
                loading.remove();
            }, 1500);
        }

        // Função para adicionar CSS do loading
        function addLoadingCSS() {
            const style = document.createElement('style');
            style.textContent = `
                .loading {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }
                .loading-spinner {
                    text-align: center;
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Inicialização quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', function() {
            // Mostrar loading
            addLoadingCSS();
            showLoading();
            // Inicializar funcionalidades
            setTimeout(() => {
                generateMonthCards();
                animateOnScroll();
                initParallax();
                initNavbar();
                initCardEffects();
                addRippleCSS();
                initRippleEffect();
                initCounters();
            }, 100);
        });

        // Adicionar smooth scroll para links internos
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