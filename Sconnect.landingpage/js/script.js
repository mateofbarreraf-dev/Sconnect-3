// JavaScript para funcionalidades da landing page expandida
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const employerBtn = document.getElementById('employerBtn');
    const workerBtn = document.getElementById('workerBtn');
    const finalEmployerBtn = document.getElementById('finalEmployerBtn');
    const finalWorkerBtn = document.getElementById('finalWorkerBtn');
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const impactNumbers = document.querySelectorAll('.impact-number');

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contadores animados para estatísticas do hero
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
                clearInterval(timer);
                
                // Efeito de pulso ao completar
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            } else {
                element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    // Observador para animar contadores do hero
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    animateCounter(stat, target, 2000);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    heroObserver.observe(document.querySelector('.hero-stats'));

    // Observador para animar contadores de impacto
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                impactNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    animateCounter(stat, target, 2500);
                });
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    impactObserver.observe(document.querySelector('.impact-section'));

    // Animação de fade-in para seções
    const fadeElements = document.querySelectorAll('.problem-card, .solution-card, .innovation-card, .testimonial-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeObserver.observe(element);
    });

    // Event Listeners para botões
    const buttons = [loginBtn, registerBtn, employerBtn, workerBtn, finalEmployerBtn, finalWorkerBtn];
    
    buttons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                const buttonType = this.id || this.classList[1];
                handleButtonClick(buttonType);
            });
        }
    });

    function handleButtonClick(type) {
        let message = '';
        
        switch(type) {
            case 'loginBtn':
            case 'btn-outline':
                message = '🚀 Página de login em desenvolvimento!';
                break;
            case 'registerBtn':
            case 'btn-primary':
                message = '📝 Redirecionando para cadastro...';
                break;
            case 'employerBtn':
            case 'finalEmployerBtn':
            case 'btn-employer':
                message = '🏢 Cadastro para Empregadores - Em breve!';
                break;
            case 'workerBtn':
            case 'finalWorkerBtn':
            case 'btn-worker':
                message = '👷 Cadastro para Trabalhadores - Em breve!';
                break;
            default:
                message = '🚀 Em desenvolvimento!';
        }
        
        showNotification(message);
    }

    // Sistema de notificação moderna
    function showNotification(message) {
        // Remove notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;

        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--dark-card);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 1px solid var(--dark-border);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(notification);

        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Header scroll effect melhorado
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
    });

    // Efeito de brilho interativo
    const glow = document.querySelector('.hero-glow');
    if (glow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            glow.style.transform = `translate(calc(-50% + ${(x - 0.5) * 50}px), calc(-50% + ${(y - 0.5) * 50}px))`;
        });
    }

    // Efeito de hover nos cards
    const cards = document.querySelectorAll('.problem-card, .solution-card, .innovation-card, .impact-stat');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.borderColor = 'var(--primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'var(--dark-border)';
        });
    });

    // Inicialização quando a página carrega
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Adiciona delay para animações iniciais
        setTimeout(() => {
            document.querySelector('.hero-content').classList.add('loaded');
        }, 500);
    });

    // Efeito de digitação no subtítulo (opcional)
    function typeWriterEffect(element, text, speed = 30) {
        let i = 0;
        element.textContent = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Iniciar efeito de digitação se desejado
    // const subtitle = document.querySelector('.hero-subtitle');
    // if (subtitle) {
    //     const originalText = subtitle.textContent;
    //     typeWriterEffect(subtitle, originalText, 40);
    // }
});

// Função para formatação de números grandes
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

