export class Quiz {
  constructor(difficultyLevel, numberOfQuestions, category) {
    this.difficultyLevel = difficultyLevel;
    this.numberOfQuestions = numberOfQuestions;
    this.category = category;
    this.score = 0;
  }

  async getQuestions() {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}&difficulty=${this.difficultyLevel}`
    );
    const questions = await res.json();

    console.log(questions.results);
    return questions.results;
  }

  endQuiz() {
    setTimeout(() => {
      document.querySelector('.questions-container').classList.add('d-none');
      document.querySelector('.quiz-card').innerHTML = `
      <div class="text-center finish-screen">
        <i class="bi bi-trophy-fill congrats-icon mb-3 d-block"></i>
        <h2 class="mb-4 fw-bold">Quiz Completed!</h2>
        <div class="score-display mb-5">
          <span class="text-muted text-uppercase fw-bold small ls-1">Your Score</span>
          <div class="finish-score display-1 fw-bold my-2">${this.score}</div>
        </div>
        <button id="playAgain" class="btn btn-start w-50 py-3 shadow-sm">Play Again</button>
      </div>
    `;

      document
        .querySelector('#playAgain')
        .addEventListener('click', function () {
          window.location.reload();
        });
    }, 1200);
  }
}
