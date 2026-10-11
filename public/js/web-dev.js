const sideBarBtn = document.getElementById("menu");
let sideBarOpen = false;
sideBarBtn.addEventListener("click", () => {
    if(!sideBarOpen) {
        document.getElementById("sidebar").classList.remove("hidden");
        sideBarBtn.innerHTML = '<div class="font-bold"> &#10005; </div>'
        sideBarOpen = true;
    }
    else {
        document.getElementById("sidebar").classList.add("hidden");
        sideBarBtn.innerHTML = '<hr class="w-5 h-px mb-1.75 bg-black border-none dark:bg-slate-100"><hr class="w-5 h-px mb-1.75 bg-black border-none dark:bg-slate-100"><hr class="w-5 h-px mb-1.75 bg-black border-none dark:bg-slate-100"></hr>'
        sideBarOpen = false;
    }
});