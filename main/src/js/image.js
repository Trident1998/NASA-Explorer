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
searchImage(nasaId);


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
  
    const list = data.collection.items.map(imageCardItemTemplate).join("");
  
    if (data.collection.items != 0) {
        console.log(list);
        element.innerHTML = list;
    } else {
        searchNotFound(nasaId);
    }
  }