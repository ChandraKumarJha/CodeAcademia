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
    mainDiv.classList.add("w-[400px]", "flex", "gap-3");
    mainDiv.innerHTML = `
    <div class="flex flex-col gap-3">
        <div class="font-normal opacity-40">Explore Courses in Code Academia</div>
        <a href="/courses/web-development" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div class="relative flex items-center gap-2">
                <span>MERN Stack</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="78" height="20" viewBox="0 0 78 20" role="img" aria-labelledby="title">
                  <title id="title">MERN Stack</title>

                  <!-- Tailwind bg-slate-100 equivalent hex (#F1F5F9) -->
                  <rect width="78" height="20" rx="4" fill="transparent"/>

                  <!-- M - MongoDB-inspired leaf -->
                  <path d="M8 3.2C5.3 6.3 4.4 8.5 5.3 11.5c.5 1.8 1.6 3 2.7 4.1 1.1-1.1 2.2-2.3 2.7-4.1C11.6 8.5 10.7 6.3 8 3.2Z" fill="#13AA52"/>
                  <path d="M8 5.2v11" stroke="#8BE3A8" stroke-width=".65" stroke-linecap="round"/>

                  <!-- E - Express (Adjusted for high contrast on light bg) -->
                  <circle cx="28" cy="10" r="7" fill="#1E293B" stroke="#475569" stroke-width=".7"/>
                  <text x="28" y="12.3" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.2" font-weight="700" fill="#FFFFFF">ex</text>

                  <!-- R - React (Darkened background fill slightly to stand out against light slate) -->
                  <circle cx="47" cy="10" r="7.5" fill="#0F172A" opacity="0.08"/>
                  <g transform="translate(47 10)" fill="none" stroke="#0088CC" stroke-width="1.05">
                    <ellipse rx="7.2" ry="2.8"/>
                    <ellipse rx="7.2" ry="2.8" transform="rotate(60)"/>
                    <ellipse rx="7.2" ry="2.8" transform="rotate(120)"/>
                  </g>
                  <circle cx="47" cy="10" r="1.2" fill="#0088CC"/>

                  <!-- N - Node.js (Darkened text fill for crisp legibility) -->
                  <path d="M64 6.1 69 3.2 74 6.1v7.1L69 16l-5-2.8Z" fill="none" stroke="#336633" stroke-width="1.2" stroke-linejoin="round"/>
                  <text x="69" y="12.2" text-anchor="middle" font-family="Arial,sans-serif" font-size="5.4" font-weight="700" fill="#224422">JS</text>
                </svg>
                <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
            </div>
            <span class="text-sm font-normal opacity-40">Learn Full Stack Web Development with Code Academia</span>
        </a>

        <a href="/courses/git-github" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div>
                <div class="relative flex items-center gap-2">
                    <span>Git & Github</span>
                    <img src="/images/git.png" class="h-5"/>
                    <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
                </div>
                <span class="text-sm font-normal opacity-40">Learn How to organise your code with Git & Github</span>
            </div>
        </a>
        <a href="/courses/python" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div>
                <div class="relative flex items-center gap-2">
                    <span>Python Development</span>
                    <img src="/images/python.png" class="h-5 bg-transparent"/>
                    <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
                </div>
                <span class="text-sm font-normal opacity-40">Learn Beginner to Advance Python concepts with Code Academia</span>
            </div>
        </a>
        <a href="/courses/dsa" class="px-6 py-4 flex flex-col rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-slate-400 group transition-colors duration-100 ease-in">
            <div>
                <div class="relative flex items-center gap-2">
                    <span>Data Structures & Algorithms</span>
                    <img src="/images/cpp.png" class="h-5"/>
                    <span class="group-hover:inline hidden text-sky-700 absolute right-0">&gt;</span>
                </div>
                <span class="text-sm font-normal opacity-40">Learn Full Data Structures and Algorithms in C++</span>
            </div>
        </a>
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