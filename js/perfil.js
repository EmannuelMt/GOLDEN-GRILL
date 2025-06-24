document.addEventListener('DOMContentLoaded', function() {
  // ===== LOADING SCREEN =====
  setTimeout(function() {
    document.querySelector('.loading-screen').style.opacity = '0';
    setTimeout(function() {
      document.querySelector('.loading-screen').style.display = 'none';
    }, 500);
  }, 1500);

  // ===== MENU TOGGLE PARA MOBILE =====
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function() {
      mainMenu.classList.toggle('active');
      this.classList.toggle('open');
    });
  }

  // ===== NAVEGAÇÃO DO PERFIL =====
  const profileLinks = document.querySelectorAll('.profile-menu a');
  const profileSections = document.querySelectorAll('.profile-section');

  profileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove a classe active de todos os links e seções
      profileLinks.forEach(item => item.classList.remove('active'));
      profileSections.forEach(section => section.classList.remove('active'));
      
      // Adiciona a classe active ao link clicado
      this.classList.add('active');
      
      // Mostra a seção correspondente
      const target = this.getAttribute('href');
      document.querySelector(target).classList.add('active');
    });
  });

  // ===== UPLOAD DE AVATAR =====
  const avatarUpload = document.getElementById('avatar-upload');
  const userAvatar = document.getElementById('user-avatar');

  if (avatarUpload && userAvatar) {
    avatarUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Verifica se o arquivo é uma imagem
        if (!file.type.match('image.*')) {
          alert('Por favor, selecione uma imagem válida.');
          return;
        }

        // Limita o tamanho do arquivo para 2MB
        if (file.size > 2 * 1024 * 1024) {
          alert('A imagem deve ter no máximo 2MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
          userAvatar.src = event.target.result;
          // Aqui você poderia adicionar uma chamada AJAX para salvar no servidor
          // saveAvatarToServer(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ===== MODAL DE ENDEREÇO =====
  const addressModal = document.getElementById('address-modal');
  const addAddressBtn = document.getElementById('add-address-btn');
  const closeModalBtn = document.querySelector('.close-modal');
  const closeModalBtn2 = document.querySelector('.close-modal-btn');

  // Função para abrir o modal
  function openAddressModal() {
    addressModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Função para fechar o modal
  function closeAddressModal() {
    addressModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Event listeners
  if (addAddressBtn) addAddressBtn.addEventListener('click', openAddressModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeAddressModal);
  if (closeModalBtn2) closeModalBtn2.addEventListener('click', closeAddressModal);

  // Fechar modal ao clicar fora
  window.addEventListener('click', function(event) {
    if (event.target === addressModal) {
      closeAddressModal();
    }
  });

  // ===== FORMULÁRIO DE ENDEREÇO =====
  const addressForm = document.querySelector('.address-form');
  if (addressForm) {
    addressForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validação básica
      const cep = document.getElementById('cep').value;
      const street = document.getElementById('street').value;
      const number = document.getElementById('number').value;
      
      if (!cep || !street || !number) {
        alert('Por favor, preencha os campos obrigatórios (CEP, Rua e Número)');
        return;
      }
      
      // Simulação de salvamento
      alert('Endereço salvo com sucesso!');
      closeAddressModal();
      this.reset();
      
      // Aqui você adicionaria a lógica para salvar no servidor
      // saveAddressToServer();
    });
  }

  // ===== MÁSCARA PARA CEP E TELEFONE =====
  function applyMasks() {
    // Máscara para CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
      cepInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        this.value = value;
      });
    }

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 2) {
          value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 10) {
          value = value.substring(0, 10) + '-' + value.substring(10, 15);
        }
        this.value = value;
      });
    }
  }
  applyMasks();

  // ===== FILTRO DE PEDIDOS =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const orderCards = document.querySelectorAll('.order-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove a classe active de todos os botões
      filterBtns.forEach(item => item.classList.remove('active'));
      
      // Adiciona a classe active ao botão clicado
      this.classList.add('active');
      
      const filter = this.textContent.trim();
      
      // Filtra os pedidos
      orderCards.forEach(card => {
        const status = card.querySelector('.order-status').textContent.trim();
        
        if (filter === 'Todos') {
          card.style.display = 'block';
        } else if (filter === 'Entregues' && status === 'Entregue') {
          card.style.display = 'block';
        } else if (filter === 'Em andamento' && status === 'Preparando') {
          card.style.display = 'block';
        } else if (filter === 'Cancelados' && status === 'Cancelado') {
          card.style.display = 'block';
        } else if (filter !== 'Todos') {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== PAGINAÇÃO =====
  const pageBtns = document.querySelectorAll('.page-btn');
  if (pageBtns.length > 0) {
    pageBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.classList.contains('disabled')) return;
        
        // Remove a classe active de todos os botões
        pageBtns.forEach(item => item.classList.remove('active'));
        
        // Adiciona a classe active ao botão clicado
        this.classList.add('active');
        
        // Simulação de troca de página
        // Na implementação real, você faria uma requisição AJAX para carregar os itens da página selecionada
        console.log('Carregando página:', this.textContent);
      });
    });
  }

  // ===== FORMULÁRIO DE DADOS PESSOAIS =====
  const profileForm = document.querySelector('.profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validação básica
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      if (!name || !email) {
        alert('Por favor, preencha pelo menos o nome e e-mail');
        return;
      }
      
      // Simulação de salvamento
      alert('Dados atualizados com sucesso!');
      
      // Aqui você adicionaria a lógica para salvar no servidor
      // saveProfileToServer();
    });
  }

  // ===== ALTERAÇÃO DE SENHA =====
  const changePasswordBtn = document.querySelector('.btn-secondary');
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', function() {
      const newPassword = prompt('Digite sua nova senha:');
      if (newPassword) {
        if (newPassword.length < 6) {
          alert('A senha deve ter pelo menos 6 caracteres');
          return;
        }
        
        const confirmPassword = prompt('Confirme sua nova senha:');
        if (newPassword !== confirmPassword) {
          alert('As senhas não coincidem!');
          return;
        }
        
        alert('Senha alterada com sucesso!');
        // Aqui você adicionaria a lógica para salvar no servidor
        // changePasswordOnServer(newPassword);
      }
    });
  }

  // ===== AUTENTICAÇÃO DE DOIS FATORES =====
  const twoFactorToggle = document.querySelector('.switch input');
  if (twoFactorToggle) {
    twoFactorToggle.addEventListener('change', function() {
      const status = this.checked ? 'ativada' : 'desativada';
      alert(`Autenticação de dois fatores ${status}!`);
      
      // Aqui você adicionaria a lógica para salvar no servidor
      // updateTwoFactorStatus(this.checked);
    });
  }

  // ===== SIMULAÇÃO DE DADOS DO USUÁRIO =====
  function loadUserData() {
    // Simulação de dados do usuário
    const userData = {
      name: 'Carlos Silva',
      email: 'carlos@example.com',
      phone: '(11) 98765-4321',
      birthdate: '1985-06-15',
      cpf: '123.456.789-00',
      joinDate: '15/03/2022',
      orders: 24,
      points: 1280,
      level: 'Ouro'
    };

    // Preenche os dados na página
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('join-date').textContent = userData.joinDate;
    document.querySelector('.stat-number:nth-child(1)').textContent = userData.orders;
    document.querySelector('.stat-number:nth-child(2)').textContent = userData.points;
    document.querySelector('.stat-number:nth-child(3)').textContent = userData.level;

    // Preenche o formulário de perfil
    if (document.getElementById('name')) document.getElementById('name').value = userData.name;
    if (document.getElementById('email')) document.getElementById('email').value = userData.email;
    if (document.getElementById('phone')) document.getElementById('phone').value = userData.phone;
    if (document.getElementById('birthdate')) document.getElementById('birthdate').value = userData.birthdate;
    if (document.getElementById('cpf')) document.getElementById('cpf').value = userData.cpf;
  }
  loadUserData();

  // ===== SIMULAÇÃO DE HISTÓRICO DE PEDIDOS =====
  function loadOrderHistory() {
    // Na implementação real, você faria uma requisição AJAX para obter os pedidos do usuário
    console.log('Carregando histórico de pedidos...');
  }
  loadOrderHistory();
});

// ===== FUNÇÕES PARA INTEGRAÇÃO COM BACKEND =====
// Estas são funções de exemplo que você implementaria para comunicação com o servidor

function saveAvatarToServer(avatarData) {
  // Implementação real faria uma requisição AJAX para salvar o avatar
  console.log('Salvando avatar no servidor...');
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}

function saveAddressToServer(addressData) {
  // Implementação real faria uma requisição AJAX para salvar o endereço
  console.log('Salvando endereço no servidor:', addressData);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}

function saveProfileToServer(profileData) {
  // Implementação real faria uma requisição AJAX para salvar os dados do perfil
  console.log('Salvando perfil no servidor:', profileData);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}

function changePasswordOnServer(newPassword) {
  // Implementação real faria uma requisição AJAX para alterar a senha
  console.log('Alterando senha no servidor...');
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}

function updateTwoFactorStatus(enabled) {
  // Implementação real faria uma requisição AJAX para atualizar o status
  console.log('Atualizando autenticação de dois fatores:', enabled);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}