const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

const texts = document.querySelectorAll(".sidebar-text");

let open = false;

// Sidebar starts collapsed

toggleBtn.addEventListener("click", () => {

    open = !open;

    if(open){

        sidebar.classList.replace("w-[25%]","w-2/3");

        texts.forEach(item=>{
            item.classList.remove("hidden");
        });

        document.getElementById('modeSwitcher').classList.add("w-2/3");
        document.getElementById('modeSwitcher').classList.remove("w-[20%]");

        toggleBtn.innerHTML = ">";

    }else{

        sidebar.classList.replace("w-2/3","w-[25%]");

        texts.forEach(item=>{
            item.classList.add("hidden");
        });

        document.getElementById('modeSwitcher').classList.add("w-[20%]");
        document.getElementById('modeSwitcher').classList.remove("w-2/3");

        toggleBtn.innerHTML = "<";

    }

});

let themeToggle = document.getElementById('themeToggle');

function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  themeToggle.innerHTML = isDark
    ? "<span>&#x1F319;</span>"
    : "<span>&#9788;</span>";
}


// Set theme on page load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

updateThemeButton();

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateThemeButton();
});



