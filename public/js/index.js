const coursesSpan = document.getElementById("courses");

coursesSpan.addEventListener("mouseenter", () => {
    document.getElementById("coursesBox").classList.add("-ml-24", "rounded-xl",
        "border", "border-slate-300", "px-8", "py-6", "bg-slate-100", "mt-18"
    );
    document.getElementById("coursesBox").classList.remove("absolute");
    coursesSpan.classList.remove("w-32", "h-12");
    //coursesSpan.classList.add("h-72");
    const mainDiv = document.createElement("div");
    mainDiv.id = "coursesOptions";
    mainDiv.innerHTML = `<div><i class="fa fa-globe" aria-hidden="true"></i> <a href="/web-dev" class="font-semibold text-2xl">Full Stack Web Development</a> <li class="font-light ml-8 mt-1">   <a href="/web-dev/html" class="hover:underline"><i class="fa-brands fa-html5 text-red-600"></i>  HTML</a> <br>  <a href="/web-dev/css"  class="hover:underline"><i class="fa-brands fa-css3-alt text-blue-500"></i>  CSS</a> <br> <a href="/web-dev/js" class="hover:underline"><i class="fa-brands fa-js text-yellow-500"></i>  JavaScript</a> <br> <a href="/web-dev/nodejs" class="hover:underline"><i class="fa-brands fa-node text-green-600"></i>  Node.js</a> <br> <a href="/web-dev/reactjs" class="hover:underline"><i class="fa-brands fa-react text-blue-500"></i>  React.js</a> <br> <a href="/web-dev/mongodb" class="hover:underline"><i class="fa-solid fa-database"></i>  Mongo DB</a>   </li> </div>`;
    mainDiv.innerHTML = `
        <div class="font-normal opacity-40">Full Stack Web Development</div>
        <div class="flex gap-3 flex-col">
        <a href="/web-dev/html" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-html5 text-red-600"></i>
                <span>HTML</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn All concepts of HTML with Code Academia</span>
        </a>
        <a href="/web-dev/css" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-css3-alt text-blue-500"></i>
                <span>CSS</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Master All concepts of Styling with Code Academia</span>
        </a>
        <a href="/web-dev/javascript" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-js text-yellow-500"></i>
                <span>JavaScript</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn All concepts of Javascript with Code Academia</span>
        </a>
        </div>
    `
    document.getElementById("coursesBox").appendChild(mainDiv);
});

coursesSpan.addEventListener("mouseleave", () => {
    coursesSpan.classList.add("w-32", "h-12");
    coursesSpan.classList.remove("h-72");
    document.getElementById("coursesBox").classList.remove("h-[225px]", "w-[450px]", "-ml-24", "rounded-xl",
        "border", "border-slate-300", "p-3"
    );
    const mainDiv = document.getElementById("coursesOptions");
    mainDiv.innerHTML = "";
    document.getElementById("coursesBox").removeChild(mainDiv);
});

const practiceSpan = document.getElementById("practice");

practiceSpan.addEventListener("mouseenter", () => {
    document.getElementById("practiceBox").classList.add("h-[225px]", "w-[450px]", "-ml-24", "rounded-xl",
        "border", "border-slate-300", "p-3"
    );
    const mainDiv = document.createElement("div");
    mainDiv.id = "practiceOptions";
    mainDiv.innerHTML = "";
    document.getElementById("practiceBox").appendChild(mainDiv);
});

practiceSpan.addEventListener("mouseleave", () => {
    document.getElementById("practiceBox").classList.remove("h-[225px]", "w-[450px]", "-ml-24", "rounded-xl",
        "border", "border-slate-300", "p-3"
    );
    const mainDiv = document.getElementById("practiceOptions");
    mainDiv.innerHTML = "";
    document.getElementById("practiceBox").removeChild(mainDiv);
});

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