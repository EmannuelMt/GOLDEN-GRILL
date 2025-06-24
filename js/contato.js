// Simulação do loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.visibility = 'hidden';
    }, 1500);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentNode;
        const answer = button.nextElementSibling;
        
        // Fecha todas as outras respostas
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.querySelector('.faq-question').classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
            }
        });
        
        // Alterna a resposta atual
        button.classList.toggle('active');
        if (button.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Form submission
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
});