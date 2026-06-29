const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const main = document.getElementById("main");
const arrow = document.getElementById("arrow");

let collapsed = false;

toggleBtn.addEventListener("click", () => {

    collapsed = !collapsed;

    if (collapsed) {

        sidebar.classList.replace("w-72", "w-20");

        main.classList.replace("ml-72", "ml-20");

        toggleBtn.classList.replace("left-[270px]", "left-[55px]");

        arrow.classList.replace("ri-arrow-left-s-line", "ri-arrow-right-s-line");

        sidebar.querySelectorAll("span,p,h1,input").forEach(e=>{
            e.classList.add("hidden");
        });

        sidebar.querySelectorAll("a").forEach(link=>{
            link.classList.add("justify-center");
        });

    } else {

        sidebar.classList.replace("w-20", "w-72");

        main.classList.replace("ml-20", "ml-72");

        toggleBtn.classList.replace("left-[55px]", "left-[270px]");

        arrow.classList.replace("ri-arrow-right-s-line", "ri-arrow-left-s-line");

        sidebar.querySelectorAll("span,p,h1,input").forEach(e=>{
            e.classList.remove("hidden");
        });

        sidebar.querySelectorAll("a").forEach(link=>{
            link.classList.remove("justify-center");
        });

    }

});