// Função para inicializar os gráficos
function initCharts() {
    // Gráfico de Vendas Semanais
    const weeklySalesCtx = document.getElementById('weeklySalesChart').getContext('2d');
    const weeklySalesChart = new Chart(weeklySalesCtx, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Vendas (R$)',
                data: [1250, 1890, 2100, 1780, 2450, 3200, 2800],
                backgroundColor: 'rgba(255, 95, 0, 0.7)',
                borderColor: 'rgba(255, 95, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'R$ ' + context.raw.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Vendas Mensais
    const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');
    const monthlySalesChart = new Chart(monthlySalesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Vendas (R$)',
                data: [18500, 22000, 24500, 21000, 26500, 30000, 32500, 31000, 28500, 29500, 35000, 38000],
                backgroundColor: 'rgba(255, 95, 0, 0.2)',
                borderColor: 'rgba(255, 95, 0, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'R$ ' + context.raw.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + (value / 1000) + 'k';
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Desempenho Anual
    const annualPerformanceCtx = document.getElementById('annualPerformanceChart').getContext('2d');
    const annualPerformanceChart = new Chart(annualPerformanceCtx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Vendas (R$)',
                    data: [185000, 245000, 320000, 380000],
                    backgroundColor: 'rgba(255, 95, 0, 0.7)',
                    borderColor: 'rgba(255, 95, 0, 1)',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Clientes',
                    data: [850, 1120, 1450, 1800],
                    backgroundColor: 'rgba(108, 117, 125, 0.7)',
                    borderColor: 'rgba(108, 117, 125, 1)',
                    borderWidth: 1,
                    type: 'line',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += 'R$ ' + context.raw.toLocaleString('pt-BR');
                            } else {
                                label += context.raw.toLocaleString('pt-BR');
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Vendas (R$)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + (value / 1000) + 'k';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Clientes'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Função para alternar o menu mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const adminMenu = document.querySelector('.admin-menu');
    
    if (menuToggle && adminMenu) {
        menuToggle.addEventListener('click', () => {
            adminMenu.classList.toggle('active');
        });
    }
}

// Função para inicializar os dropdowns
function setupDropdowns() {
    const dropdownToggles = document.querySelectorAll('.user-dropdown');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.querySelector('.dropdown-menu');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
}

// Função para inicializar os accordions do FAQ
function setupAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('active');
            
            // Fechar todos os outros itens
            document.querySelectorAll('.faq-item').forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                    el.querySelector('.faq-question i').classList.remove('fa-chevron-up');
                    el.querySelector('.faq-question i').classList.add('fa-chevron-down');
                }
            });
            
            // Alternar o item atual
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                question.querySelector('i').classList.remove('fa-chevron-up');
                question.querySelector('i').classList.add('fa-chevron-down');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('i').classList.remove('fa-chevron-down');
                question.querySelector('i').classList.add('fa-chevron-up');
            }
        });
    });
}

// Função principal que inicializa tudo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    setupMobileMenu();
    setupDropdowns();
    setupAccordions();
    
    // Adicionar evento de clique para os links do menu para rolar suavemente
    document.querySelectorAll('.admin-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Fechar o menu mobile se estiver aberto
                    const adminMenu = document.querySelector('.admin-menu');
                    if (adminMenu.classList.contains('active')) {
                        adminMenu.classList.remove('active');
                    }
                }
            }
        });
    });
});