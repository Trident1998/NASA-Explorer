import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu, setActiveByText } from "./menu.js";
import { convertToJson } from "./external-services.js";
import { imageLibraryCardTemplate } from "./json-hendler.js"

const baseURL = "https://images-api.nasa.gov"

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
    setActiveByText('Image Library');
});

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const description = document.getElementById("description").value;

    try {
        searchImage(description);
    } catch {
        searchNotFound(description);
    }
});

function searchNotFound(description) {
    const message = document.createElement('p');
    message.textContent = `No results found for "${description}".`;
    message.style.color = 'red';
    message.style.fontWeight = 'bold';
    
    document.querySelector(".image-list").innerHTML = '';
    const searchResultsContainer = document.querySelector('.error-message');
    searchResultsContainer.appendChild(message);
}

async function searchImage(searchTeerm) {
    document.querySelector(".error-message").innerHTML = '';
    const element = document.querySelector(".image-list");
    const response = await fetch(baseURL + `/search?q=${searchTeerm}`);
    const data = await convertToJson(response);
    console.log(data.collection.items)
  
    const list = data.collection.items.map(imageLibraryCardTemplate).join("");
  
    if (data.collection.items != 0) {
        console.log(list);
        element.innerHTML = list;
    } else {
        searchNotFound(searchTeerm);
    }
  }

  searchImage('Supernova');
