const userLogo = document.getElementById("user-logo");
const userBox = document.getElementById("user");

function makeLogo(course) {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add("flex", "justify-center", "min-h-10");
    if(course.toLowerCase() === 'html') {
        logoDiv.innerHTML = `
        <i class="fa-brands fa-html5 text-red-500 text-3xl"></i>
        `
        return logoDiv;
    }
    else if(course.toLowerCase() === 'css') {
        logoDiv.innerHTML = `
        <i class="fa-brands fa-css3-alt text-blue-500 text-3xl"></i>
        `
        return logoDiv;
    }
    else if(course.toLowerCase() === 'javascript') {
        logoDiv.innerHTML = `
        <i class="fa-brands fa-js text-yellow-500 text-3xl"></i>
        `
        return logoDiv;
    }
    else if(course.toLowerCase() === 'react.js') {
        logoDiv.innerHTML = `
        <i class="fa-brands fa-react text-sky-500 text-3xl"></i>
        `
        return logoDiv;
    }

    return logoDiv;
}

function makeCard(course ,level, category, heading, paragraph, href) {
    const card = document.createElement('div');
    card.classList.add("card", "p-4", "border", "border-gray-600/30", "dark:bg-sky-950/5", "rounded-xl", "relative", "flex", "items-center", "flex-col");
    const cardLogo = makeLogo(course);
    card.innerHTML = `
    <div class="mb-2 flex gap-3">
        <span class="px-2 py-1 bg-green-600 rounded-full">${level}</span>
        <span class="px-2 py-1 bg-indigo-600 rounded-full">${category}</span>
    </div>
    <h2 class="text-2xl font-semibold">${heading}</h2>
    <p class="opacity-50">${paragraph}</p><br>>
    <a href="${href}" class="px-5 py-2 rounded-xl flex items-center justify-center absolute bottom-4 bg-linear-to-r from-indigo-500 to-sky-600">View Course →</a>
    `
    card.prepend(cardLogo);
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
    const htmlCard = makeCard("HTML", "Beginner", "Web Development", "HTML Fundamentals", "Learn the building block and basics of web and create websites form scratch.", "/courses/web-dev/html");
    document.getElementById("cardGrid").appendChild(htmlCard);
    const cssCard = makeCard("CSS", "Beginner", "Web Development", "CSS Fundamentals", "Learn to build responsive, beautiful, advanced styled websites form scratch.", "/courses/web-dev/css");
    document.getElementById("cardGrid").appendChild(cssCard);
    const jsCard = makeCard("JavaScript", "Beginner", "Web Development", "JavaScript essentials", "Understand JavaScript from basics to advanced concepts and make your web app interactive.", "/courses/web-dev/js");
    document.getElementById("cardGrid").appendChild(jsCard);
    const reactJsCard = makeCard("React.js", "Intermediate", "React", "React from Scratch", "Build modern dynamic user interface with React.Learn componenets, hooks, state managemenet and more.", "/courses/react");
    document.getElementById("cardGrid").appendChild(reactJsCard);
}

window.onload = loadWindow;