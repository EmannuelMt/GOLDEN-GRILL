// main.js - JavaScript profissional para o Golden Grill

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress-bar');
    
    // Simular carregamento (substituir por carregamento real em produção)
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Esconder preloader quando tudo estiver carregado
            setTimeout(() => {
                preloader.classList.add('fade-out');
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
    
    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorFollower.style.left = `${e.clientX}px`;
                cursorFollower.style.top = `${e.clientY}px`;
            }, 100);
        });
        
        // Efeito de hover em links e botões
        const hoverElements = document.querySelectorAll('a, button, .btn, input[type="submit"], .destaque-card, .promocao-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    }
    
    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Atualizar atributo ARIA
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll para links internos
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                
                const target = document.querySelector(this.hash);
                if (target) {
                    // Fechar menu mobile se estiver aberto
                    if (mainMenu && mainMenu.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        mainMenu.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                    
                    // Scroll suave para o alvo
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem recarregar a página
                    if (history.pushState) {
                        history.pushState(null, null, this.hash);
                    } else {
                        window.location.hash = this.hash;
                    }
                }
            }
        });
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contador regressivo para promoções
    const countdownElements = document.querySelectorAll('.countdown');
    
    if (countdownElements.length > 0) {
        function updateCountdowns() {
            const now = new Date();
            
            countdownElements.forEach(element => {
                const endTime = new Date(element.getAttribute('data-time'));
                const diff = endTime - now;
                
                if (diff <= 0) {
                    element.textContent = 'Oferta encerrada';
                    return;
                }
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                
                element.textContent = `Termina em: ${days}d ${hours}h ${minutes}m`;
            });
        }
        
        updateCountdowns();
        setInterval(updateCountdowns, 60000); // Atualizar a cada minuto
    }
    
    // Formulário de delivery
    const deliveryForm = document.getElementById('deliveryForm');
    const deliverySubmit = document.getElementById('deliverySubmit');
    
    if (deliveryForm && deliverySubmit) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar estado de carregamento
            const btnText = deliverySubmit.querySelector('.btn-text');
            const btnLoader = deliverySubmit.querySelector('.btn-loader');
            
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            deliverySubmit.disabled = true;
            
            // Simular envio do formulário (substituir por AJAX em produção)
            setTimeout(() => {
                // Esconder estado de carregamento
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
                deliverySubmit.disabled = false;
                
                // Mostrar feedback visual
                deliverySubmit.classList.add('animate__animated', 'animate__pulse');
                
                setTimeout(() => {
                    deliverySubmit.classList.remove('animate__animated', 'animate__pulse');
                    
                    // Redirecionar para o cardápio (simulação)
                    window.location.href = 'cardapio.html';
                }, 1000);
            }, 2000);
        });
    }
    
    // Verificação de CEP
    const checkCepBtn = document.getElementById('checkCep');
    
    if (checkCepBtn) {
        checkCepBtn.addEventListener('click', function() {
            const cepInput = document.getElementById('delivery-cep');
            const cep = cepInput.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                alert('CEP inválido. Digite um CEP com 8 dígitos.');
                return;
            }
            
            // Simular consulta de CEP (substituir por API real em produção)
            this.disabled = true;
            this.textContent = 'Buscando...';
            
            setTimeout(() => {
                // Simular resposta da API
                document.getElementById('delivery-address').value = 'Rua Exemplo, 123';
                document.getElementById('delivery-neighborhood').value = 'Centro';
                document.getElementById('delivery-city').value = 'São Paulo';
                
                this.disabled = false;
                this.textContent = 'Verificar';
            }, 1500);
        });
    }
    
    // Inicializar animações quando tudo estiver carregado
    window.addEventListener('load', function() {
        // Ativar animações de scroll (AOS)
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});