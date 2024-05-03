const searchUrl = "https://google.com/search?q=";
// Search on enter key event
function search(e) {
if (e.keyCode == 13) {
    var val = document.getElementById("search-field").value;
    window.open(searchUrl + val);
}
}
// Get current time and format
function getTime() {
let date = new Date(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    hour = date.getHours();

return (
    "" +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + sec : sec)
);
}
// Handle Weather request
function getWeather() {
let xhr = new XMLHttpRequest();
// Request to open weather map
xhr.open(
    "GET",
    "http://api.openweathermap.org/data/2.5/weather?id=3054643&units=metric&appid=e5b292ae2f9dae5f29e11499c2d82ece"
);
xhr.onload = () => {
    if (xhr.readyState === 4) {
    if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        document.getElementById("weather-description").innerHTML = json.name + " - " + json.weather[0].description;
        document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + "° C";
    } else {
        console.log("error msg: " + xhr.status);
    }
    }
};
xhr.send();
}
// Handle writing out Bookmarks
function setupBookmarks() {
const bookmarkContainer = document.getElementById("bookmark-container");
bookmarkContainer.innerHTML = bookmarks
    .map((b) => {
    const html = ["<div class='bookmark-set'>"];
    html.push(`<div class="bookmark-title">${b.title}</div>`);
    html.push('<div class="bookmark-inner-container">');
    html.push(
        ...b.links.map(
        (l) =>
            `<a class="bookmark" href="${l.url}">${l.name}</a>`
        )
    );
    html.push("</div></div>");
    return html.join("");
    })
    .join("");
}

window.onload = () => {
setupBookmarks();
getWeather();
// Set up the clock
document.getElementById("clock").innerHTML = getTime();
// Set clock interval to tick clock
setInterval(() => {
    document.getElementById("clock").innerHTML = getTime();
}, 100);
};

document.addEventListener("keyup", (event) => {
if (event.keyCode == 32) {
    // Spacebar code to open search
    document.getElementById("search").style.display = "flex";
    document.getElementById("search-field").focus();
} else if (event.keyCode == 27) {
    // Esc to close search
    document.getElementById("search-field").value = "";
    document.getElementById("search-field").blur();
    document.getElementById("search").style.display = "none";
}
});
