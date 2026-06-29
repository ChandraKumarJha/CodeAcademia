const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const main = document.getElementById("main");
const arrow = document.getElementById("arrow");

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
    const search = document.getElementById("searchBox");

    search.classList.toggle("justify-center");
    search.classList.toggle("px-4");
    search.classList.toggle("px-0");

    document.getElementById("searchInput")
            .classList.toggle("hidden");

});