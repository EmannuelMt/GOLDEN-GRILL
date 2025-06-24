// Funções globais compartilhadas entre todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips
    const tooltipElements = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', showTooltip);
      element.addEventListener('mouseleave', hideTooltip);
    });
  
    // Inicializar modais
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', toggleModal);
    });
  });
  
  // Função para mostrar tooltip
  function showTooltip(e) {
    const tooltipText = this.getAttribute('title') || this.getAttribute('data-tooltip');
    if (!tooltipText) return;
  
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.opacity = '0';
    
    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(-5px)';
    }, 10);
    
    this.tooltipElement = tooltip;
    this.removeAttribute('title');
  }
  
  // Função para esconder tooltip
  function hideTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
  
  // Função para alternar modal
  function toggleModal(e) {
    e.preventDefault();
    const modalId = this.getAttribute('data-target');
    const modal = document.querySelector(modalId);
    
    if (!modal) return;
    
    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    } else {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }