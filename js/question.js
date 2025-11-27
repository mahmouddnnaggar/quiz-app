import { newQ, questions } from './index.js';

const questionsContainer = document.querySelector('.questions-container');
const quizOptions = document.querySelector('#quizOptions');

export class Question {
  constructor(index) {
    this.index = index;
    this.question = questions[this.index].question;
    this.correctAnswer = questions[this.index].correct_answer;
    this.inCorrectAnswers = questions[this.index].incorrect_answers;
    // this.allAnswers = [...this.inCorrectAnswers, this.correctAnswer];
    this.allAnswers = [...this.inCorrectAnswers, this.correctAnswer].sort();
    this.category = questions[this.index].category;
    this.isAnswered = false;
  }

  displayQuestion() {
    quizOptions.classList.replace('d-flex', 'd-none');

    const content = `
      <div class="question p-4 rounded-3 d-flex flex-column gap-4">
    <div class="w-100 d-flex justify-content-between align-items-center mb-2">
      <span class="btn btn-category">${this.category}</span>
      <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    }</span>
    </div>
    <h2 class="text-capitalize h3 text-center mb-0">${this.question}</h2>
    <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center gap-3 justify-content-center">
    ${this.allAnswers.map(ans => `<li>${ans}</li>`).join('')}
    </ul>
    <div class="text-center mt-2">
      <h2 class="score-color h4 fw-bold mb-0">
        <i class="bi bi-emoji-laughing me-2"></i>Score: ${newQ.score}
      </h2>
    </div>
  </div>
      `;
    questionsContainer.innerHTML = content;

    const allChoices = document.querySelectorAll('.choices li');

    allChoices.forEach(choice => {
      choice.addEventListener('click', e => {
        this.checkAnswer(e);
      });
    });
  }

  checkAnswer(e) {
    if (!this.isAnswered) {
      this.isAnswered = true;

      const selected = e.target.innerHTML;
      console.log(selected);
      if (selected.toLowerCase() === this.correctAnswer.toLowerCase()) {
        e.target.classList.add(
          'correct',
          'animate__animated',
          'animate__flipInY'
        );
        newQ.score++;
      } else {
        e.target.classList.add('wrong', 'animate__animated', 'animate__shakeX');
      }
    }

    this.nextQuestion();
  }

  nextQuestion() {
    this.index++;

    if (this.index < questions.length) {
      setTimeout(() => {
        const newQuestion = new Question(this.index);
        newQuestion.displayQuestion();
      }, 1200);
    } else {
      newQ.endQuiz();
    }
  }
}
