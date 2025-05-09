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
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(type, 100);
    });

}

function carousel() {
    const carouselInner = document.getElementById('carouselInner');
    const totalItems = carouselInner.children.length;
    let visibleItems = getVisibleItems(); // calcula ao carregar
    let currentIndex = 0;

    window.addEventListener('resize', () => { // recalcule ao redimensionar
        // Se o número de itens visíveis mudar, atualize a posição do carrossel
        visibleItems = getVisibleItems();
        console.log(visibleItems);
        updateCarousel();
    });


    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    function getVisibleItems() {
        const width = window.innerWidth;
        if (width < 640) return 1;     // mobile
        if (width < 1024) return 2;    // tablet
        return 3;                      // desktop
    }

    function updateCarousel() {
        visibleItems = getVisibleItems();
        const totalItems = carouselInner.children.length;
        // Garante que o índice não ultrapasse o máximo possível
        if (currentIndex > totalItems - visibleItems) {
            currentIndex = Math.max(0, totalItems - visibleItems);
        }
        const percentage = (100 / visibleItems) * currentIndex;
        carouselInner.style.transform = `translateX(-${percentage}%)`;
        carouselInner.style.width = `${(100 / visibleItems) * totalItems}%`;
        // Ajusta a largura dos cards
        Array.from(carouselInner.children).forEach(card => {
            card.style.width = `${100 / totalItems}%`;
        });
    }
    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Chama a função para definir a posição inicial
}

// ...existing code...

async function carregarReviewsFeaturable() {
    const url = "https://featurable.com/api/v1/widgets/8d7d9970-acc9-433b-80a5-b8599113eed9";
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        if (data.success && Array.isArray(data.reviews)) {
            const carouselInner = document.getElementById('carouselInner');
            carouselInner.innerHTML = ''; // Limpa os cartões existentes

            data.reviews.forEach(review => {
                const card = document.createElement('div');
                card.className = "p-2 flex-shrink-0"; // Adiciona a classe para o carrossel
                card.innerHTML = `
                    <div class="bg-white text-black rounded-lg shadow p-4 max-w-md mx-auto">
                        <div class="flex items-center mb-2">
                            <span class="font-bold">${review.reviewer.displayName}</span>
                            <span class="ml-2 text-yellow-400">
                                ${'★'.repeat(review.starRating)}${'☆'.repeat(5 - review.starRating)}
                            </span>
                        </div>
                        <p class="text-sm mt-2 flex-1">${review.comment}</p>
                    </div>
                `;
                carouselInner.appendChild(card);
            });
            carousel();
        }
    } catch (e) {
        console.error("Erro ao carregar reviews:", e);
    }
}

document.addEventListener('DOMContentLoaded', carregarReviewsFeaturable);


wordCount();
toggleDropdown();

