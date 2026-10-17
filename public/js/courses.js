const userLogo = document.getElementById("user-logo");
const userBox = document.getElementById("user");

function makeLogo(course) {
    const logoDiv = document.createElement("div");

    const icons = {
        html: {
            icon: "fa-html5",
            color: "text-red-600 dark:text-red-400",
            background: "bg-red-100 dark:bg-red-500/15"
        },
        css: {
            icon: "fa-css3-alt",
            color: "text-blue-600 dark:text-blue-400",
            background: "bg-blue-100 dark:bg-blue-500/15"
        },
        javascript: {
            icon: "fa-js",
            color: "text-yellow-600 dark:text-yellow-400",
            background: "bg-yellow-100 dark:bg-yellow-500/15"
        },
        "react.js": {
            icon: "fa-react",
            color: "text-sky-600 dark:text-sky-400",
            background: "bg-sky-100 dark:bg-sky-500/15"
        },
        "node.js": {
            icon: "fa-node",
            color: "text-green-600 dark:text-green-400",
            background: "bg-green-100 dark:bg-green-500/15"
        },
        mongodb: {
            icon: "fa-database",
            color: "text-sky-500 dark:text-sky-300",
            background: "bg-sky-100 dark:bg-sky-400/15"
        },
        mern: {
            icon: "fa-layer-group",
            color: "text-slate-700 dark:text-white",
            background: "bg-slate-100 dark:bg-violet-500"
        },
        tailwind: {
            icon: "fa-tailwind-css",
            color: "text-blue-600 dark:text-blue-400",
            background: "bg-blue-100 dark:bg-blue-500/15"
        },
        git: {
            background: "bg-orange-100 dark:bg-orange-500/15"
        },
        cpp: {
            background: "bg-blue-100 dark:bg-sky-500/15"
        },
        python: {
            background: "bg-blue-100 dark:bg-blue-500/15"
        }
    };

    const config = icons[course.toLowerCase()];

    if (!config) return logoDiv;

    if(course.toLowerCase() === 'mongodb' || course.toLowerCase() === 'mern') {
        logoDiv.innerHTML = `
        <i class="fa-solid ${config.icon} ${config.color} text-3xl"
           aria-hidden="true"></i>`;
    }
    else if(course.toLowerCase() === 'cpp') {
        logoDiv.innerHTML = `
        <img src="/images/cpp.png" alt="C++" class="h-10"/>`;
    }
    else if(course.toLowerCase() === 'python') {
        logoDiv.innerHTML = `
        <img src="/images/python.png" alt="Python" class="h-10"/>`;
    }
    else if(course.toLowerCase() === 'git') {
        logoDiv.innerHTML = `
        <img src="/images/git.png" alt="Git" class="h-10"/>`;
    }
    else {
        logoDiv.innerHTML = `
        <i class="fa-brands ${config.icon} ${config.color} text-3xl"
           aria-hidden="true"></i>`;
    }
    
    logoDiv.className = `
        w-14 h-14 shrink-0 rounded-2xl
        flex items-center justify-center
        ${config.background}
        `;


    return logoDiv;
}

