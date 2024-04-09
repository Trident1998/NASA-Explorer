import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu, setActiveByText } from "./menu.js";
import { convertToJson } from "./external-services.js";
import { imageCardItemTemplate } from "./json-hendler.js"

const baseURL = "https://images-api.nasa.gov"

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
    setActiveByText('Image Library');
});

const nasaId = getParams("nasa_id");
await searchImage(nasaId);


function getParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const product = urlParams.get(param)
    return product
  }

async function searchImage(nasaId) {
    const element = document.querySelector(".image-card-item");
    const response = await fetch(baseURL + `/search?nasa_id=${nasaId}`);
    const data = await convertToJson(response);
    console.log(data.collection.items)
  
    const html = imageCardItemTemplate(data.collection.items[0]);
  
    if (data.collection.items != 0) {
        console.log(html);
        element.innerHTML = html;
    } else {
        searchNotFound(nasaId);
    }
  }

  const favoriteSymbol = document.getElementById('favorite-symbol');

  favoriteSymbol.addEventListener('click', function() {
    const metadataKeys = document.querySelectorAll('.metadata p.metadata-key');
    let id = null;

    // Loop through each element to find the one containing the text 'NASA ID:'
    metadataKeys.forEach(element => {
        if (element.textContent.trim() === 'NASA ID:') {
            // Select the next sibling <p> element
            const piaElement = element.nextElementSibling;
            if (piaElement && piaElement.tagName.toLowerCase() === 'p') {
                console.log(piaElement.textContent); 
                id = piaElement.textContent;
            }
        }
    });

    this.classList.toggle('filled');
    if (this.classList.contains('filled')) {
        setLocalStorage('favorite', id);
        this.innerHTML = '&#9733;';
    } else {
        removeStorage('favorite', id)
        this.innerHTML = '&#9734;'; // Empty star
    }
  });

  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  // save data to local storage
  export function setLocalStorage(key, id) {
    let data = getLocalStorage(key) || [];
    data.push(id); 
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // remove data from local storage
  export function removeStorage(key, id) {
    let data = getLocalStorage(key) || [];
    let index = data.indexOf(id); 
    if (index !== -1) {
        data.splice(index, 1); 
    }
    localStorage.setItem(key, JSON.stringify(data));
  }
