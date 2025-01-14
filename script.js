const questions = [
    {
      image: "https://prophish-uploads.s3.ap-south-1.amazonaws.com/Wallpapers//Aditya%20Birla%20Capital%20Banner%20Image_page-0001%20%283%29.jpg",
      correct: false,
      feedback: "This email is fake! Look at the sender's address and grammar."
    },
    {
      image: "images/sample-email2.jpg",
      correct: true,
      feedback: "This email is real. Notice the professional formatting."
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function startQuiz(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    const email = document.getElementById("email").value;
  
    if (email) {
      // Hide the email form and show the quiz
      document.getElementById("email-form-container").style.display = "none";
      document.getElementById("quiz").style.display = "block";
      loadQuestion();
    }
  }
  
  function loadQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById("email-image").src = questionData.image;
    document.getElementById("question").textContent = `Question ${currentQuestion + 1}: Is this email real or fake?`;
  
    // Update the "Next Question" button to "Result" if on the last question
    const nextButton = document.querySelector("#feedback button");
    if (currentQuestion === questions.length - 1) {
      nextButton.textContent = "Result";
    } else {
      nextButton.textContent = "Next Question";
    }
  }
  
  function checkAnswer(isReal) {
    const questionData = questions[currentQuestion];
    const feedbackText = isReal === questionData.correct
      ? "Correct! " + questionData.feedback
      : "Incorrect. " + questionData.feedback;
    
    if (isReal === questionData.correct) {
      score++;
    }
  
    document.getElementById("feedback-text").textContent = feedbackText;
    document.getElementById("question-container").style.display = "none";
    document.getElementById("feedback").style.display = "block";
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
      document.getElementById("feedback").style.display = "none";
      document.getElementById("question-container").style.display = "block";
    } else {
      document.getElementById("feedback").style.display = "none";
      document.getElementById("end-screen").style.display = "block";
      document.getElementById("score").textContent = score;
      document.getElementById("total-questions").textContent = questions.length;
    }
  }
  
  window.onload = () => {
    // Ensure the quiz starts with the email form visible
    document.getElementById("email-form-container").style.display = "block";
    document.getElementById("quiz").style.display = "none";
  };
  