function makeCard(category, course, level, langCategory, heading, paragraph, href) {
    const card = document.createElement("article");

    card.className = `
        courseCard group relative flex flex-col min-w-0 h-full
        p-5 sm:p-6
        rounded-2xl
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900/70
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-slate-900/5
        dark:hover:shadow-black/20
        hover:border-sky-400 dark:hover:border-sky-700
    `;
    card.dataset.category = category.trim().toLowerCase();
    card.dataset.level = level.trim().toLowerCase();

    const cardLogo = makeLogo(course);

    const levelColors = {
        beginner: `
            bg-emerald-50 text-emerald-700
            dark:bg-emerald-500/10 dark:text-emerald-400
        `,
        intermediate: `
            bg-amber-50 text-amber-700
            dark:bg-amber-500/10 dark:text-amber-400
        `,
        advanced: `
            bg-rose-50 text-rose-700
            dark:bg-rose-500/10 dark:text-rose-400
        `
    };

    const levelClass =
        levelColors[level.toLowerCase()] ||
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

    // Top section: icon and badges
    const top = document.createElement("div");

    top.className = `
        flex flex-col gap-4 mb-5
        sm:flex-row sm:items-start sm:justify-between
    `;

    top.appendChild(cardLogo);

    const badges = document.createElement("div");

    badges.className = "flex flex-wrap items-center gap-2";

    const levelBadge = document.createElement("span");
    levelBadge.className = `
        inline-flex items-center rounded-full
        px-3 py-1 text-xs font-semibold
        ${levelClass}
    `;
    levelBadge.textContent = level;

    const categoryBadge = document.createElement("span");
    categoryBadge.className = `
        cardCategory inline-flex items-center rounded-full
        px-3 py-1 text-xs font-medium
        bg-indigo-50 text-indigo-700
        dark:bg-indigo-500/10 dark:text-indigo-300
    `;
    categoryBadge.textContent = langCategory;

    const categories = document.createElement("span");
    categories.innerText = category;
    categories.classList.add("sr-only", "categories");
    badges.append(levelBadge, categoryBadge, categories);
    top.appendChild(badges);

    // Course title
    const title = document.createElement("h2");

    title.className = `
        courseTitle text-xl sm:text-2xl font-bold tracking-tight
        text-slate-900 dark:text-white
        mb-3
        group-hover:text-sky-700
        dark:group-hover:text-sky-400
        transition-colors duration-200
    `;

    title.textContent = heading;

    // Course description
    const description = document.createElement("p");

    description.className = `
        text-sm sm:text-base leading-7
        text-slate-600 dark:text-slate-400
        mb-6
    `;

    description.textContent = paragraph;

    // Course button
    const link = document.createElement("a");

    link.href = href;

    link.className = `
        mt-auto w-full
        inline-flex items-center justify-center gap-2
        rounded-xl px-4 py-3
        font-semibold text-sm text-white
        bg-gradient-to-r from-indigo-600 to-sky-500
        hover:from-indigo-700 hover:to-sky-600
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-sky-500
        focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-slate-900
        transition-all duration-200
    `;

    link.innerHTML = `
        <span>Explore Course</span>
        <i class="fa-solid fa-arrow-right transition-transform
                  duration-200 group-hover:translate-x-1"
           aria-hidden="true"></i>
    `;

    // Assemble the card
    card.append(top, title, description, link);

    return card;
}

