// This is promting the user to enter their name
let first_name = prompt("Please enter your name");

// This ensures that the user can't leave the field empty. 
while (!first_name || first_name.trim() === "") {
    first_name = prompt("You can't leave this field empty. Please enter your name:");
}

// This displays the username in uppercase
document.getElementById("name").innerHTML = first_name.toUpperCase();

// This is a reference to the button on the html page 
const btn = document.getElementById("btn");

// This is creating an array of questions and the type and correct answer for them
const questions = [
    { question: "What colour is the sky?", answer: "blue", type: "text" },
    { question: "What is the capital of Scotland?", answer: "edinburgh", type: "text" },
    { question: "What is 5 + 5?", answer: 10, type: "number" }
];

// This is the variables to track throughout the quiz
let current_question = 0;
let user_score = 0;
let attempts = 3;

// This is adding an eventlistener to start the quiz
btn.addEventListener("click", quiz_start);

// This is the function to start the quiz
function quiz_start() {
    btn.style.display = "none";
    begin_questions();
}

// This is the that will start the quiz questions loop
function begin_questions () {
    const current = questions[current_question];
    attempts = 3;
    let user_answer;

//  This is to show it is to continue until the user no longer has any attempts of the questions left
    while (attempts > 0) {
        user_answer = prompt(current.question);

// This ensures that the field can't be left empty
        if (!user_answer || user_answer.trim() === "") {
            alert("You must enter an answer!");
            continue;
        }

// This is to ensure that when a number is required that a number is entered
    if (current.type === "number") {
        user_answer = Number(user_answer);
        if (isNaN(user_answer)) {
            alert('Please enter a number');
            continue;
        }
    } else {
        user_answer = user_answer.toLocaleLowerCase();
    }
    
// This will check the users answer against the correct answer
    const corect_answer = user_answer === current.answer;

// This part ensures that if the answer is correct that the score is increased, it moves to the next quetion and informs the user that the answer is correct. 
    if (corect_answer) {
        alert("That's Correct!");
        user_score++;
        break;
    } else { 
        attempts--;
// This informs the user of their attempts left and that the answer is incorrect but also if they run out of attempts it stops the quiz and shows them their results before running out of attempts
        if (attempts > 0) {
            alert(`Wrong! You have ${attempts} attempts left.`);
        } else {
            alert("You have had three attempts at this question, moving onto the next!");
        }
    }
}
    current_question++;
// This is to continue on the questions 
if (current_question < questions.length) {
    begin_questions();
// This part is if the questions are all done its to then start the function of showing the results
} else {
    show_results(first_name, user_score, questions.length);
}
}

// This function will check the users score and give them a message depending on their score as seen below. 
function final_score(score, total) {
    const number_score = (score / total) * 3;
    let message_score;

//This gives out an extra bit at the final message depending on what the user managed to score. If they scored a 2 then Good Job but not Perfect would show at the end
    if (number_score === 3) {
        message_score = "Fantastic Job!";
    } else if (number_score >= 2) {
        message_score = "Good Job but not perfect!";
    } else if (number_score >= 1) {
        message_score = "Hey, atleast you passed!";
    } else {
        message_score = "Better luck next time!";
    }
    return message_score;
}

// This is to show the users final score and name
function show_results(name, score, total_questions) {
//This part below will get the information from the function above on the users performance
    const message_score = final_score(score, total_questions);
    alert(`Well done ${name}, your final score is ${score} out of a total of ${total_questions}.\n${message_score}`);
}