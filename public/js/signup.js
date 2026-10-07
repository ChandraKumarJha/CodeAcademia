const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const remember = document.getElementById("remember");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const toast = document.getElementById("toast");

const savedEmail = localStorage.getItem("codeAcademiaEmail");

if (savedEmail) {
  email.value = savedEmail;
  remember.checked = true;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function setError(element, message) {
  element.textContent = message;
  element.classList.remove("hidden");
}

function clearErrors() {
  emailError.classList.add("hidden");
  passwordError.classList.add("hidden");
}

togglePassword.addEventListener("click", () => {
  const isPassword = password.type === "password";

  password.type = isPassword ? "text" : "password";
  togglePassword.setAttribute(
    "aria-label",
    isPassword ? "Hide password" : "Show password"
  );

  eyeIcon.innerHTML = isPassword
    ? `<path d="m3 3 18 18"></path>
       <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"></path>
       <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a17.8 17.8 0 0 1-3.1 3.8"></path>
       <path d="M6.6 6.6C4 8.2 2.5 12 2.5 12S6 19 12 19a9.6 9.6 0 0 0 4.1-.9"></path>`
    : `<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"></path>
       <circle cx="12" cy="12" r="2.5"></circle>`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const emailValue = email.value.trim();
  const passwordValue = password.value;

  let valid = true;

  if (!emailValue) {
    setError(emailError, "Please enter your email address.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    setError(emailError, "Please enter a valid email address.");
    valid = false;
  }

  if (!passwordValue) {
    setError(passwordError, "Please enter your password.");
    valid = false;
  } else if (passwordValue.length < 6) {
    setError(passwordError, "Password must contain at least 6 characters.");
    valid = false;
  }

  if (!valid) return;

  if (remember.checked) {
    localStorage.setItem("codeAcademiaEmail", emailValue);
  } else {
    localStorage.removeItem("codeAcademiaEmail");
  }

  window.location.href = "/form/signin";
});

document.getElementById("forgotBtn").addEventListener("click", () => {
  showToast("Password reset flow can be connected here.");
});

document.getElementById("googleBtn").addEventListener("click", () => {
  window.location.href = "/auth/google";
});

document.getElementById("signinBtn").addEventListener("click", () => {
  window.location.href = "/signin";
});

// Small UX improvement: remove an error as the user fixes the field.
email.addEventListener("input", () => emailError.classList.add("hidden"));
password.addEventListener("input", () => passwordError.classList.add("hidden"));