const questions = [
    {
      emailTemplate: `
        <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
          <h3 style="color: #007bff;">Welcome to Our Newsletter!</h3>
          <p>Dear Customer,</p>
          <p>We are excited to announce our latest offer! Click the link below to claim your discount.</p>
          <a href="http://example.com" style="color: #007bff;" class="email-link">Claim your offer now</a>
          <p>Best regards, <br> The Team</p>
        </div>`,
      correct: false,
      feedback: "This email is fake! Look at the sender's address and the generic message."
    },
    {
      emailTemplate: `
        <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
          <h3 style="color: #28a745;">Your Invoice is Ready</h3>
          <p>Dear John Doe,</p>
          <p>Your payment of $150.00 has been processed successfully. Find your invoice below.</p>
          <a href="http://example.com/invoice" style="color: #007bff;" class="email-link">Download Invoice</a>
          <p>Best regards, <br> Company Name</p>
        </div>`,
      correct: true,
      feedback: "This email is real! The invoice link is legitimate and formatted professionally."
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
    document.getElementById("email-template-container").innerHTML = questionData.emailTemplate;
    document.getElementById("question").textContent = `Question ${currentQuestion + 1}: Is this email real or fake?`;
  
    // Update the "Next Question" button to "Result" if on the last question
    const nextButton = document.querySelector("#feedback button");
    if (currentQuestion === questions.length - 1) {
      nextButton.textContent = "Result";
    } else {
      nextButton.textContent = "Next Question";
    }
  
    // Add event listener for links inside the email template
    const links = document.querySelectorAll('.email-link');
    links.forEach(link => {
      link.addEventListener('click', displayLinkUrl);
    });
  }
  
  function displayLinkUrl(event) {
    // Prevent the default link behavior (e.g., redirecting the user)
    event.preventDefault();
  
    // Get the destination URL of the clicked link
    const linkUrl = event.target.href;
  
    // Display the link URL in the bottom-left corner
    const linkUrlDisplay = document.getElementById("link-url");
    linkUrlDisplay.textContent = `This link would go to: ${linkUrl}`;
    linkUrlDisplay.style.display = "block";
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
  