async function loadUserData() {
    try {
        const websiteURI = "https://code-academia-swyj.onrender.com";
        const localhostURI = 'http://localhost:3000';
        const response = await fetch(`${websiteURI}/me`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parses the response body as JSON
        userBox.innerText = data.username;
        userLogo.style.backgroundColor = data.userLogoBG;
        userLogo.innerText = data.username[0];
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

async function loadWindow() {
    loadUserData();
    const cardGrid = document.getElementById("cardGrid");
    const htmlCard = makeCard(
        "Web Development" ,
        "HTML", 
        "Beginner", 
        "Web Development", 
        "HTML Fundamentals", 
        "Learn the building block and basics of web and create websites form scratch.", 
        "/courses/web-dev/html"
    );
    cardGrid.appendChild(htmlCard);
    const cssCard = makeCard(
        "Web Development" ,
        "CSS", 
        "Beginner", 
        "Web Development", 
        "CSS Fundamentals", 
        "Learn to build responsive, beautiful, advanced styled websites form scratch.", 
        "/courses/web-dev/css"
    );
    cardGrid.appendChild(cssCard);
    const tailwindCard = makeCard(
        "Web Development" ,
        "Tailwind",
        "Intermediate",
        "Web Development",
        "Tailwind CSS for Modern UI",
        "Build stunning, responsive designs faster with Tailwind CSS.",
        "/courses/tailwindcss"
    );
    cardGrid.appendChild(tailwindCard);
    const jsCard = makeCard(
        "Web Development" ,
        "JavaScript", 
        "Beginner", 
        "Web Development", 
        "JavaScript essentials", 
        "Understand JavaScript from basics to advanced concepts and make your web app interactive.", 
        "/courses/web-dev/js"
    );
    cardGrid.appendChild(jsCard);
    const jsLibrariesCard = makeCard(
        "Web Development" ,
        "JavaScript", 
        "Advanced", 
        "Web Development", 
        "JavaScript Libraries & Advanced topics", 
        "Understand JavaScript Libraries - where to use, how to use, and make web applications superb. Also, master all concepts of JavaScript.", 
        "/courses/web-dev/js-libraries"
    );
    cardGrid.appendChild(jsLibrariesCard);
    const reactJsCard = makeCard(
        "Web Development" ,
        "React.js", 
        "Intermediate", 
        "React", 
        "React from Scratch", 
        "Build modern dynamic user interface with React.Learn componenets, hooks, state managemenet and more.", 
        "/courses/react"
    );
    cardGrid.appendChild(reactJsCard);
    const nodeCard = makeCard(
        "Database & Server" ,
        "Node.js", 
        "Intermediate", 
        "Server", 
        "Node.js & Express.js Backend Development", 
        "Build powerfull REST APIs and Server-side applications with Node.js and Express.js.", 
        "/courses/nodejs"
    );
    cardGrid.appendChild(nodeCard);
    const mongodbCard = makeCard(
        "Database & Server" ,
        "MongoDB",
        "Beginner",
        "Database",
        "MongoDB Database",
        "Learn how to work with MongoDB, understand databases, collections and queries and how to integrate with JavaScript.",
        "/courses/mongodb"
    );
    cardGrid.appendChild(mongodbCard);
    const mernCard = makeCard(
        "Web Development" ,
        "MERN",
        "Intermediate",
        "Web Development",
        "Full Stack Web Development(MERN)",
        "Combine everything you have learned and build a complete Full-Stack Web application in CodeVision.",
        "/practice/mern"
    );
    cardGrid.appendChild(mernCard);
    const gitCard = makeCard(
        "Others" ,
        "Git",
        "Beginner",
        "Git Github",
        "Git & Github Essentials",
        "Master Version Control and collaborate effectively with Git and Github.",
        "/courses/git-github"
    );
    cardGrid.appendChild(gitCard);
    const pyhonCard = makeCard(
        "Programming Languages" ,
        "Python",
        "Beginner",
        "Python",
        "Python basics for beginners",
        "Start your Python journey with real examples and mini projects.",
        "/courses/python/"
    );
    cardGrid.appendChild(pyhonCard);
    const pyhonDSACard = makeCard(
        "Programming Languages" ,
        "Python",
        "Intermediate",
        "Python",
        "Data Structures & Algorithms in Python",
        "Master Data Structures & Algorithms in Python and build real time AI- ML, Data Science applcations.",
        "/courses/python/dsa"
    );
    cardGrid.appendChild(pyhonDSACard);
    const pyhonAdvCard = makeCard(
        "Programming Languages" ,
        "Python",
        "Advanced",
        "Python",
        "Advanced Python concepts",
        "Learn Metaprogramming, Concurrency, Database programming in Python with Code Academia.",
        "/courses/python/advanced"
    );
    cardGrid.appendChild(pyhonAdvCard);
    const cppCard = makeCard(
        "Programming Languages" ,
        "cpp",
        "Beginner",
        "C++",
        "Basics of C++",
        "Learn core C++ concepts, OOP and build real time applications.",
        "/courses/cpp/"
    );
    cardGrid.appendChild(cppCard);
    const cppDSACard = makeCard(
        "Programming Languages" ,
        "cpp",
        "Intermediate",
        "C++",
        "Data Structures & Algorithms in C++",
        "Master Data Structures & Algorithms in C++ and build real time applcations.",
        "/courses/cpp/dsa"
    );
    cardGrid.appendChild(cppDSACard);
    const cppAdvCard = makeCard(
        "Programming Languages" ,
        "cpp",
        "Advanced",
        "C++",
        "Advanced Concepts in C++",
        "Learn Memory Management, Metaprogramming, Concurrency & Parallelism in C++ with Code Academia.",
        "/courses/cpp/advanced"
    );
    cardGrid.appendChild(cppAdvCard);
    const localhostURI = 'http://localhost:3000';
    const webURI = 'https://code-academia-swyj.onrender.com';
    const category = await fetch(`${localhostURI}/courses/category`);
    const result = await category.text();
    if (result === 'All') return; 
    const cardCaregories = document.querySelectorAll('.cardCategory');
    cardCaregories.forEach(category => {
        if (category.textContent !== result) {
            category.parentElement.parentElement.parentElement.classList.add("hidden");
        }
    });
    document.querySelectorAll(".category").forEach(span => {
        span.innerText = result;
    })
    
}


const menuBtn = document.getElementById("menu");
// 1. One-time setup: Inject content once so it's always ready to expand/collapse
const menuEle = document.getElementById("mobileSideBar");
menuEle.innerHTML = `
<div class="p-3 flex flex-col h-full min-w-75">
    <div class="flex flex-col gap-4">
        <p class="">Explore</p>
        <button class="flex gap-3">
            <div class="h-5 w-5 relative flex flex-col">
                <div class="h-2.25 w-2.25 border-[1.5px] border-slate-800 dark:border-slate-100 rounded-xs absolute top-0 left-0"></div>
                <div class="h-2.25 w-2.25 border-[1.5px] border-slate-800 dark:border-slate-100 rounded-xs absolute bottom-0 left-0"></div>
                <div class="h-2.25 w-2.25 border-[1.5px] border-slate-800 dark:border-slate-100 rounded-xs absolute top-0 right-0"></div>
                <div class="h-2.25 w-2.25 border-[1.5px] border-slate-800 dark:border-slate-100 rounded-xs absolute bottom-0 right-0"></div>
            </div>
            <span>All Courses</span>
        </button>
        <button class="flex gap-3">
            <i class="fa-solid fa-book-open"></i>
            <span>My Learning</span>
        </button>
        <button class="flex gap-3">
            <i class="fa-solid fa-award"></i>
            <span>Certificates</span>
        </button>
    </div>
    <div class="flex items-center justify-center">
        <div class="mt-3 mb-3 w-11/12 h-px bg-gray-600/30 dark:bg-gray-600/30"></div>
    </div>
    <div class="flex flex-col gap-2">
        <p class="text-lg font-semibold tracking-wide">Filters</p>
        <legend>Categories</legend>
        <div class="flex flex-col gap-1">
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="web-dev peer sr-only" />
                <span class="flex h-5 w-5 items-center justify-center rounded-md 
                bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
                peer-checked:border-0
                transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="3"
                        class="h-3.5 w-3.5" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                    </svg>
                </span>
                <pre class="font-mono check"> Web Development</pre>
            </label>
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="database-server peer sr-only" />
                <span class="flex h-5 w-5 items-center justify-center rounded-md 
                bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
                peer-checked:border-0
                transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="3"
                        class="h-3.5 w-3.5" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                    </svg>
                </span>
                <pre class="font-mono check"> Database & Server</pre>
            </label>
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="programming-language peer sr-only" />
                <span class="flex h-5 w-5 items-center justify-center rounded-md 
                bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
                peer-checked:border-0
                transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="3"
                        class="h-3.5 w-3.5" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                    </svg>
                </span>
                <pre class="font-mono check"> Programming Languages</pre>
            </label>
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="others peer sr-only" />
                <span class="flex h-5 w-5 items-center justify-center rounded-md 
                bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
                peer-checked:border-0
                transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="3"
                        class="h-3.5 w-3.5" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                    </svg>
                </span>
                <pre class="font-mono check"> Others</pre>
            </label>
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="all-filters peer sr-only" checked/>
                <span class="flex h-5 w-5 items-center justify-center rounded-md 
                bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
                peer-checked:border-0
                transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="3"
                        class="h-3.5 w-3.5" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                    </svg>
                </span>
                <pre class="font-mono check"> All</pre>
            </label>
        </div>
    </div>
    <div class="flex items-center justify-center">
        <div class="mt-4 mb-3 w-11/12 h-px bg-gray-600/30 dark:bg-gray-600/30"></div>
    </div>
    <div class="flex flex-col gap-3">
        <p class="text-lg font-semibold tracking-wide">Level</p>
        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="peer sr-only" id="beginner"/>
            <span class="flex h-5 w-5 items-center justify-center rounded-md 
            bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
            peer-checked:border-0
            transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="3"
                    class="h-3.5 w-3.5" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                </svg>
            </span>
            <pre class="font-mono check"> Beginner</pre>
        </label>
        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="peer sr-only" id="inermediate"/>
            <span class="flex h-5 w-5 items-center justify-center rounded-md 
            bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
            peer-checked:border-0
            transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="3"
                    class="h-3.5 w-3.5" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                </svg>
            </span>
            <pre class="font-mono check"> Inermediate</pre>
        </label>
        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="peer sr-only" id="advanced"/>
            <span class="flex h-5 w-5 items-center justify-center rounded-md 
            bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
            peer-checked:border-0
            transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="3"
                    class="h-3.5 w-3.5" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                </svg>
            </span>
            <pre class="font-mono check"> Advanced</pre>
        </label>
        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="peer sr-only" id="all-level" checked/>
            <span class="flex h-5 w-5 items-center justify-center rounded-md 
            bg-transparent border border-slate-800 dark:border-slate-100 text-transparent peer-checked:bg-blue-500 peer-checked:text-white
            peer-checked:border-0
            transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="3"
                    class="h-3.5 w-3.5" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12.5 9.5 17 19 7" />
                </svg>
            </span>
            <pre class="font-mono check"> All</pre>
        </label>
    </div>
</div>`;

let menuOpen = false;

function createMenuBar() {
    const mainContent = document.getElementById("mainContent");

    if (!menuOpen) {
        mainContent.classList.add("hidden");
        
        // Remove closed width state and add the expanded target width class
        menuEle.classList.remove("w-0");
        menuEle.classList.add("w-64"); 
        
        menuOpen = true;
    } else {
        
        // Transition width back to zero cleanly without wiping inner HTML strings
        menuEle.classList.remove("w-64");
        menuEle.classList.add("w-0");
        setTimeout(() => {
            mainContent.classList.remove("hidden");
        }, 250);
        
        menuOpen = false;
    }
}

menuBtn.addEventListener("click", createMenuBar);

function initialiseCourseFilters() {
    const cardGrid = document.getElementById("cardGrid");

    if (!cardGrid) return;

    const mobileSidebar = document.getElementById("mobileSideBar");

    // Find category and level controls in both sidebars.
    function getCategoryFilters() {
        return document.querySelectorAll(".category-filter");
    }

    function getLevelFilters() {
        return document.querySelectorAll(".level-filter");
    }

    function getCategoryAllFilters() {
        return document.querySelectorAll(".category-all");
    }

    function getLevelAllFilters() {
        return document.querySelectorAll(".level-all");
    }

    // Get selected categories.
    function getSelectedCategories() {
        return [...getCategoryFilters()]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());
    }

    // Get selected levels.
    function getSelectedLevels() {
        return [...getLevelFilters()]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());
    }

    // Apply category and level filters together.
    function applyFilters() {
        const selectedCategories = getSelectedCategories();
        const selectedLevels = getSelectedLevels();

        const cards = cardGrid.querySelectorAll("article");

        cards.forEach(card => {
            const cardCategory = (
                card.dataset.category || ""
            ).trim().toLowerCase();

            const cardLevel = (
                card.dataset.level || ""
            ).trim().toLowerCase();

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(cardCategory);

            const matchesLevel =
                selectedLevels.length === 0 ||
                selectedLevels.includes(cardLevel);

            // Both conditions must be satisfied.
            card.classList.toggle(
                "hidden",
                !(matchesCategory && matchesLevel)
            );
            const visibleCount = [...cards].filter(
                card => !card.classList.contains("hidden")
            ).length;
            
            const courseCount = document.getElementById("courseCount");
            
            if (courseCount) {
                courseCount.textContent =
                    `Showing ${visibleCount} course${visibleCount !== 1 ? "s" : ""}`;
            }
        });
    }

    // Keep the All checkbox synchronized with selections.
    function syncAllCheckboxes() {
        const categoryCheckboxes = [...getCategoryFilters()];
        const levelCheckboxes = [...getLevelFilters()];

        const selectedCategories = categoryCheckboxes.filter(
            checkbox => checkbox.checked
        );

        const selectedLevels = levelCheckboxes.filter(
            checkbox => checkbox.checked
        );

        // All is checked when no individual filter is selected.
        getCategoryAllFilters().forEach(checkbox => {
            checkbox.checked = selectedCategories.length === 0;
        });

        getLevelAllFilters().forEach(checkbox => {
            checkbox.checked = selectedLevels.length === 0;
        });
    }

    // Handle category selections.
    function handleCategoryChange(event) {
        const checkbox = event.target;

        if (checkbox.classList.contains("category-all")) {
            if (checkbox.checked) {
                getCategoryFilters().forEach(filter => {
                    filter.checked = false;
                });
            } else {
                // Prevent an empty selection from behaving unexpectedly.
                checkbox.checked = true;
            }
        } else {
            // Selecting an individual category unchecks All.
            if (checkbox.checked) {
                getCategoryAllFilters().forEach(all => {
                    all.checked = false;
                });
            }
        }

        syncAllCheckboxes();
        applyFilters();
    }

    // Handle level selections.
    function handleLevelChange(event) {
        const checkbox = event.target;

        if (checkbox.classList.contains("level-all")) {
            if (checkbox.checked) {
                getLevelFilters().forEach(filter => {
                    filter.checked = false;
                });
            } else {
                checkbox.checked = true;
            }
        } else {
            if (checkbox.checked) {
                getLevelAllFilters().forEach(all => {
                    all.checked = false;
                });
            }
        }

        syncAllCheckboxes();
        applyFilters();
    }

    // Event delegation also supports dynamically created mobile controls.
    document.addEventListener("change", event => {
        if (
            event.target.matches(".category-filter, .category-all")
        ) {
            handleCategoryChange(event);
        }

        if (
            event.target.matches(".level-filter, .level-all")
        ) {
            handleLevelChange(event);
        }
    });

    // Initial state.
    syncAllCheckboxes();
    applyFilters();
}

// Run after the course cards have been created.
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialiseCourseFilters
    );
} else {
    initialiseCourseFilters();
}

