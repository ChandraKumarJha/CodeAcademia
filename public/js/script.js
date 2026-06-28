const toggleBtn = document.getElementById("themeToggle");
const main = document.getElementById("main");

function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  toggleBtn.innerHTML = isDark
    ? "<span>&#x1F319;</span>"
    : "<span>&#9788;</span>";
}


// Set theme on page load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

updateThemeButton();

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateThemeButton();
});

//adding clear search box function
let clear = document.querySelectorAll('.clear');
let searchBox = document.querySelectorAll('.searchBox');
clear.forEach(clear=>{
  clear.addEventListener('click', ()=>{
    event.preventDefault();
    searchBox.forEach(searchBox=>{
      searchBox.value = ''
    })
  });
});