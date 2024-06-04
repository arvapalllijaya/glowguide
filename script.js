document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const nextButton = document.querySelector('.next-button');
    const startQuizButton = document.querySelector('.start-quiz-button');
    const form = document.querySelector('.quiz');

    let currentIndex = 0;

    function moveToNextSlide(isNext = true) {
        if (isNext && currentIndex < carouselItems.length - 1) {
            carouselTrack.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
            carouselItems[currentIndex].classList.remove('active');
            currentIndex++;
            carouselItems[currentIndex].classList.add('active');
        } else if (!isNext && currentIndex > 0) {
            carouselTrack.style.transform = `translateX(-${100 * (currentIndex - 1)}%)`;
            carouselItems[currentIndex].classList.remove('active');
            currentIndex--;
            carouselItems[currentIndex].classList.add('active');
        }
    }

    function validateForm() {
        let allAnswered = true;
        const questions = form.querySelectorAll('fieldset');

        questions.forEach(question => {
            const options = question.querySelectorAll('input[type="radio"]');
            const isAnswered = Array.from(options).some(option => option.checked);

            if (!isAnswered) {
                allAnswered = false;
                question.classList.add('error');
                question.querySelector('.error-message').style.display = 'block';
            } else {
                question.classList.remove('error');
                question.querySelector('.error-message').style.display = 'none';
            }
        });

        return allAnswered;
    }

    function saveAnswers() {
        const answers = {};
        const questions = form.querySelectorAll('fieldset');

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            answers[`question${index + 1}`] = selectedOption ? selectedOption.value : 'Not answered';
        });

        localStorage.setItem('userAnswers', JSON.stringify(answers));
    }

    function showResult() {
        const resultSlide = document.createElement('section');
        resultSlide.classList.add('carousel-item', 'result');
        resultSlide.innerHTML = `
            <h2>Your Quiz Result</h2>
            <div class="result-content">
                <p>Thank you for completing the quiz!</p>
            </div>
        `;
        carouselTrack.appendChild(resultSlide);
        carouselItems[currentIndex].classList.remove('active');
        resultSlide.classList.add('active');
    }

    nextButton.addEventListener('click', () => moveToNextSlide(true));

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('prev-button');
    prevButton.addEventListener('click', () => moveToNextSlide(false));

    startQuizButton.addEventListener('click', () => {
        startQuizButton.parentElement.style.display = 'none';
        moveToNextSlide(true);
        document.querySelector('.quiz').insertAdjacentElement('beforebegin', prevButton);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (validateForm()) {
            saveAnswers();
            showResult();
        }
    });
});