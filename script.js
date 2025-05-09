// script.js
// Função para alternar a exibição do conteúdo FAQ

function toggleDropdown() {
    document.addEventListener('DOMContentLoaded', function () {
    const faqButtons = document.querySelectorAll('.space-y-4 button');

    faqButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Toggle visibilidade e rotação
            content.classList.toggle('hidden');
            content.classList.toggle('opacity-0');
            content.classList.toggle('opacity-100');
            content.classList.toggle('max-h-0');
            content.classList.toggle('max-h-96');
            

            // Toggle rotação do ícone
            icon.classList.toggle('transform');
            icon.classList.toggle('rotate-90');
            
            

            // Fecha outros dropdowns
            faqButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherContent = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('i');

                   otherContent.classList.add('hidden', 'opacity-0', 'max-h-0');
                    otherContent.classList.remove('opacity-100', 'max-h-96');
                    otherIcon.classList.remove('rotate-90');
                }
            });
        });
    });
});

}


function wordCount() {
  const words = ["suspenso?", "bloqueado?"];
const typingText = document.getElementById("typing-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

// Encontra a palavra mais longa para definir a largura
const maxLength = Math.max(...words.map(word => word.length));

function type() {
    const currentWord = words[wordIndex];
    let displayText = currentWord.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
    
    // Preenche o resto do espaço com caracteres invisíveis
    while (displayText.length < maxLength) {
        displayText += '\u00A0';
    }
    
    typingText.textContent = displayText;
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    // Quando terminar de escrever a palavra
    if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 2000);
    }

    // Quando terminar de apagar a palavra
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

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
    
}


toggleDropdown();
wordCount();
