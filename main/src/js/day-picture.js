import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu, setActiveByText } from "./menu.js";
import { convertToJson } from "./external-services.js";
import { dayPictureTemplate } from "./json-hendler.js"



const baseURL = "https://api.nasa.gov/planetary/apod?date=api_key=DEMO_KEY" 

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
    setActiveByText('Picture of the Day');
});

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const description = document.getElementById("date").value;

    try {
        searchImage(description);
    } catch {
        searchNotFound(description);
    }
});

const currentDate = new Date().toISOString().slice(0, 10);
        
document.querySelector('#date').value = currentDate;


async function searchImage(date) {
    document.querySelector('.error-message').innerHTML = "";
    const element = document.querySelector('.day-picture-container');
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=xASSlKoxMIn6RTO7VuJLtSzpunRqbD3nJqaEvwdo`);

    if (response.status != 400) {
        const data = await convertToJson(response);
        console.log(data)
    
        const html = dayPictureTemplate(data);

        console.log(html);
        element.innerHTML = html;
    } else {
        searchNotFound(date);
    }
  }

function searchNotFound(date) {
    const message = document.createElement('p');
    message.textContent = `No results found for Date: "${date}".`;
    message.style.color = 'red';
    message.style.fontWeight = 'bold';

    document.querySelector(".day-picture-container").innerHTML = '';
    const searchResultsContainer = document.querySelector('.error-message');
    searchResultsContainer.appendChild(message);
}

 await searchImage(currentDate);