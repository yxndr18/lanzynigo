const questions = [
  {
    type: "id",
    question: "Who is my favorite person?",
    answer: "you",
    reward: "" // add later
  },
  {
    type: "mc",
    question: "Which color do I love the most?",
    options: ["Pink", "Blue", "Black"],
    answer: "Pink",
    reward: ""
  }
];

let index = 0;

// SHUFFLE
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

let shuffled = shuffle([...questions]);

function showQuestion() {
  const q = shuffled[index];
  document.getElementById("question").textContent = q.question;
  document.getElementById("feedback").textContent = "";
  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  if (q.type === "id") {
    answers.innerHTML = `
      <input id="textAnswer" placeholder="Type your answer">
      <br>
      <button onclick="checkID()">Submit</button>
    `;
  } else {
    q.options.forEach(opt => {
      answers.innerHTML += `<button onclick="checkMC('${opt}')">${opt}</button>`;
    });
  }
}

function checkID() {
  const val = document.getElementById("textAnswer").value.trim().toLowerCase();
  if (val === shuffled[index].answer.toLowerCase()) {
    openReward();
  } else {
    document.getElementById("feedback").textContent = "That’s not quite right.";
  }
}

function checkMC(choice) {
  if (choice === shuffled[index].answer) {
    openReward();
  } else {
    document.getElementById("feedback").textContent = "That’s not quite right.";
  }
}

function openReward() {
  const modal = document.getElementById("rewardModal");
  const content = document.getElementById("rewardContent");
  content.innerHTML = `
    <div style="color:white;font-size:18px;text-align:center;">
      Reward will appear here 🤍
    </div>
  `;
  modal.style.display = "flex";
}

function closeReward() {
  document.getElementById("rewardModal").style.display = "none";
  index++;

  if (index >= shuffled.length) {
    shuffled = shuffle([...questions]);
    index = 0;
  }

  showQuestion();
}

showQuestion();
