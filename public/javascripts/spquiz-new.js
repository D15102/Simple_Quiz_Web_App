// Sample questions for Spatial Aptitude
let questions = [
  {
    "numb": 1,
    "question": "Which of the following shapes, when folded, will form a cube?",
    "answer": "Cross-shaped pattern",
    "options": [
      "T-shaped pattern",
      "Cross-shaped pattern",
      "L-shaped pattern",
      "Z-shaped pattern"
    ]
  },
  {
    "numb": 2,
    "question": "If a square is rotated 45 degrees clockwise, which of the following best represents the result?",
    "answer": "Diamond shape",
    "options": [
      "Rectangle",
      "Diamond shape",
      "Triangle",
      "Pentagon"
    ]
  },
  {
    "numb": 3,
    "question": "Which of the following is the mirror image of the pattern: ⊥⊢⊣⊤?",
    "answer": "⊤⊣⊢⊥",
    "options": [
      "⊥⊢⊣⊤",
      "⊤⊣⊢⊥",
      "⊥⊣⊢⊤",
      "⊤⊢⊣⊥"
    ]
  },
  {
    "numb": 4,
    "question": "If you look at a clock in a mirror, what time will it show when the actual time is 3:15?",
    "answer": "8:45",
    "options": [
      "9:45",
      "8:45",
      "3:15",
      "2:45"
    ]
  },
  {
    "numb": 5,
    "question": "Which of the following shapes has the most lines of symmetry?",
    "answer": "Circle",
    "options": [
      "Rectangle",
      "Equilateral Triangle",
      "Square",
      "Circle"
    ]
  }
];

// Selecting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quitBtn = document.querySelector(".quit-btn");
const continueBtn = document.querySelector(".continue-btn");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const optionsList = document.querySelector(".options");
const progressFill = document.querySelector(".progress-fill");
const timeCount = document.querySelector(".timer-count");
const progressIndicator = document.getElementById("progress-indicator");

// Set up variables
let timeValue = 60;
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let counterLine;

// Create progress steps
function createProgressSteps() {
  progressIndicator.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const step = document.createElement('div');
    step.className = 'progress-step';
    step.setAttribute('data-question', i + 1);
    progressIndicator.appendChild(step);
  }
}

// If Start Quiz button clicked
startBtn.onclick = () => {
  infoBox.classList.add("active"); // Show info box
  createProgressSteps();
};

// If Exit Quiz button clicked
quitBtn.onclick = () => {
  infoBox.classList.remove("active"); // Hide info box
  window.location.href = "/dashboard"; // Redirect to dashboard
};

// If Continue button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("active"); // Hide info box
  quizBox.classList.add("active"); // Show quiz box
  document.querySelector(".start-btn").classList.add("hidden"); // Hide start button
  showQuestion(0); // Show first question
  startTimer(timeValue); // Start timer
  updateQuestionCounter(1); // Update question counter

  // Activate the first progress step
  const firstStep = document.querySelector('.progress-step[data-question="1"]');
  if (firstStep) {
    firstStep.classList.add('active');
  }
};

// Show question function
function showQuestion(index) {
  const questionText = document.querySelector(".question");

  // Create question tag with number badge
  let questionTag = `
    <h3>
      <span class="question-number">${questions[index].numb}</span>
      ${questions[index].question}
    </h3>
  `;

  // Create options with letter labels
  let optionsHTML = '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  for (let i = 0; i < questions[index].options.length; i++) {
    optionsHTML += `
      <div class="option" data-option="${optionLetters[i]}">
        <span>${questions[index].options[i]}</span>
        <div class="option-icon"></div>
      </div>
    `;
  }

  // Add fade-in animation
  questionText.style.opacity = '0';
  optionsList.style.opacity = '0';

  setTimeout(() => {
    questionText.innerHTML = questionTag;
    optionsList.innerHTML = optionsHTML;

    // Fade in
    questionText.style.opacity = '1';
    optionsList.style.opacity = '1';

    // Add transition
    questionText.style.transition = 'opacity 0.3s ease';
    optionsList.style.transition = 'opacity 0.3s ease';

    // Set onclick attribute to all options
    const options = optionsList.querySelectorAll(".option");
    options.forEach(option => {
      option.setAttribute("onclick", "optionSelected(this)");
    });
  }, 150);
}

