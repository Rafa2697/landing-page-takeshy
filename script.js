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