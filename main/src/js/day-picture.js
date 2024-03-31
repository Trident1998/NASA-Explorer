import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu, setActiveByText } from "./menu.js";
import { convertToJson } from "./external-services.js";
import { dayPictureTemplate } from "./json-hendler.js"



const baseURL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY" 

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
    setActiveByText('Astronomy Picture of the Day');
});

async function searchImage() {
    const element = document.querySelector('.day-picture-container');
    const response = await fetch(baseURL);
    const data = await convertToJson(response);
    console.log(data)
  
    const html = dayPictureTemplate(data);
  
    if (data != null) {
        console.log(html);
        element.innerHTML = html;
    } else {
        searchNotFound(searchTeerm);
    }
  }

 await searchImage();