// Option selected function
function optionSelected(answer) {
  clearInterval(counter); // Clear counter

  const userAnswer = answer.querySelector("span").textContent;
  const correctAnswer = questions[questionCount].answer;
  const allOptions = optionsList.children.length;

  if (userAnswer === correctAnswer) {
    userScore += 1;
    answer.classList.add("correct");
    answer.querySelector(".option-icon").classList.add("correct");
    answer.querySelector(".option-icon").innerHTML = '<i class="fas fa-check"></i>';
  } else {
    answer.classList.add("incorrect");
    answer.querySelector(".option-icon").classList.add("incorrect");
    answer.querySelector(".option-icon").innerHTML = '<i class="fas fa-times"></i>';

    // Show correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionsList.children[i].querySelector("span").textContent === correctAnswer) {
        optionsList.children[i].classList.add("correct");
        optionsList.children[i].querySelector(".option-icon").classList.add("correct");
        optionsList.children[i].querySelector(".option-icon").innerHTML = '<i class="fas fa-check"></i>';
      }
    }
  }

  // Disable all options
  for (let i = 0; i < allOptions; i++) {
    optionsList.children[i].classList.add("disabled");
  }

  // Show next button
  document.querySelector(".next-btn").classList.add("show");

  // Mark current progress step as completed
  const currentStep = document.querySelector(`.progress-step[data-question="${questionNumber}"]`);
  if (currentStep) {
    currentStep.classList.remove('active');
    currentStep.classList.add('completed');
  }
}

// Initialize next button with icon
document.querySelector(".next-btn").innerHTML = `
  Next Question <i class="fas fa-arrow-right"></i>
`;

// Next button click
document.querySelector(".next-btn").onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;

    // Add transition effect
    document.querySelector(".quiz-body").style.opacity = '0';
    document.querySelector(".quiz-body").style.transform = 'translateX(20px)';
    document.querySelector(".quiz-body").style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      showQuestion(questionCount);
      clearInterval(counter);
      startTimer(timeValue);
      updateQuestionCounter(questionNumber);
      document.querySelector(".next-btn").classList.remove("show");

      // Activate next progress step
      const nextStep = document.querySelector(`.progress-step[data-question="${questionNumber}"]`);
      if (nextStep) {
        nextStep.classList.add('active');
      }

      // Reset progress bar
      progressFill.style.width = '0%';

      // Restore opacity and position with animation
      setTimeout(() => {
        document.querySelector(".quiz-body").style.opacity = '1';
        document.querySelector(".quiz-body").style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    // Update button text for last question
    if (questionCount === questions.length - 2) {
      document.querySelector(".next-btn").innerHTML = `
        Finish Test <i class="fas fa-flag-checkered"></i>
      `;
    }
  } else {
    showResult();
  }
};

// Show result function
function showResult() {
  infoBox.classList.remove("active");
  quizBox.classList.remove("active");

  // Calculate percentage score
  const percentage = Math.floor((userScore / questions.length) * 100);

  // Determine result icon and message based on score
  let resultIcon, resultMessage, toastMessage, toastType;

  if (percentage >= 80) {
    resultIcon = '<i class="fas fa-trophy"></i>';
    resultMessage = 'Excellent Performance!';
    toastMessage = 'Congratulations on your excellent score!';
    toastType = 'success';
  } else if (percentage >= 60) {
    resultIcon = '<i class="fas fa-medal"></i>';
    resultMessage = 'Good Job!';
    toastMessage = 'Well done on completing the test!';
    toastType = 'success';
  } else if (percentage >= 40) {
    resultIcon = '<i class="fas fa-smile"></i>';
    resultMessage = 'Nice Effort!';
    toastMessage = 'Test completed. Keep practicing!';
    toastType = 'info';
  } else {
    resultIcon = '<i class="fas fa-book"></i>';
    resultMessage = 'Keep Practicing!';
    toastMessage = 'Don\'t worry, practice makes perfect!';
    toastType = 'info';
  }

  // Update result icon and text
  document.querySelector('.result-icon').innerHTML = resultIcon;
  document.querySelector('.complete-text').textContent = resultMessage;

  // Create detailed score display
  const scoreText = resultBox.querySelector(".score-text");
  let scoreTag = `
    <span>
      <i class="fas fa-chart-pie"></i>
      You scored <p>${userScore}</p> out of <p>${questions.length}</p>
    </span>
    <span>
      <i class="fas fa-percentage"></i>
      Your percentage: <p>${percentage}%</p>
    </span>
  `;

  // Add performance assessment
  if (percentage >= 80) {
    scoreTag += `
      <span>
        <i class="fas fa-star"></i>
        Outstanding spatial aptitude skills!
      </span>
    `;
  } else if (percentage >= 60) {
    scoreTag += `
      <span>
        <i class="fas fa-thumbs-up"></i>
        Good spatial reasoning abilities!
      </span>
    `;
  } else if (percentage >= 40) {
    scoreTag += `
      <span>
        <i class="fas fa-lightbulb"></i>
        You're on the right track!
      </span>
    `;
  } else {
    scoreTag += `
      <span>
        <i class="fas fa-graduation-cap"></i>
        More practice will help improve your skills!
      </span>
    `;
  }

  scoreText.innerHTML = scoreTag;

  // Update result buttons with icons
  document.querySelector('.restart-btn').innerHTML = '<i class="fas fa-redo"></i> Try Again';
  document.querySelector('.quit-result-btn').innerHTML = '<i class="fas fa-home"></i> Back to Dashboard';

  // Show result box with animation
  setTimeout(() => {
    resultBox.classList.add("active");
    createToast(toastMessage, toastType);
  }, 500);
}

