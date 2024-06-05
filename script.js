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

    const homeButton = document.querySelector('.home-button');

    homeButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    }, false);

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const nextButtons = document.querySelectorAll('.start-quiz-button');
    const prevButtons = document.querySelectorAll('.prev-button');
    let currentIndex = 0;

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = carouselItems.length - 1;
            }
            updateCarousel();
        });
    }, false);

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
        carouselTrack.style.transform = `translateX(10px)`;
        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    const form = document.querySelector('form');
    const fieldsets = form.querySelectorAll('fieldset');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        let isValid = true;

        fieldsets.forEach(fieldset => {
            const radioButtons = fieldset.querySelectorAll('input[type="radio"]');
            let checked = false;
            radioButtons.forEach(button => {
                if (button.checked) {
                    checked = true;
                }
            });
            if (!checked) {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Please choose an option';
                errorMessage.classList.add('error-message');
                fieldset.appendChild(errorMessage);
                isValid = false;
            }
        });

        if (isValid) {
            const skinTypeMapping = {
                // Dry Skin
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Dry and possibly flaky|It often looks patchy or cakey|Very sensitive, reacts easily|Dry and possibly tight|Yes, often': 'Dry',
            
                // Normal Skin
                'Balanced, neither dry nor oily|Rarely|Medium-sized|Occasionally|No, once is enough|Stays relatively the same|Rarely or never|Normal, no significant changes|Stays on well|Generally tolerant|Normal|No, rarely': 'Normal',
            
                // Oily Skin
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Often|Very oily and shiny|Becomes shiny and needs blotting or powder|Rarely reacts|Oily|Occasionally': 'Oily',
            
                // Combination Skin
                'Dry in some areas, oily in others|Sometimes, in specific areas|Large in some areas, small in others|Only in the T-zone|Only in certain areas|Varies, dry in cold weather and oily in hot weather|Frequently, especially in specific areas|Oily in some areas, dry in others|Wears off unevenly in different areas|Sensitive in some areas, tolerant in others|Dry in some areas, oily in others|Only in certain areas': 'Combination',
            
                // Dry-Combination Skin
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Dry and possibly flaky|It often looks patchy or cakey|Very sensitive, reacts easily|Dry in some areas, oily in others|Yes, often': 'Dry-Combination',
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Dry and possibly flaky|It often looks patchy or cakey|Very sensitive, reacts easily|Dry and possibly tight|Only in certain areas': 'Dry-Combination',
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Oily in some areas, dry in others|It often looks patchy or cakey|Very sensitive, reacts easily|Dry and possibly tight|Yes, often': 'Dry-Combination',
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Oily in some areas, dry in others|It often looks patchy or cakey|Very sensitive, reacts easily|Dry in some areas, oily in others|Yes, often': 'Dry-Combination',
            
                // Oily-Combination Skin
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Often|Very oily and shiny|Becomes shiny and needs blotting or powder|Rarely reacts|Dry in some areas, oily in others|Occasionally': 'Oily-Combination',
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Often|Very oily and shiny|Becomes shiny and needs blotting or powder|Rarely reacts|Oily|Only in certain areas': 'Oily-Combination',
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Frequently, especially in specific areas|Very oily and shiny|Becomes shiny and needs blotting or powder|Rarely reacts|Oily|Occasionally': 'Oily-Combination',
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Frequently, especially in specific areas|Very oily and shiny|Becomes shiny and needs blotting or powder|Rarely reacts|Dry in some areas, oily in others|Occasionally': 'Oily-Combination',
            
                // Sensitive Skin
                'Balanced, neither dry nor oily|Rarely|Medium-sized|Occasionally|No, once is enough|Stays relatively the same|Rarely or never|Normal, no significant changes|Stays on well|Very sensitive, reacts easily|Normal|Yes, often': 'Sensitive',
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Dry and possibly flaky|It often looks patchy or cakey|Very sensitive, reacts easily|Dry and possibly tight|Yes, often': 'Sensitive-Dry',
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Often|Very oily and shiny|Becomes shiny and needs blotting or powder|Very sensitive, reacts easily|Oily|Occasionally': 'Sensitive-Oily',
                'Dry in some areas, oily in others|Sometimes, in specific areas|Large in some areas, small in others|Only in the T-zone|Only in certain areas|Varies, dry in cold weather and oily in hot weather|Frequently, especially in specific areas|Oily in some areas, dry in others|Wears off unevenly in different areas|Very sensitive, reacts easily|Dry in some areas, oily in others|Only in certain areas': 'Sensitive-Combination',
            
                // Additional Combinations
                'Balanced, neither dry nor oily|Rarely|Medium-sized|Occasionally|No, once is enough|Stays relatively the same|Rarely or never|Normal, no significant changes|Stays on well|Generally tolerant|Normal|No, rarely': 'Normal',
                'Oily or greasy|Never|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Often|Very oily and shiny|Becomes shiny and needs blotting or powder|Rarely reacts|Oily|Occasionally': 'Oily',
                'Dry in some areas, oily in others|Sometimes, in specific areas|Large in some areas, small in others|Only in the T-zone|Only in certain areas|Varies, dry in cold weather and oily in hot weather|Frequently, especially in specific areas|Oily in some areas, dry in others|Wears off unevenly in different areas|Sensitive in some areas, tolerant in others|Dry in some areas, oily in others|Only in certain areas': 'Combination',
                'Tight and dry|Often|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Dry and possibly flaky|It often looks patchy or cakey|Very sensitive, reacts easily|Dry and possibly tight|Only in certain areas': 'Dry-Combination',
                'Balanced, neither dry nor oily|Rarely|Medium-sized|Rarely or never|No, once is enough|Stays relatively the same|Rarely or never|Normal, no significant changes|Stays on well|Very sensitive, reacts easily|Normal|No, rarely': 'Sensitive',
                'Oily or greasy|Never|Large and visible|Often|No, I don’t use moisturizer|Becomes more oily|Frequently, especially in specific areas|Very oily and shiny|Becomes shiny and needs blotting or powder|Very sensitive, reacts easily|Oily|Occasionally': 'Sensitive-Oily',
                'Dry in some areas, oily in others|Sometimes, in specific areas|Large in some areas, small in others|Only in the T-zone|Only in certain areas|Varies, dry in cold weather and oily in hot weather|Rarely or never|Oily in some areas, dry in others|Wears off unevenly in different areas|Very sensitive, reacts easily|Dry in some areas, oily in others|Only in certain areas': 'Sensitive-Combination',
                'Balanced, neither dry nor oily|Often|Medium-sized|Occasionally|No, once is enough|Stays relatively the same|Often|Normal, no significant changes|Stays on well|Generally tolerant|Normal|No, rarely': 'Normal',
                'Oily or greasy|Sometimes|Large and visible|Often|No, I don\'t use moisturizer|Becomes more oily|Often|Very oily and shiny|Becomes shiny and needs blotting or powder|Generally tolerant|Oily|Occasionally': 'Oily',
                'Dry in some areas, oily in others|Often|Large in some areas, small in others|Only in the T-zone|Only in certain areas|Varies, dry in cold weather and oily in hot weather|Frequently, especially in specific areas|Oily in some areas, dry in others|Wears off unevenly in different areas|Sensitive in some areas, tolerant in others|Dry in some areas, oily in others|Only in certain areas': 'Combination',
                'Tight and dry|Rarely|Small and barely visible|Rarely or never|Yes, frequently|Becomes very dry and tight|Rarely or never|Dry and possibly flaky|It often looks patchy or cakey|Very sensitive, reacts easily|Dry and possibly tight|Only in certain areas': 'Dry-Combination',
                'Balanced, neither dry nor oily|Occasionally|Medium-sized|Rarely or never|No, once is enough|Stays relatively the same|Occasionally|Normal, no significant changes|Stays on well|Very sensitive, reacts easily|Normal|No, rarely': 'Sensitive',
                'Oily or greasy|Rarely|Large and visible|Often|No, I don’t use moisturizer|Becomes more oily|Frequently, especially in specific areas|Very oily and shiny|Becomes shiny and needs blotting or powder|Very sensitive, reacts easily|Oily|Occasionally': 'Sensitive-Oily',
                'Dry in some areas, oily in others|Occasionally|Large in some areas, small in others|Only in the T-zone|Only in certain areas|Varies, dry in cold weather and oily in hot weather|Rarely or never|Oily in some areas, dry in others|Wears off unevenly in different areas|Very sensitive, reacts easily|Dry in some areas, oily in others|Only in certain areas': 'Sensitive-Combination'
            };


            function getSkinType() {
                const formElements = document.querySelectorAll('input[type="radio"]:checked');
                const selectedValues = Array.from(formElements).map(el => el.value);
                return skinTypeMapping[selectedValues.join('|')] || 'Unknown';
            }

            const skinType = getSkinType();
            const skinTypeSpan = document.getElementById('skin-type');
            const skinTypeResultSpan = document.getElementById('skin-type-result');

            skinTypeSpan.textContent = skinType;
            skinTypeResultSpan.textContent = skinType;

            const quizSection = document.querySelector('.quiz');
            const resultsSection = document.querySelector('.results');
            quizSection.classList.remove('active');
            resultsSection.classList.add('active');
        }
    });
});