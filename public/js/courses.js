const userLogo = document.getElementById("user-logo");
const userBox = document.getElementById("user");

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

window.onload = loadUserData;