const apiKey = 'MdMioe2b6JVfkZcjKgqaFuzcq2yDEUh1kPF44yQj';
const form = document.getElementById("search-form")
const submitBtn = document.getElementById("submit-btn");
const currentImageContainer = document.getElementById("current-image-container");
const searchInput = document.getElementById("search-input");
const searchHistory = document.getElementById("search-history");

submitBtn.addEventListener("click", (event) => {
    console.log(event.target);
    event.preventDefault();
    const serachInput = document.getElementById("search-input");
    const selectedDate = serachInput.value;
    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});


getCurrentImageOfTheDay();

function getImageOfTheDay(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
        .then(Response => Response.json())
        .then(data => {
            currentImageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" />
        <p>${data.explanation}</p>
        `;
            saveSearch(date);
        })
        .catch(error => console.log(error));
}

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
        .then(Response => Response.json())
        .then(data => {
            currentImageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" />
        <p>${data.explanation}</p>
        `;
            searchInput.value = currentDate;
        })
        .catch(error => console.log(error));
}


function saveSearch(date) {
    let search = JSON.parse(localStorage.getItem('search')) || [];
    search.push(date);
    localStorage.setItem('search', JSON.stringify(search));

    addSearchToHistory(date);
}

function addSearchToHistory(date) {
    const searchItem = document.createElement('li');
    searchItem.innerText = date;

    searchItem.addEventListener("click", () => {
        getImageOfTheDay(date);
    })
    searchHistory.appendChild(searchItem);
};
