// Cinematic Loading Experience
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingContent = document.querySelector('.loading-content');
    
    // Create meat particles
    function createMeatParticles() {
      const meats = ['meat1', 'meat2', 'meat3']; // Suas imagens de carne
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'meat-particle';
          particle.style.backgroundImage = `url(assets/${meats[Math.floor(Math.random() * meats.length)]}.png)`;
          
          // Random properties
          const size = Math.random() * 30 + 20;
          const left = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = Math.random() * 3 + 3;
          
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${left}%`;
          particle.style.bottom = '-50px';
          particle.style.animationDuration = `${duration}s`;
          particle.style.animationDelay = `${delay}s`;
          
          loadingScreen.appendChild(particle);
          
          // Remove after animation
          setTimeout(() => {
            particle.remove();
          }, (duration + delay) * 1000);
        }, i * 800);
      }
    }
    
    // Create smoke effects
    function createSmoke() {
      for (let i = 0; i < 3; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        
        // Random properties
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        smoke.style.top = `${top}%`;
        smoke.style.left = `${left}%`;
        smoke.style.animationDuration = `${duration}s`;
        smoke.style.animationDelay = `${delay}s`;
        
        loadingScreen.appendChild(smoke);
      }
    }
    
    // Start animations
    createMeatParticles();
    createSmoke();
    setInterval(createMeatParticles, 5000);
    
    // Simulated loading stages
    const loadingMessages = [
      { text: "Acendendo a churrasqueira...", delay: 500 },
      { text: "Selecionando os melhores cortes...", delay: 1500 },
      { text: "Temperando com segredos especiais...", delay: 3000 },
      { text: "Preparando seu banquete...", delay: 4500 }
    ];
    
    const loadingText = document.querySelector('.loading-text');
    
    loadingMessages.forEach((message, index) => {
      setTimeout(() => {
        loadingText.textContent = message.text;
        
        // Add "..." animation
        loadingText.dataset.original = message.text;
        loadingText.innerHTML = message.text + '<span class="dots"></span>';
      }, message.delay);
    });
    
    // Hide loading screen
    function hideLoadingScreen() {
      // Final animation before hiding
      loadingContent.style.animation = 'fadeOutUp 1.5s ease forwards';
      
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 1500);
      }, 1000);
    }
    
    // Hide when loaded or after 7 seconds max
    window.addEventListener('load', hideLoadingScreen);
    setTimeout(hideLoadingScreen, 7000);
  });

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.main-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Troca de slide a cada 5 segundos
        setInterval(nextSlide, 5000);
    } else if (slides.length === 1) {
        slides[0].classList.add('active');
    }
}

// Filtro do Cardápio
function initMenuFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filtra os itens do menu
            menuItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(',');
                
                if (category === 'destaques' || itemCategories.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Adicionar ao Carrinho
function initAddToCart() {
    const addButtons = document.querySelectorAll('.btn-add');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.menu-item');
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = item.querySelector('.item-price').textContent;
            
            // Aqui você pode adicionar a lógica para adicionar ao carrinho
            // Por enquanto, vamos apenas mostrar um alerta
            alert(`${itemName} adicionado ao carrinho!\nPreço: ${itemPrice}`);
            
            // Adiciona efeito visual
            this.textContent = 'Adicionado!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = 'Adicionar';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
}

// Accordion FAQ
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
            
            // Fecha os outros itens
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });
        });
    });
}

// Formulário de Contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const name = document.getElementById('name').value;
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
            
            // Limpa o formulário
            this.reset();
        });
    }
}

// Formulário de Newsletter
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            alert(`Obrigado por assinar nossa newsletter!\nE-mail cadastrado: ${email}`);
            
            // Limpa o formulário
            this.reset();
        });
    }
}

// Smooth Scrolling para links internos
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para a navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Ativar item do menu conforme scroll
function initActiveMenuOnScroll() {
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.main-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events para mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Inicialização de todas as funções
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initMenuFilter();
    initAddToCart();
    initFAQAccordion();
    initContactForm();
    initNewsletterForm();
    initSmoothScrolling();
    initActiveMenuOnScroll();
    initTestimonialsSlider();
    
    // Animação ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-section, .menu-section, .promo-section, .delivery-section, .testimonials-section, .faq-section, .contact-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Adiciona estilos iniciais para a animação
    const sections = document.querySelectorAll('.about-section, .menu-section, .promo-section, .delivery-section, .testimonials-section, .faq-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar
});