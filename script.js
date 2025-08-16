//your JS code here.
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreContainer = document.getElementById("score");
let userAnswers = new Array(5).fill(undefined);

//progress preservations is completed: excellent

questionsElement.addEventListener("click", (event) => {
  const targetElement = event.target;
  if (targetElement.tagName === "INPUT" && targetElement.checked === true) {
    const answer = targetElement.value;
    const indexOfQuesiton = parseInt(targetElement.name.split("-")[1]);
    userAnswers.splice(indexOfQuesiton, 1, answer);
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

//when page refreshes rerender the questions : done

//for the first time the following code (line:19-25) will not render
//questions as there will be nothing in session storage

document.addEventListener("DOMContentLoaded", () => {
  questionsElement.innerHTML = "";
  if (sessionStorage.getItem("progress")) {
    userAnswers = JSON.parse(sessionStorage.getItem("progress"));
  }
  const score = localStorage.getItem("score");
  if (score) scoreContainer.textContent = `Your score is ${score} out of 5.`;
  renderQuestions();
});

//calculation of score
//only when user clicks submit

submitButton.addEventListener("click", () => {
  let count = 0;
  if (sessionStorage.getItem("progress")) {
    const answers = JSON.parse(sessionStorage.getItem("progress"));
    answers.forEach((answer, index) => {
      if (answer && questions[index].answer === answer) {
        count++;
      }
    });
  }
  localStorage.setItem("score", count);
  scoreContainer.textContent = `Your score is ${count} out of 5.`;
});
// Do not change code below this line
// This code will just display the questions to the screen

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
    questionsElement.appendChild(document.createElement("br"));
  }
}
