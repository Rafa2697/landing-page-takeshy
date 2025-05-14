// script.js
// Função para alternar a exibição do conteúdo FAQ

function toggleDropdown() {
    document.querySelectorAll('.bg-white.rounded-lg.shadow button').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            const icon = button.querySelector('.fas.fa-caret-right');

            // Fecha todos os outros dropdowns
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.style.maxHeight = '0px';
                    content.previousElementSibling.querySelector('.fas.fa-caret-right').style.transform = 'rotate(0deg)';
                }
            });

            // Alterna o dropdown atual
            if (dropdownContent.style.maxHeight === '0px' || !dropdownContent.style.maxHeight) {
                dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
                icon.style.transform = 'rotate(90deg)';
            } else {
                dropdownContent.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Inicializa todos os dropdowns como fechados
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.style.maxHeight = '0px';
        });
    });

}


function wordCount() {
    const words = ["hackeado?", "suspenso?", "bloqueado?"];
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


async function carregarReviewsFeaturable() {
    const url = "https://featurable.com/api/v1/widgets/c9a89677-551c-4fee-b8f5-084d33f9fd6a";
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
                    <div class="bg-white h-[250px] overflow-hidden text-black  rounded-lg p-4 shadow mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300 scroll-auto">
                        <div class="flex items-center mb-2 flex-wrap justify-center md:justify-start">
                            <img src="${review.reviewer.profilePhotoUrl}" alt="Avatar" class="w-10 h-10 rounded-full mr-2">
                            <span class="font-bold">${review.reviewer.displayName}</span>
                            <span class="ml-2 text-yellow-400">
                                ${'★'.repeat(review.starRating)}${'☆'.repeat(5 - review.starRating)}
                            </span>
                        </div>
                        <div class="h-[180px] overflow-y-auto">
            <p class="text-sm mt-2">${review.comment}</p>
        </div>
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

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('fadeInElement');
    // Pequeno atraso para garantir que o navegador processe o opacity-0 inicial antes de aplicar a transição
    setTimeout(() => {
        element.classList.remove('opacity-0');
        element.classList.add('opacity-100');
    }, 250); // Ajuste o atraso se necessário, ou remova se não for preciso.
});




wordCount();
toggleDropdown();