// Restart quiz
document.querySelector(".restart-btn").onclick = () => {
  quizBox.classList.add("active");
  resultBox.classList.remove("active");

  // Reset variables
  timeValue = 60;
  questionCount = 0;
  questionNumber = 1;
  userScore = 0;

  // Reset UI
  showQuestion(0);
  clearInterval(counter);
  startTimer(timeValue);
  updateQuestionCounter(1);
  document.querySelector(".next-btn").classList.remove("show");
  document.querySelector(".start-btn").classList.add("hidden"); // Keep start button hidden

  // Reset progress steps
  createProgressSteps();
  const firstStep = document.querySelector('.progress-step[data-question="1"]');
  if (firstStep) {
    firstStep.classList.add('active');
  }
};

// Quit quiz
document.querySelector(".quit-result-btn").onclick = () => {
  // Show start button before redirecting
  document.querySelector(".start-btn").classList.remove("hidden");
  resultBox.classList.remove("active");
  quizBox.classList.remove("active");

  // Scroll to the start button
  document.querySelector(".start-btn").scrollIntoView({ behavior: 'smooth' });

  // Reset variables
  timeValue = 60;
  questionCount = 0;
  questionNumber = 1;
  userScore = 0;

  // Optional: Add a delay before allowing to start again
  startBtn.disabled = true;
  setTimeout(() => {
    startBtn.disabled = false;
  }, 1000);
};

// Timer function
function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time;
    time--;

    // Update progress bar
    let progressWidth = ((60 - time) / 60) * 100;
    progressFill.style.width = progressWidth + '%';

    if (time < 10) {
      timeCount.textContent = "0" + time;
    }

    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      progressFill.style.width = '100%';

      // Time's up logic
      const allOptions = optionsList.children.length;
      let correctAnswer = questions[questionCount].answer;

      for (let i = 0; i < allOptions; i++) {
        if (optionsList.children[i].querySelector("span").textContent === correctAnswer) {
          optionsList.children[i].classList.add("correct");
          optionsList.children[i].querySelector(".option-icon").classList.add("correct");
          optionsList.children[i].querySelector(".option-icon").innerHTML = '<i class="fas fa-check"></i>';
        }
      }

      for (let i = 0; i < allOptions; i++) {
        optionsList.children[i].classList.add("disabled");
      }

      document.querySelector(".next-btn").classList.add("show");
      createToast('Time\'s up!', 'warning');

      // Mark current progress step as completed
      const currentStep = document.querySelector(`.progress-step[data-question="${questionNumber}"]`);
      if (currentStep) {
        currentStep.classList.remove('active');
        currentStep.classList.add('completed');
      }
    }
  }
}

// Update question counter
function updateQuestionCounter(index) {
  const questionCounter = document.querySelector(".question-counter");
  questionCounter.innerHTML = `
    <i class="fas fa-list-ol"></i>
    Question <span>${index}</span> of <span>${questions.length}</span>
  `;
}
