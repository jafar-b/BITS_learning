var questionText = document.getElementById("question");
var choicesContainer = document.getElementById("choices");
var nextButton = document.getElementById("next");
var scoreDisplay = document.getElementById("score");
var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.index = 0;
        this.score = 0;
        this.questions = questions;
    }
    Quiz.prototype.getQuestion = function () {
        return this.questions[this.index];
    };
    Quiz.prototype.checkAnswer = function (answer) {
        if (answer === this.getQuestion().correctAnswer) {
            this.score++;
        }
        if (this.index < this.questions.length - 1) {
            this.index++;
            displayQuestion(); // Move to next question only if available
        }
        else {
            showFinalScore(); // Showing final score when quiz ends
        }
    };
    Quiz.prototype.getScore = function () {
        return this.score;
    };
    return Quiz;
}());
var questions = [
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
var quizobj = new Quiz(questions);
function displayQuestion() {
    var currentQuestion = quizobj.getQuestion();
    questionText.innerText = currentQuestion.question;
    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.innerText = choice;
        button.addEventListener("click", function () { return quizobj.checkAnswer(choice); });
        choicesContainer.appendChild(button);
    });
}
function showFinalScore() {
    questionText.innerText = "Quiz Completed!!";
    choicesContainer.innerHTML = "Final Score : ".concat(quizobj.getScore(), " / ").concat(questions.length);
    nextButton.style.display = "none";
}
nextButton.addEventListener("click", displayQuestion);
displayQuestion();
