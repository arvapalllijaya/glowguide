document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const nextButtons = document.querySelectorAll('.start-quiz-button');
    let currentIndex = 0;

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= carouselItems.length) {
                currentIndex = 0;
            }
            updateCarousel();
        });
    });

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex}%)`;
        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    const form = document.querySelector('form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        let isValid = true;

        if (nameInput.value.trim() === '') {
            const nameError = document.createElement('div');
            nameError.textContent = 'Please enter your name.';
            nameError.classList.add('error-message');
            nameInput.parentNode.appendChild(nameError);
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            const emailError = document.createElement('div');
            emailError.textContent = 'Please enter a valid email address.';
            emailError.classList.add('error-message');
            emailInput.parentNode.appendChild(emailError);
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            const messageError = document.createElement('div');
            messageError.textContent = 'Please enter a message.';
            messageError.classList.add('error-message');
            messageInput.parentNode.appendChild(messageError);
            isValid = false;
        }

        if (isValid) {
            form.submit();
        }
    });
});
