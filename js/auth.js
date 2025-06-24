document.addEventListener('DOMContentLoaded', function() {
    // Esconder loading screen após carregamento
    setTimeout(function() {
      document.querySelector('.loading-screen').style.opacity = '0';
      setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
      }, 500);
    }, 1500);
  
    // Toggle menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle && mainMenu) {
      menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
      });
    }
  
    // Mostrar/ocultar senha
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
          this.setAttribute('aria-label', 'Ocultar senha');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
          this.setAttribute('aria-label', 'Mostrar senha');
        }
      });
    });
  
    // Validação do formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.elements['email'].value;
        const password = this.elements['password'].value;
        const remember = this.elements['remember'].checked;
        
        // Validação simples - em uma aplicação real, isso seria feito no servidor
        if (!email || !password) {
          showAlert('Por favor, preencha todos os campos.', 'error');
          return;
        }
        
        // Simular login bem-sucedido
        console.log('Login enviado:', { email, password, remember });
        
        // Mostrar mensagem de sucesso
        showAlert('Login realizado com sucesso! Redirecionando...', 'success');
        
        // Redirecionar para a página de perfil após 2 segundos
        setTimeout(function() {
          window.location.href = 'perfil.html';
        }, 2000);
      });
    }
  
    // Função para mostrar alertas
    function showAlert(message, type) {
      const alertBox = document.createElement('div');
      alertBox.className = `alert alert-${type}`;
      alertBox.textContent = message;
      
      // Estilo do alerta
      alertBox.style.position = 'fixed';
      alertBox.style.top = '20px';
      alertBox.style.right = '20px';
      alertBox.style.padding = '15px 25px';
      alertBox.style.borderRadius = '5px';
      alertBox.style.color = 'white';
      alertBox.style.fontWeight = '500';
      alertBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      alertBox.style.zIndex = '1000';
      alertBox.style.animation = 'fadeInUp 0.3s ease';
      
      if (type === 'error') {
        alertBox.style.backgroundColor = 'var(--danger)';
      } else if (type === 'success') {
        alertBox.style.backgroundColor = 'var(--success)';
      }
      
      document.body.appendChild(alertBox);
      
      // Remover alerta após 5 segundos
      setTimeout(function() {
        alertBox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
          alertBox.remove();
        }, 300);
      }, 5000);
    }
  
    // Adicionar animação de fadeOut
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  });

document.addEventListener('DOMContentLoaded', function() {
    // Simular carregamento (remover após implementação real)
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.innerHTML = mainMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form submission with animation
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    
    if (loginForm && loginButton) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const btnText = loginButton.querySelector('.btn-text');
            const btnLoader = loginButton.querySelector('.btn-loader');
            
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            loginButton.disabled = true;
            
            // Simulate API call (replace with actual login logic)
            setTimeout(() => {
                // Hide loading state
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
                loginButton.disabled = false;
                
                // Success animation
                loginButton.classList.add('animate__animated', 'animate__pulse');
                
                setTimeout(() => {
                    loginButton.classList.remove('animate__animated', 'animate__pulse');
                    // Redirect after successful login
                    window.location.href = 'perfil.html';
                }, 1000);
            }, 2000);
        });
    }
});