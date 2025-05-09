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
    let visibleItems = getVisibleItems();
    let currentIndex = 0;

    window.addEventListener('resize', () => {
        visibleItems = getVisibleItems();
        validateAndUpdateCarousel();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalItems = carouselInner.children.length;
        const maxIndex = totalItems - visibleItems;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao início
        }
        validateAndUpdateCarousel();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        const totalItems = carouselInner.children.length;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - visibleItems; // Vai para o último conjunto
        }
        validateAndUpdateCarousel();
    });

    function getVisibleItems() {
        const width = window.innerWidth;
        if (width < 640) return 1;     // mobile
        if (width < 1024) return 2;    // tablet
        return 3;                      // desktop
    }

    function validateAndUpdateCarousel() {
        const totalItems = carouselInner.children.length;
        const maxIndex = Math.max(0, totalItems - visibleItems);
        
        // Garante que o índice não ultrapasse o limite máximo
        currentIndex = Math.min(currentIndex, maxIndex);
        
        // Atualiza a posição do carousel considerando os itens visíveis
        const percentage = (100 / totalItems) * currentIndex;
        carouselInner.style.transform = `translateX(-${percentage}%)`;
        carouselInner.style.width = `${100 * totalItems / visibleItems}%`;
        
        // Ajusta a largura dos cards
        Array.from(carouselInner.children).forEach(card => {
            card.style.width = `${100 / totalItems}%`;
        });
    }

    // Inicialização
    validateAndUpdateCarousel();

    // Rolagem automática
    let autoScrollInterval = setInterval(() => {
        const totalItems = carouselInner.children.length;
        const maxIndex = totalItems - visibleItems;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao início
        }
        validateAndUpdateCarousel();
    }, 5000);

    // Opcional: Parar a rolagem automática quando o mouse estiver sobre o carousel
    document.getElementById('carousel').addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    document.getElementById('carousel').addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            const totalItems = carouselInner.children.length;
            const maxIndex = totalItems - visibleItems;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            validateAndUpdateCarousel();
        }, 5000);
    });
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
                card.innerHTML = `
                    <div class="bg-white text-black h-2/3 rounded-lg p-4 shadow mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300">
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

