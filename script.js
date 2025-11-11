// Modal
const modal = document.getElementById("auth-modal");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const closeBtn = document.querySelector(".close");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Open modal
loginBtn.onclick = () => { modal.style.display="flex"; loginForm.style.display="block"; registerForm.style.display="none"; }
signupBtn.onclick = () => { modal.style.display="flex"; loginForm.style.display="none"; registerForm.style.display="block"; }
closeBtn.onclick = () => { modal.style.display="none"; }
window.onclick = e => { if(e.target==modal){ modal.style.display="none"; } }

// LocalStorage Users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Register
document.getElementById("register-submit").onclick = () => {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if(!username || !email || !password){
    alert("All fields are required!");
    return;
  }

  // Check if email already exists
  if(users.some(u => u.email === email)){
    alert("Email already registered!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign Up Successful! Please login.");
  modal.style.display="none";
}

// Login
document.getElementById("login-submit").onclick = () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const user = users.find(u => u.email === email && u.password === password);
  if(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Welcome ${user.username}!`);
    modal.style.display="none";
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password!");
  }
}

// Get Started button
document.getElementById("get-started").onclick = () => {
  // Simulate clicking the Sign Up button
  document.getElementById("signup-btn").click();
};
