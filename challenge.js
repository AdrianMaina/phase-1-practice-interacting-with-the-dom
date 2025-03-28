// Select necessary DOM elements
const counter = document.getElementById("counter");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const likesList = document.querySelector(".likes");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("list");

// Timer functionality
let count = 0;
let isPaused = false;
let interval = setInterval(incrementCounter, 1000); // Start counter

function incrementCounter() {
  if (!isPaused) {
    count++;
    counter.textContent = count;
  }
}

// Increment & Decrement counter manually
plusButton.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});

minusButton.addEventListener("click", () => {
  count--;
  counter.textContent = count;
});

// Like functionality
const likes = {};

heartButton.addEventListener("click", () => {
  if (!likes[count]) {
    likes[count] = 1;
    const likeItem = document.createElement("li");
    likeItem.dataset.num = count;
    likeItem.innerHTML = `❤️ ${count} has been liked <span>1</span> time`;
    likesList.appendChild(likeItem);
  } else {
    likes[count]++;
    document.querySelector(`[data-num="${count}"] span`).textContent = `${likes[count]} times`;
  }
});

// Pause & Resume functionality
pauseButton.addEventListener("click", () => {
  if (isPaused) {
    interval = setInterval(incrementCounter, 1000); // Restart timer
    pauseButton.textContent = "pause";
    toggleButtons(false);
  } else {
    clearInterval(interval); // Stop timer
    pauseButton.textContent = "resume";
    toggleButtons(true);
  }
  isPaused = !isPaused;
});

// Helper function to enable/disable buttons
function toggleButtons(disabled) {
  plusButton.disabled = disabled;
  minusButton.disabled = disabled;
  heartButton.disabled = disabled;
}

// Comment functionality
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentText = commentInput.value.trim();
  if (commentText !== "") {
    const commentItem = document.createElement("p");
    commentItem.textContent = commentText;
    commentList.appendChild(commentItem);
    commentInput.value = ""; // Clear input
  }
});
