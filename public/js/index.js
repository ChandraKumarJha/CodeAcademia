const coursesSpan = document.getElementById("courses");

coursesSpan.addEventListener("mouseenter", () => {
    document.getElementById("coursesBox").classList.add("-ml-24", "rounded-xl",
        "border", "border-slate-300", "px-8", "py-6", "bg-slate-100", "dark:bg-slate-950", "mt-17"
    );
    document.getElementById("coursesBox").classList.remove("hidden");
    coursesSpan.classList.remove("w-32", "h-12");
    //coursesSpan.classList.add("h-72");
    const mainDiv = document.createElement("div");
    mainDiv.id = "coursesOptions";
    mainDiv.classList.add("w-[600px]", "flex", "gap-3");
    mainDiv.innerHTML = `
    <div>
        <div class="font-normal opacity-40">Full Stack Web Development</div>
        <div class="flex gap-3 flex-col">
        <a href="/web-dev/html" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-html5 text-red-600"></i>
                <span>HTML</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn All concepts of HTML with Code Academia</span>
        </a>
        <a href="/web-dev/css" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-css3-alt text-blue-500"></i>
                <span>CSS</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Master All concepts of Styling with Code Academia</span>
        </a>
        <a href="/web-dev/javascript" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-js text-yellow-500"></i>
                <span>JavaScript</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn All concepts of Javascript with Code Academia</span>
        </a>
        </div>
    </div>
    <div>
        <div class="flex gap-3 flex-col">
        <a href="/web-dev/nodejs" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-node text-green-600"></i>
                <span>Node.js</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn server making in Node.js with Code Academia</span>
        </a>
        <a href="/web-dev/reactjs" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative">
                <i class="fa-brands fa-react text-sky-600"></i>
                <span>React.js</span>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn UI making in React.js with Code Academia</span>
        </a>
        <a href="/web-dev/mongodb" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative ">
                <div class="flex gap-2">
                    <div class="h-6 w-6 rounded-full border border-slate-300 flex items-center justify-center">
                        <svg xmlns="http://w3.org" viewBox="0 0 20 20" width="20" height="20">
                          <path d="M10 1 C7.6 4.4 5 9 5 12.4 C5 15.6 7 19 10 19 Z" fill="#118D4F" />
                          <path d="M10 1 C12.4 4.4 15 9 15 12.4 C15 15.6 13 19 10 19 Z" fill="#13AA52" />
                          <path d="M10 3 L10 17" stroke="#49C778" stroke-width="0.8" stroke-linecap="round" />
                        </svg>
                    </div>
                    <span>Mongo DB</span>
                    <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
                </div>
            </div>
            <span class="text-sm font-normal opacity-40">Learn server making in Node.js with Code Academia</span>
        </a>
        </div>
    </div>
    `
    document.getElementById("coursesBox").appendChild(mainDiv);
});

coursesSpan.addEventListener("mouseleave", () => {
    coursesSpan.classList.add("w-32", "h-12");
    coursesSpan.classList.remove("h-72");
    document.getElementById("coursesBox").classList.remove("-ml-24", "rounded-xl",
        "border", "border-slate-300", "px-8", "py-6", "bg-slate-100", "dark:bg-slate-950", "mt-18"
    );
    const mainDiv = document.getElementById("coursesOptions");
    mainDiv.innerHTML = "";
    document.getElementById("coursesBox").classList.add("hidden");
    document.getElementById("coursesBox").removeChild(mainDiv);
});

const practiceWrapper = document.getElementById("practice");
const practiceBox = document.getElementById("practiceBox");

practiceWrapper.addEventListener("pointerenter", () => {
    practiceBox.classList.remove("hidden");
    practiceBox.classList.add("flex", "flex-col");
});

practiceWrapper.addEventListener("pointerleave", () => {
    practiceBox.classList.remove("flex", "flex-col");
    practiceBox.classList.add("hidden");
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