const searchForms = document.querySelectorAll(".searchCourses");
const searchInputs = document.querySelectorAll(".searchInp");


function searchCourses(query) {
    const searchTerm = query.trim().toLowerCase();
    let visibleCourses = 0;
    const courseCards = document.querySelectorAll(".courseCard");
    

    courseCards.forEach(card => {
        const title = card.querySelector(".courseTitle").textContent;

        if (!title) return;

        // Search by course title, technology, or other card content
        const matches = title.toLocaleLowerCase().includes(searchTerm);

        card.classList.toggle("hidden", !matches);

        if (matches) {
            visibleCourses++;
        }
    });

    // Display a message when no courses match
    let noResults = document.querySelector("#noCoursesFound");

    if (!noResults) {
        noResults = document.createElement("p");
        noResults.id = "noCoursesFound";
        noResults.className =
            "col-span-full text-center text-gray-500 dark:text-gray-400 py-10";

        const courseContainer = document.querySelector("#coursesContainer");

        if (courseContainer) {
            courseContainer.appendChild(noResults);
        }
    }

    if (noResults) {
        noResults.textContent = searchTerm
            ? `No courses found for "${query.trim()}".`
            : "";

        noResults.classList.toggle(
            "hidden",
            !searchTerm || visibleCourses > 0
        );
    }
}

// Handle desktop and mobile search forms
searchForms.forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        

        const input = form.querySelector(".searchInp");

        if (!input) return;

        // Synchronize all search inputs
        searchInputs.forEach(inp => {
            inp.value = input.value;
        });

        searchCourses(input.value);
    });
});

// Optional: search dynamically while typing
searchInputs.forEach(input => {
    input.addEventListener("input", () => {
        searchInputs.forEach(inp => {
            if (inp !== input) {
                inp.value = input.value;
            }
        });

        searchCourses(input.value);
    });
});

window.addEventListener("load", () => {
    loadWindow();
    initialiseCourseFilters();
});