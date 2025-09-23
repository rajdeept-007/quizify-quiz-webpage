// Get elements
const createQuizBtn = document.getElementById('create-quiz-btn');
const viewQuizzesBtn = document.getElementById('view-quizzes-btn');
const createQuizPopup = document.getElementById('createQuizPopup');
const closeCreateQuizPopup = document.getElementById('closeCreateQuizPopup');
const viewQuizzesSection = document.getElementById('viewQuizzesSection');
const closeViewQuizzesPopup = document.getElementById('closeViewQuizzesPopup');
const questionsContainer = document.getElementById('questions-container');
const addQuestionBtn = document.getElementById('add-question-btn');
const saveQuizBtn = document.getElementById('save-quiz-btn');
const quizList = document.getElementById('quizList');
const attemptQuizSection = document.getElementById('attempt-quiz-section');
const attemptQuizContainer = document.getElementById('attempt-quiz-container');
const attemptQuizBtn = document.getElementById('attempt-quiz-btn');

let quizzes = []; // Array to hold quizzes

// Event listeners for buttons
createQuizBtn.addEventListener('click', () => {
    createQuizPopup.style.display = 'flex'; // Show popup as flex for centering
});

viewQuizzesBtn.addEventListener('click', () => {
    viewQuizzesSection.style.display = 'flex'; // Show view quizzes popup
    displayQuizzes(); // Show quizzes when viewing
});

// Close popups when 'X' is clicked
closeCreateQuizPopup.addEventListener('click', () => {
    createQuizPopup.style.display = 'none'; // Hide the create quiz popup
});

closeViewQuizzesPopup.addEventListener('click', () => {
    viewQuizzesSection.style.display = 'none'; // Hide the view quizzes popup
});

// Add question functionality
addQuestionBtn.addEventListener('click', () => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    questionDiv.innerHTML = `
        <input type="text" placeholder="Question" required>
        <input type="text" placeholder="Option 1" required>
        <input type="text" placeholder="Option 2" required>
        <input type="text" placeholder="Option 3" required>
        <input type="text" placeholder="Option 4" required>
        <select>
            <option value="0">Correct Option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </select>
    `;
    
    questionsContainer.appendChild(questionDiv);
});

// Function to save the quiz
saveQuizBtn.addEventListener('click', () => {
    const quizTitle = document.getElementById('quiz-title').value.trim();
    const questions = [];
    
    const questionDivs = questionsContainer.getElementsByClassName('question');
    for (let questionDiv of questionDivs) {
        const questionText = questionDiv.querySelector('input[type="text"]').value.trim();
        const options = Array.from(questionDiv.querySelectorAll('input[type="text"]')).map(input => input.value.trim());
        const correctOptionIndex = questionDiv.querySelector('select').value;
        
        // Ensure question and options are filled
        if (questionText && options.every(option => option)) {
            questions.push({
                question: questionText,
                options: options,
                correctOption: correctOptionIndex
            });
        }
    }

    // Check if the quiz title and questions are valid before saving
    if (quizTitle && questions.length > 0) {
        quizzes.push({ title: quizTitle, questions: questions });
        alert('Quiz saved successfully!');

        // Clear fields after saving
        document.getElementById('quiz-title').value = '';
        questionsContainer.innerHTML = '';
        createQuizPopup.style.display = 'none'; // Close the popup after saving
    } else {
        alert('Please fill in the quiz title and at least one question.');
    }
});

// Function to display quizzes
function displayQuizzes() {
    quizList.innerHTML = ''; // Clear existing quizzes
    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${quiz.title}`;
        li.addEventListener('click', () => attemptQuiz(index)); // Add click event to attempt quiz
        quizList.appendChild(li);
    });
}

// Attempt quiz function
function attemptQuiz(quizIndex) {
    attemptQuizSection.style.display = 'block'; // Show attempt quiz section
    const quiz = quizzes[quizIndex];
    attemptQuizContainer.innerHTML = ''; // Clear previous quiz attempts
    
    quiz.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        
        questionDiv.innerHTML = `
            <h3>${index + 1}. ${question.question}</h3>
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}"> ${option}
                </label><br>
            `).join('')}
        `;
        
        attemptQuizContainer.appendChild(questionDiv);
    });
}

// Submit quiz attempt
attemptQuizBtn.addEventListener('click', () => {
    let score = 0;

    quizzes.forEach((quiz, quizIndex) => {
        quiz.questions.forEach((question) => {
            const selectedOption = document.querySelector(`input[name="question${quizIndex}"]:checked`);
            if (selectedOption && selectedOption.value === question.correctOption) {
                score++;
            }
        });
    });

    alert(`Your score: ${score} out of ${quizzes.length}`);
});









// Animated Stats Counter
const counters = document.querySelectorAll('.stat-number');
counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const currentValue = +counter.innerText;
        const increment = target / 200; // Adjust for animation speed

        if (currentValue < target) {
            counter.innerText = `${Math.ceil(currentValue + increment)}`;
            setTimeout(updateCounter, 10); // Speed of animation
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
});


// Testimonial Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 260}px)`; // Adjusted to match new gap
    });
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 3000); // Change slides every 3 seconds


setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 3000); // Change slides every 3 seconds
