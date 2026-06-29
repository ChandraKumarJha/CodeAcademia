const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const main = document.getElementById("main");
const arrow = document.getElementById("arrow");
const searchInput = document.getElementById("searchInput");
const searchBox = document.getElementById("searchBox");

let collapsed = false;

toggleBtn.addEventListener("click", () => {

    collapsed = !collapsed;

    // Sidebar Width
    sidebar.classList.toggle("w-72");
    sidebar.classList.toggle("w-24");

    // Main Content Margin
    main.classList.toggle("ml-72");
    main.classList.toggle("ml-24");

    // Move Button
    toggleBtn.classList.toggle("left-[270px]");
    toggleBtn.classList.toggle("left-[72px]");

    // Rotate Arrow
    arrow.classList.toggle("rotate-180");

    // Hide/Show Text
    document.querySelectorAll(".sidebar-text").forEach(el=>{
        el.classList.toggle("hidden");
    });

    // Center Everything
    document.querySelectorAll(".sidebar-item").forEach(item=>{
        item.classList.toggle("justify-center");
        item.classList.toggle("gap-4");
    });

    // Search Box
    if (collapsed) {
        searchInput.classList.add("hidden");
        searchBox.classList.remove("px-4");
        searchBox.classList.add("justify-center", "w-14", "h-14");
    } else {
        searchInput.classList.remove("hidden");
    
        searchBox.classList.remove("justify-center", "w-14", "h-14");
        searchBox.classList.add("px-4");
    }

});

let themeToggle = document.getElementById('themeToggle');

function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  themeToggle.innerHTML = isDark
    ? "<span>&#x1F319; Dark</span>"
    : "<span>&#9788; Light</span>";
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



