// Get current logged-in user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
  alert("Please login first!");
  window.location.href = "index.html";
}
document.getElementById("user-name").textContent = currentUser.username;

// Initialize user goals
let userGoals = JSON.parse(localStorage.getItem(currentUser.email)) || [];

// Logout button
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  alert("Logged out!");
  window.location.href = "index.html";
});

// Add Goal
document.getElementById("add-goal").addEventListener("click", () => {
  const name = document.getElementById("goal-name").value.trim();
  const total = parseInt(document.getElementById("goal-total").value);

  if(!name || isNaN(total) || total <= 0){
    alert("Enter valid goal!");
    return;
  }

  const goal = {
    id: userGoals.length + 1,
    name: name,
    total: total,
    progress: 0
  };

  userGoals.push(goal);
  localStorage.setItem(currentUser.email, JSON.stringify(userGoals));
  renderGoals();

  document.getElementById("goal-name").value = "";
  document.getElementById("goal-total").value = "";
});

// Render Goals
function renderGoals(){
  const goalList = document.getElementById("goal-list");
  goalList.innerHTML = "";

  userGoals.forEach((goal, index) => {
    const container = document.createElement("div");
    container.classList.add("goal-item");

    container.innerHTML = `
      <h3>${goal.name}</h3>
      <p>Target: ${goal.total} reps</p>
      <input type="number" class="progress-input" placeholder="Enter progress">
      <button class="update-progress">Update</button>
      <div class="progress-bar"><div class="progress"></div></div>
      <p class="progress-text">Progress: ${goal.progress}%</p>
    `;

    const progressBar = container.querySelector(".progress");
    const progressText = container.querySelector(".progress-text");
    const input = container.querySelector(".progress-input");

    progressBar.style.width = goal.progress + "%";

    container.querySelector(".update-progress").addEventListener("click", () => {
      const done = parseInt(input.value);
      if(isNaN(done) || done < 0 || done > goal.total){
        alert("Enter valid progress!");
        return;
      }
      const percent = Math.min((done / goal.total) * 100, 100);
      goal.progress = Math.floor(percent);
      userGoals[index] = goal;
      localStorage.setItem(currentUser.email, JSON.stringify(userGoals));

      progressBar.style.width = percent + "%";
      progressText.textContent = `Progress: ${Math.floor(percent)}%`;

      if(percent === 100){
        container.style.boxShadow = "0 0 25px #00ff99";
        alert(`🔥 Level Up! Completed ${goal.name}`);
      }
    });

    goalList.appendChild(container);
  });
}

// Initial render
renderGoals();
