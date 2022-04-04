// Var with array and object for questions
var questions = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<scripting>", "<javascrip>", "<script>"],
    answer: "<script>",
  },
  {
    title: "JavaScript is a ___ -side programming language.",
    choices: ["Client", "Server", "Both", "None"],
    answer: "Both",
  },
  {
    title: "How do you find the minimum of x and y using JavaScript?",
    choices: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", " min(xy);"],
    answer: "Math.min(x,y)",
  },
  {
    title:
      "Which JavaScript label catches all the values, except for the ones specified?",
    choices: ["catch", "label", "try", "default"],
    answer: "default",
  },
  {
    title:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
];
// Declared variables
var score = 0;
var questionIndex = 0;

// Start working code
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question:
var secondsLeft = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
  // We are checking zero because its originally set to zero
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// Renders questions and choices to page:
function render(questionIndex) {
  // Clears existing data
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  // For loops to loop through all info in array
  for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }
  // New for each for question choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
// Event to compare choices with answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    // Correct condition
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent =
        "Correct! The answer is:  " + questions[questionIndex].answer;
      // Correct condition
    } else {
      // Will deduct -5 seconds off secondsLeft for wrong answers
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }
  }
  // Question Index determines number question user is on
  questionIndex++;

  if (questionIndex >= questions.length) {
    // All done will append last page with user stats
    allDone();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}
// All done will append last page
function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // Heading:
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsDiv.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  // Calculates time remaining and replaces it with score
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsDiv.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);
}
