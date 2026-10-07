const form = document.getElementById("loginForm");
const emailInp = document.getElementById("email");
const passwordInp = document.getElementById("password");
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const email = emailInp.value.trim();
  const password = passwordInp.value;
  const messageDiv = document.getElementById('responseMessage');

  let valid = true;

  if (!email) {
    setError(emailError, "Please enter your email address.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError(emailError, "Please enter a valid email address.");
    valid = false;
  }

  if (!password) {
    setError(passwordError, "Please enter your password.");
    valid = false;
  } else if (password.length < 6) {
    setError(passwordError, "Password must contain at least 6 characters.");
    valid = false;
  }

  if (!valid) return;

  if (remember.checked) {
    localStorage.setItem("codeAcademiaEmail", email);
  } else {
    localStorage.removeItem("codeAcademiaEmail");
  }

  try {
    const response = await fetch('/form/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Telling Express we are sending JSON
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    
    if (response.ok) {
      messageDiv.style.color = 'green';
      messageDiv.textContent = result.message;
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = result.error || 'Something went wrong.';
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Server connection failed.';
  }
});

document.getElementById("forgotBtn").addEventListener("click", () => {
  window.location.href = "/signup/forgot-password";
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