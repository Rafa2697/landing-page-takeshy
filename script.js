// script.js
// Função para alternar a exibição do conteúdo FAQ
document.addEventListener('DOMContentLoaded', function () {
    const faqButtons = document.querySelectorAll('.space-y-4 button');

    faqButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Toggle visibilidade e rotação
            content.classList.toggle('hidden');
            icon.classList.toggle('transform');
            icon.classList.toggle('rotate-90');

            // Fecha outros dropdowns
            faqButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherContent = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('i');

                    otherContent.classList.add('hidden');
                    otherIcon.classList.remove('rotate-90');
                }
            });
        });
    });
});


const words = ["suspenso?", "bloqueado?"];
const typingText = document.getElementById("typing-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Removendo caracteres
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Adicionando caracteres
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Quando terminar de escrever a palavra
    if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 2000); // Espera 2 segundos antes de começar a apagar
    }

    // Quando terminar de apagar a palavra
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    // Define a velocidade da digitação/apagamento
    const typingSpeed = isDeleting ? 50 : 90;
    
    if (!isWaiting) {
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(type, 1000);
    }
}

// Inicia o efeito quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 100);
});