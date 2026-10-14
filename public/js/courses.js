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

function makeCard(course, level, category, heading, paragraph, href) {
    const card = document.createElement("article");

    card.className = `
        group relative flex flex-col min-w-0 h-full
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
        inline-flex items-center rounded-full
        px-3 py-1 text-xs font-medium
        bg-indigo-50 text-indigo-700
        dark:bg-indigo-500/10 dark:text-indigo-300
    `;
    categoryBadge.textContent = category;

    badges.append(levelBadge, categoryBadge);
    top.appendChild(badges);

    // Course title
    const title = document.createElement("h2");

    title.className = `
        text-xl sm:text-2xl font-bold tracking-tight
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
        const localhostURI = "http://localhost:3000";
        const websiteURI = "https://code-academia-swyj.onrender.com";
        const response = await fetch(`${localhostURI}/me`) || await fetch(`${websiteURI}/me`);

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

function loadWindow() {
    loadUserData();
    const cardGrid = document.getElementById("cardGrid");
    const htmlCard = makeCard(
        "HTML", 
        "Beginner", 
        "Web Development", 
        "HTML Fundamentals", 
        "Learn the building block and basics of web and create websites form scratch.", 
        "/courses/web-dev/html"
    );
    cardGrid.appendChild(htmlCard);
    const cssCard = makeCard(
        "CSS", 
        "Beginner", 
        "Web Development", 
        "CSS Fundamentals", 
        "Learn to build responsive, beautiful, advanced styled websites form scratch.", 
        "/courses/web-dev/css"
    );
    cardGrid.appendChild(cssCard);
    const jsCard = makeCard(
        "JavaScript", 
        "Beginner", 
        "Web Development", 
        "JavaScript essentials", 
        "Understand JavaScript from basics to advanced concepts and make your web app interactive.", 
        "/courses/web-dev/js"
    );
    cardGrid.appendChild(jsCard);
    const reactJsCard = makeCard(
        "React.js", 
        "Intermediate", 
        "React", 
        "React from Scratch", 
        "Build modern dynamic user interface with React.Learn componenets, hooks, state managemenet and more.", 
        "/courses/react"
    );
    cardGrid.appendChild(reactJsCard);
    const nodeCard = makeCard(
        "Node.js", 
        "Intermediate", 
        "Backend(Node.js)", 
        "Node.js & Express.js Backend Development", 
        "Build powerfull REST APIs and Server-side applications with Node.js and Express.js.", 
        "/courses/nodejs"
    );
    cardGrid.appendChild(nodeCard);
    const mongodbCard = makeCard(
        "MongoDB",
        "Beginner",
        "Database",
        "MongoDB Database",
        "Learn how to work with MongoDB, understand databases, collections and queries.",
        "/courses/mongodb"
    );
    cardGrid.appendChild(mongodbCard);
    const mernCard = makeCard(
        "MERN",
        "Intermediate",
        "MERN",
        "Full Stack Web Development(MERN)",
        "Combine everything you have learned and build a complete Full-Stack Web application in CodeVision.",
        "/practice/mern"
    );
    cardGrid.appendChild(mernCard);
    const gitCard = makeCard(
        "Git",
        "Beginner",
        "Git & Github",
        "Git & Github Essentials",
        "Master Version Control and collaborate effectively with Git and Github.",
        "/courses/git-github"
    );
    cardGrid.appendChild(gitCard);
    const tailwindCard = makeCard(
        "Tailwind",
        "Intermediate",
        "Tailwind CSS",
        "Tailwind CSS for Modern UI",
        "Build stunning, responsive designs faster with Tailwind CSS.",
        "/courses/tailwindcss"
    );
    cardGrid.appendChild(tailwindCard);
    const pyhonCard = makeCard(
        "Python",
        "Beginner",
        "Python",
        "Python for beginners",
        "Start your Python journey with real examples, exercise and mini projects.",
        "/courses/python"
    );
    cardGrid.appendChild(pyhonCard);
    const cppCard = makeCard(
        "cpp",
        "Intermediate",
        "Data Structures & Algorithms",
        "DSA in C++",
        "Learn core C++ concepts, OOP, Data Structures & Algorithms and build real time applications.",
        "/courses/dsa"
    );
    cardGrid.appendChild(cppCard);
}

window.onload = loadWindow;