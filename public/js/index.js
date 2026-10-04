const coursesSpan = document.getElementById("courses");

coursesSpan.addEventListener("mouseenter", () => {
    document.getElementById("coursesBox").classList.add("h-[225px]", "w-[450px]", "-ml-24", "rounded-xl",
        "border", "border-slate-300", "p-3"
    );
    const mainDiv = document.createElement("div");
    mainDiv.id = "coursesOptions";
    mainDiv.innerHTML = '<div><i class="fa fa-globe" aria-hidden="true"></i> <a href="/web-dev" class="font-semibold text-2xl">Full Stack Web Development</a> <li class="font-light ml-8 mt-1">   <a href="/web-dev/html" class="hover:underline"><i class="fa-brands fa-html5 text-red-600"></i>  HTML</a> <br>  <a href="/web-dev/css"  class="hover:underline"><i class="fa-brands fa-css3-alt text-blue-500"></i>  CSS</a> <br> <a href="/web-dev/js" class="hover:underline"><i class="fa-brands fa-js text-yellow-500"></i>  JavaScript</a> <br> <a href="/web-dev/nodejs" class="hover:underline"><i class="fa-brands fa-node text-green-600"></i>  Node.js</a> <br> <a href="/web-dev/reactjs" class="hover:underline"><i class="fa-brands fa-react text-blue-500"></i>  React.js</a> <br> <a href="/web-dev/mongodb" class="hover:underline"><i class="fa-solid fa-database"></i>  Mongo DB</a>   </li> </div>';
    document.getElementById("coursesBox").appendChild(mainDiv);
});

coursesSpan.addEventListener("mouseleave", () => {
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