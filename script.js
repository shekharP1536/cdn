//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
var username = document.getElementById("user_name");
atteneded();
// If username is not found in localStorage, prompt for username
let user = localStorage.getItem("username");
// localStorage.setItem("attended", "already");
if (user) {
  document.getElementById("user_name").value = user;
  user = "user";
}

let sec = "genai_q";
let generated_id = sec + user;
// if startQuiz button clicked
start_btn.onclick = (event) => {
  event.preventDefault(); // Prevents the default action

  var username = document.getElementById("user_name").value;
  console.log("clicked");
  console.log(username);

  if (username) {
    // Check if username has a value
    localStorage.setItem("username", username); // Save it for future use
    info_box.classList.add("activeInfo"); // Show info box
  } else {
    alert("Please enter a your name");
  }
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuestions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(60); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
};

let timeValue = 60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// const restart_quiz = result_box.querySelector(".buttons .restart");
// const quit_quiz = result_box.querySelector(".buttons .quit");
// let selectedAnswer;
// let currentQuestionIndex = 1; // Example: Get the current question index (you can dynamically get it)
// let questionText = questions[currentQuestionIndex].question;  // Get the current question text

// // Assume `optionSelected` gets triggered when the user selects an option
// function optionSelected(selectedOption) {
//     selectedAnswer = selectedOption.innerText;  // Get the selected option's text
//     sendAnswerToAPI(username, questionText, selectedAnswer);
// }

// if restartQuiz button clicked
// restart_quiz.onclick = () => {
//   quiz_box.classList.add("activeQuiz"); //show quiz box
//   result_box.classList.remove("activeResult"); //hide result box
//   timeValue = 60;
//   que_count = 0;
//   que_numb = 1;
//   userScore = 0;
//   widthValue = 0;
//   showQuestions(que_count); //calling showQestions function
//   queCounter(que_numb); //passing que_numb value to queCounter
//   clearInterval(counter); //clear counter
//   clearInterval(counterLine); //clear counterLine
//   startTimer(timeValue); //calling startTimer function
//   startTimerLine(widthValue); //calling startTimerLine function
//   timeText.textContent = "Time Left"; //change the text of timeText to Time Left
//   next_btn.classList.remove("show"); //hide the next button
// };

// if quitQuiz button clicked
// quit_quiz.onclick = () => {
//   window.location.reload(); //reload the current window
// };

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

// getting questions and options from array
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");

  // Creating a new span for the question and adding the question text
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";

  // Adding an image if the question object has an 'image' property
  let image_tag = "";
  if (questions[index].image) {
    image_tag =
      '<img src="' +
      questions[index].image +
      '" alt="Question Image" class="question-image">';
  }

  // Creating option tags for each option
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>";

  // Combine the question text and image, and insert it into the que_text element
  que_text.innerHTML = que_tag + image_tag;
  option_list.innerHTML = option_tag; // Adding options to the option list

  // Set the onclick attribute to all available options
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  localStorage.setItem("attended", "already");
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  // let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  username = localStorage.getItem("username");
  console.log(username);
  // console.log(userAns);
  data = {
    id: generated_id,
    username: username,
    question_number: que_count,
    user_ans: userAns,
    user_score: userScore,
  };
  sendPostRequest(data);
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}
function sendPostRequest(data) {
  fetch("php/response.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Convert data to JSON format
  })
    .then((response) => response.json()) // Assume the server responds with JSON
    .then((data) => {
      console.log("Success:", data); // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors
    });
}
function showResult() {
  info_box.classList.remove("activeInfo"); // Hide info box
  quiz_box.classList.remove("activeQuiz"); // Hide quiz box
  result_box.classList.add("activeResult"); // Show result box

  const scoreText = result_box.querySelector(".score_text");
  let scoreTag;

  if (userScore > 3) {
    // If user scored more than 3
    scoreTag = `
      <span>and congrats! 🎉, You attended <span>${userScore}</span> out of <span>${questions.length}</span></span>
    `;
  } else if (userScore > 1) {
    // If user scored more than 1
    scoreTag = `
      <span>and nice 😎, You attended <span>${userScore}</span> out of <span>${questions.length}</span></span>
    `;
  } else {
    // If user scored 1 or less
    scoreTag = `
      <span>and sorry 😐, You attended only <span>${userScore}</span> out of <span>${questions.length}</span></span>
    `;
  }

  scoreText.innerHTML = scoreTag; // Adding the constructed scoreTag to scoreText
}


function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 112);
  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 549) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}
function atteneded() {
  data = localStorage.getItem("attended");
  console.log(data);
  if (data){
    alert("You already attended this Quiz so can't attend again. ");
    document.body.innerHTML = '<div class="waring"><p class="warning">You already attended this quize so can\'t attend it again</p></div>';

  }
}
function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
