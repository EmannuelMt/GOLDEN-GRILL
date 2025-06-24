document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.querySelector('.main-menu');
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const promoCards = document.querySelectorAll('.promo-card');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Carrinho de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    // Inicialização
    init();

    function init() {
        setupMenuToggle();
        setupCart();
        setupFilterButtons();
        setupAddToCartButtons();
        setupNewsletter();
        updateCartCount();
    }

    // Menu mobile
    function setupMenuToggle() {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', mainMenu.classList.contains('active'));
        });
    }

    // Configuração do carrinho
    function setupCart() {
        cartButton.addEventListener('click', openCart);
        closeCart.addEventListener('click', closeCartFunc);
        cartOverlay.addEventListener('click', closeCartFunc);
    }

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

        // Adiciona eventos aos botões do carrinho
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
    }

    function increaseQuantity(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        cart[itemIndex].quantity++;
        saveCart();
        updateCartDisplay();
        updateCartCount();
    }

    function removeItem(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        cart.splice(itemIndex, 1);
        saveCart();
        updateCartDisplay();
        updateCartCount();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Configuração dos filtros - CORREÇÃO PRINCIPAL
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe active apenas no botão clicado
                this.classList.add('active');
                
                // Obtém o filtro selecionado
                const filter = this.dataset.filter;
                
                // Aplica o filtro
                filterPromotions(filter);
            });
        });
    }

    function filterPromotions(filter) {
        promoCards.forEach(card => {
            // Mostra todos se for 'all' ou se a categoria corresponder
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Esconde os que não correspondem
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Configuração dos botões "Adicionar" - CORREÇÃO PRINCIPAL
    function setupAddToCartButtons() {
        document.querySelectorAll('.btn-add').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const promoCard = this.closest('.promo-card');
                
                // Extrai os dados da promoção
                const itemId = Date.now().toString();
                const itemName = promoCard.querySelector('h3').textContent;
                const itemPriceText = promoCard.querySelector('.current-price').textContent;
                const itemPrice = parseFloat(itemPriceText.replace('R$ ', '').replace(',', '.'));
                const itemImage = promoCard.querySelector('img').src;
                
                // Verifica se o item já está no carrinho
                const existingItem = cart.find(item => item.name === itemName);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: itemId,
                        name: itemName,
                        price: itemPrice,
                        image: itemImage,
                        quantity: 1
                    });
                }
                
                // Atualiza o carrinho
                saveCart();
                updateCartCount();
                
                // Feedback visual
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
                this.style.backgroundColor = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = 'var(--primary)';
                }, 2000);
            });
        });
    }

    // Configuração da newsletter
    function setupNewsletter() {
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                if (validateEmail(email)) {
                    // Simula o envio
                    const button = this.querySelector('button');
                    const originalText = button.innerHTML;
                    
                    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        showToast('Obrigado por se inscrever!', 'success');
                        this.reset();
                    }, 1500);
                } else {
                    showToast('Por favor, insira um e-mail válido', 'error');
                }
            });
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

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

    // Adiciona estilos dinâmicos
    const style = document.createElement('style');
    style.textContent = `
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
        
        .toast-error {
            background-color: var(--danger);
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .promo-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});