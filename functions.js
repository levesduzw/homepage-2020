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
        "" + (hour < 10 ? "0" + hour : hour) +
        ":" + (min < 10 ? "0" + min : min) +
        ":" + (sec < 10 ? "0" + sec : sec)
    );
}

// Handle Weather request
function getWeather() {
    let xhr = new XMLHttpRequest();
    // Request to open weather map
    xhr.open(
        "GET",
        "http://api.openweathermap.org/data/2.5/weather?id=4737316&units=imperial&appid=e5b292ae2f9dae5f29e11499c2d82ece"
    );
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                document.getElementById("temp").innerHTML =
                    json.main.temp.toFixed(0) + " F";
                document.getElementById("weather-description").innerHTML =
                    json.weather[0].description;
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
    bookmarkContainer.innerHTML = bookmarks    // bookmarks are written to the page
        .map((b) => {
            const html = ["<div class='bookmark-set'>"];
            html.push(`<div class="bookmark-title-container">`);
            html.push(`<div class="bookmark-title">${b.title}</div>`);
            html.push(`<a class="bookmark-open-all" href="test"><img src="external-link-line.svg"></img></a>`);
            html.push(`</div>`);
            html.push('<div class="bookmark-inner-container">');
            html.push(
                ...b.links.map(
                    (l) =>
                        `<a class="bookmark" href="${l.url}" target="_blank">${l.name}</a>`
                )
            );
            html.push("</div></div>");
            return html.join("");
        })
        .join("");
}

// Set random wallpaper on page load
const wallpaperPath = '/home/esrmlvn/Pictures/Wallpapers/';
function setRandomWallpaper() {
    var images = [
        "0lOe7Ei.png",
        "2veek29rath51.jpg",
        "beach_sea_waves_145932_3840x2160.jpg",
        "DI3Oxg8.jpg",
        "o6CEpAb.jpg",
        "PVfXvuI.png",
        "wallpapersden.com_minimalist-black-digital-blend_2560x1440.jpg"
    ]
    randomWallpaperPath = wallpaperPath + images[Math.floor(Math.random() * images.length)];
    console.log(randomWallpaperPath);
    document.getElementById("container").style.backgroundImage = "url('" + randomWallpaperPath + "')";
}

window.onload = () => {
    setupBookmarks();
    getWeather();
    setRandomWallpaper();
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