import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu, setActiveByText } from "./menu.js";
import { convertToJson } from "./external-services.js";
import { marsPictureListTemplate } from "./json-hendler.js";

const baseURL = "https://api.nasa.gov/planetary/apod?date=api_key=DEMO_KEY" 

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
    setActiveByText('Mars Image Library');
});

document.getElementById('roverForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var rover = document.getElementById('roverSelect').value;
    var camera = document.getElementById('cameraSelect').value;

    // Do something with the selected values (e.g., send them to a server)
    console.log('Selected Rover:', rover);
    console.log('Selected Camera:', camera);

    searchImage(rover, camera);
});

document.getElementById('roverSelect').addEventListener('change', function() {
    var rover = this.value;
    var cameraSelect = document.getElementById('cameraSelect');

    cameraSelect.innerHTML = '';

    switch (rover) {
        case 'curiosity':
            cameraSelect.disabled = false;
            cameraSelect.innerHTML = `
                <option value="">Select Camera</option>
                <option value="FHAZ">Front Hazard Avoidance Camera (FHAZ)</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera (RHAZ)</option>
                <option value="MAST">Mast Camera (MAST)</option>
                <option value="CHEMCAM">Chemistry and Camera Complex (CHEMCAM)</option>
                <option value="MAHLI">Mars Hand Lens Imager (MAHLI)</option>
                <option value="MARDI">Mars Descent Imager (MARDI)</option>
                <option value="NAVCAM">Navigation Camera (NAVCAM)</option>
            `;
            break;
        case 'opportunity':
            cameraSelect.disabled = false;
            cameraSelect.innerHTML = `
                <option value="">Select Camera</option>
                <option value="FHAZ">Front Hazard Avoidance Camera (FHAZ)</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera (RHAZ)</option>
                <option value="NAVCAM">Navigation Camera (NAVCAM)</option>
                <option value="PANCAM">Panoramic Camera (PANCAM)</option>
            `;
            break;
        case 'spirit':
            cameraSelect.disabled = false;
            cameraSelect.innerHTML = `
                <option value="">Select Camera</option>
                <option value="FHAZ">Front Hazard Avoidance Camera (FHAZ)</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera (RHAZ)</option>
                <option value="NAVCAM">Navigation Camera (NAVCAM)</option>
                <option value="PANCAM">Panoramic Camera (PANCAM)</option>
            `;
            break;
        default:
            cameraSelect.disabled = true;
            cameraSelect.innerHTML = '<option value="">Select Rover First</option>';
            break;
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

async function searchImage(rover = 'opportunity', camera) {
    document.querySelector(".error-message").innerHTML = '';
    const element = document.querySelector(".image-list");
    let response = null;
    if(camera == null || camera == "") {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=10&api_key=xASSlKoxMIn6RTO7VuJLtSzpunRqbD3nJqaEvwdo`);
    } else {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=10&camera=${camera}&api_key=xASSlKoxMIn6RTO7VuJLtSzpunRqbD3nJqaEvwdo`);
    }
    const data = await convertToJson(response);
    console.log(data.photos);
  
    const list = data.photos.slice(0, 99).map(marsPictureListTemplate).join("");
  
    if (data.photos != 0) {
        console.log(list);
        element.innerHTML = list;
    } else {
        searchNotFound(searchTeerm);
    }
  }

  searchImage()
