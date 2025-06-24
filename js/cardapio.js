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
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.querySelector('.main-menu');
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortBy = document.getElementById('sortBy');
    const resetFilters = document.querySelector('.reset-filters');
    
    // Carrinho de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    // Toggle do menu mobile
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', mainMenu.classList.contains('active'));
    });
    
    // Abrir/fechar carrinho
    cartButton.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartFunc);
    cartOverlay.addEventListener('click', closeCartFunc);
    
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    }
    
    function closeCartFunc() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Atualizar contador do carrinho
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.setAttribute('aria-label', `${totalItems} itens no carrinho`);
    }
    
    // Atualizar exibição do carrinho
    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Sua sacola está vazia</p>
                </div>
            `;
            document.querySelector('.total-price').textContent = 'R$ 0,00';
            return;
        }
        
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" aria-label="Reduzir quantidade">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" aria-label="Aumentar quantidade">+</button>
                        </div>
                    </div>
                    <button class="remove-item" aria-label="Remover item">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        document.querySelector('.total-price').textContent = `R$ ${total.toFixed(2)}`;
        
        // Adicionar event listeners para os botões de quantidade
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    // Funções do carrinho
    function decreaseQuantity(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        saveCart();
        updateCartDisplay();
        updateCartCount();
        
        // Feedback tátil
        e.target.classList.add('clicked');
        setTimeout(() => e.target.classList.remove('clicked'), 200);
    }
    
    function increaseQuantity(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        cart[itemIndex].quantity++;
        saveCart();
        updateCartDisplay();
        updateCartCount();
        
        // Feedback tátil
        e.target.classList.add('clicked');
        setTimeout(() => e.target.classList.remove('clicked'), 200);
    }
    
    function removeItem(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        cart.splice(itemIndex, 1);
        saveCart();
        updateCartDisplay();
        updateCartCount();
        
        // Feedback visual
        const cartItem = e.target.closest('.cart-item');
        cartItem.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => cartItem.remove(), 300);
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Adicionar item ao carrinho
    function setupAddToCartButtons() {
        document.querySelectorAll('.btn-add').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const menuItem = e.target.closest('.menu-item, .acompanhamento-item, .bebida-item, .jantinha-item');
                const itemId = Date.now().toString() + Math.floor(Math.random() * 1000);
                const itemName = menuItem.querySelector('h3').textContent;
                const itemPrice = parseFloat(menuItem.dataset.price);
                const itemImage = menuItem.querySelector('img').src;
                const itemBadge = menuItem.querySelector('.item-badge')?.textContent || '';
                
                // Verificar se o item já está no carrinho
                const existingItem = cart.find(item => item.name === itemName && item.price === itemPrice);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: itemId,
                        name: itemName,
                        price: itemPrice,
                        image: itemImage,
                        quantity: 1,
                        badge: itemBadge
                    });
                }
                
                saveCart();
                updateCartCount();
                
                // Feedback visual
                const originalText = btn.textContent;
                btn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
                btn.style.backgroundColor = 'var(--success)';
                
                // Efeito de confete para itens em destaque
                if (itemBadge.includes('Mais pedido') || itemBadge.includes('Novidade')) {
                    createConfetti(e.target);
                }
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = 'var(--secondary-color)';
                }, 2000);
            });
        });
    }
    
    // Efeito de confete
    function createConfetti(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 3 + Math.random() * 3;
            const rotationSpeed = (Math.random() - 0.5) * 20;
            
            let posX = x;
            let posY = y;
            let rotation = 0;
            
            const animate = () => {
                posX += Math.cos(angle) * velocity;
                posY += Math.sin(angle) * velocity + 0.5; // Gravidade
                rotation += rotationSpeed;
                
                confetti.style.left = `${posX}px`;
                confetti.style.top = `${posY}px`;
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.opacity = 1 - (posY - y) / 200;
                
                if (posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
    
    // Filtros e busca
    searchInput.addEventListener('input', filterItems);
    categoryFilter.addEventListener('change', filterItems);
    priceFilter.addEventListener('change', filterItems);
    sortBy.addEventListener('change', filterItems);
    resetFilters.addEventListener('click', resetAllFilters);
    
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const sortOption = sortBy.value;
        
        document.querySelectorAll('.menu-category').forEach(categorySection => {
            let hasVisibleItems = false;
            const items = Array.from(categorySection.querySelectorAll('.menu-item, .acompanhamento-item, .bebida-item, .jantinha-item'));
            
            items.forEach(item => {
                const itemName = item.querySelector('h3').textContent.toLowerCase();
                const itemCategory = item.closest('.menu-category').id;
                const itemPrice = parseFloat(item.dataset.price);
                
                // Verificar filtros
                const matchesSearch = itemName.includes(searchTerm);
                const matchesCategory = category === 'all' || itemCategory === category;
                const matchesPrice = priceRange === 'all' || 
                                    (priceRange === '0-30' && itemPrice <= 30) ||
                                    (priceRange === '30-60' && itemPrice > 30 && itemPrice <= 60) ||
                                    (priceRange === '60-100' && itemPrice > 60 && itemPrice <= 100) ||
                                    (priceRange === '100+' && itemPrice > 100);
                
                if (matchesSearch && matchesCategory && matchesPrice) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Ordenação
            if (sortOption !== 'popular') {
                const container = items[0].parentNode;
                const visibleItems = items.filter(item => item.style.display !== 'none');
                
                visibleItems.sort((a, b) => {
                    const priceA = parseFloat(a.dataset.price);
                    const priceB = parseFloat(b.dataset.price);
                    const nameA = a.querySelector('h3').textContent.toLowerCase();
                    const nameB = b.querySelector('h3').textContent.toLowerCase();
                    
                    switch (sortOption) {
                        case 'price-asc':
                            return priceA - priceB;
                        case 'price-desc':
                            return priceB - priceA;
                        case 'name':
                            return nameA.localeCompare(nameB);
                        default:
                            return 0;
                    }
                });
                
                // Reinserir itens ordenados
                visibleItems.forEach(item => container.appendChild(item));
            }
            
            // Mostrar/ocultar seção inteira se não houver itens visíveis
            categorySection.style.display = hasVisibleItems ? 'block' : 'none';
        });
    }
    
    function resetAllFilters() {
        searchInput.value = '';
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        sortBy.value = 'popular';
        filterItems();
        
        // Feedback visual
        resetFilters.classList.add('clicked');
        setTimeout(() => resetFilters.classList.remove('clicked'), 300);
    }
    
    // Finalizar pedido
    document.querySelector('.btn-checkout').addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Seu carrinho está vazio!', 'warning');
            return;
        }
        
        // Criar mensagem para WhatsApp
        let message = 'Olá, gostaria de fazer um pedido:\n\n';
        
        cart.forEach(item => {
            message += `${item.name} - ${item.quantity}x - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: R$ ${total.toFixed(2)}`;
        
        // Codificar para URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/551112345678?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Limpar carrinho
        cart = [];
        saveCart();
        updateCartCount();
        updateCartDisplay();
        closeCartFunc();
        
        showToast('Pedido enviado com sucesso!', 'success');
    });
    
    // Mostrar notificação toast
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Inicialização
    function init() {
        updateCartCount();
        setupAddToCartButtons();
        filterItems();
        
        // Adicionar estilos dinâmicos
        const style = document.createElement('style');
        style.textContent = `
            .confetti {
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
            }
            
            .toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background-color: #333;
                color: white;
                padding: 12px 24px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                transition: transform 0.3s ease, opacity 0.3s ease;
                opacity: 0;
            }
            
            .toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .toast-success {
                background-color: var(--success);
            }
            
            .toast-warning {
                background-color: var(--warning);
                color: #000;
            }
            
            .clicked {
                transform: scale(0.95);
            }
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    init();
});