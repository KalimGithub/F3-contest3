const form = document.getElementById("search-form")
const submitBtn = document.getElementById("submit-btn");
const currentImageContainer = document.getElementById("current-image-container");

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
    const apiKey = 'MdMioe2b6JVfkZcjKgqaFuzcq2yDEUh1kPF44yQj';
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(Response => Response.json())
    .then(data =>{
        currentImageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" />
        <p>${data.explanation}</p>
        `;
    })
    .catch(error => console.log(error));
}

function getCurrentImageOfTheDay() {
    
}