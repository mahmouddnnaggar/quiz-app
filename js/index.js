import { Question } from './question.js';
import { Quiz } from './quiz.js';

// ^ States
export let questions = [];
export let newQ;

// ^ HTML Elements
const categoryInput = document.querySelector('#categoryMenu');
const difficultyInput = document.querySelector('#difficultyOptions');
const numberOfQsInput = document.querySelector('#questionsNumber');

document.querySelector('button').addEventListener('click', async function () {
  const category = categoryInput.value;
  const difficulty = difficultyInput.value;
  const questionsCount = numberOfQsInput.value;

  newQ = new Quiz(difficulty, questionsCount, category);
  questions = await newQ.getQuestions();

  const firstQuestion = new Question(0);
  firstQuestion.displayQuestion();

  console.log(firstQuestion);
});
