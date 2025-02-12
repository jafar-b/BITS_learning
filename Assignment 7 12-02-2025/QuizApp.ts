const questionText = document.getElementById(
  "question"
) as HTMLParagraphElement;
const choicesContainer = document.getElementById("choices") as HTMLDivElement;
const nextButton = document.getElementById("next") as HTMLButtonElement;
const scoreDisplay = document.getElementById("score") as HTMLParagraphElement;

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

class Quiz {
  private questions: Question[];
  private index: number = 0;
  private score: number = 0;

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  getQuestion(): Question {
    return this.questions[this.index];
  }

  checkAnswer(answer: string): void {
    if (answer === this.getQuestion().correctAnswer) {
      this.score++;
    }
    if (this.index < this.questions.length - 1) {
      this.index++;
      displayQuestion(); // Move to next question only if available
    } else {
      showFinalScore(); // Showing final score when quiz ends
    }
  }

  getScore(): number {
    return this.score;
  }
}

const questions: Question[] = [
  {
    question: "Who is prime minister of India?",
    choices: ["Modi", "Nehru"],
    correctAnswer: "Modi",
  },
  {
    question: "What are you learning currently?",
    choices: ["Java", "Typescript"],
    correctAnswer: "Typescript",
  },
  {
    question: "Which language gives you type safety?",
    choices: ["JavaScript", "Typescript"],
    correctAnswer: "Typescript",
  },
];

const quizobj = new Quiz(questions);

function displayQuestion(): void {
  const currentQuestion = quizobj.getQuestion();
  questionText.innerText = currentQuestion.question;
  choicesContainer.innerHTML = "";

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.addEventListener("click", () => quizobj.checkAnswer(choice));
    choicesContainer.appendChild(button);
  });
}

function showFinalScore(): void {
  questionText.innerText = "Quiz Completed!!";
  choicesContainer.innerHTML = `Final Score : ${quizobj.getScore()} / ${questions.length}`;
  nextButton.style.display = "none";
}

nextButton.addEventListener("click", displayQuestion);
displayQuestion();
