export function imageLibraryCardTemplate(data) {
    if(data.links != null) {
        return `<li>
            <section class="card">
                <a href="./image.html?nasa_id=${data.data[0].nasa_id}">
                    <img src="${data.links[0].href}" alt="${data.data[0].title}" loading="lazy">
                    <div class="text-container">
                        <h4>${data.data[0].date_created.split('T')[0]}</h4>
                        <h4>${data.data[0].title}</h4>
                    </div>

                    <h3>DETAILS</h3>
                </a>
            </section>
        </li>`        
    }
}

export function dayPictureTemplate(data) {
    if(data != null) {
        return `
        <img src="${data.url}" alt="${data.title}" loading="lazy">

        <div class="text-container">
            <p class="date">${data.date}</p>
            <h1 class="glow">${data.title}</h1>
            <p class="copyright">${data.copyright}</p>
            <p class="explanation">${data.explanation}</p>
        </div>`;  
    }
}

export function marsPictureListTemplate(data) {
    if(data != null) {
        return `
        <li class="image-item">
        <img class="mars" src="${data.img_src}" alt="${data.id}" loading="lazy">
        <div class="image-info">
            <p class="date">Earth darte: ${data.earth_date}</p>
            <p>ID: ${data.id}</p>
            <h3>Rover: ${data.rover.name}</h3>
            <p>Camera: ${data.camera.full_name} (${data.camera.name})</p>
        </div>
    </li>`;  
    }
}

export function imageCardItemTemplate(data) {
    if(data != null){
        return`
        <img src="${data.links[0].href}" alt="${data.data[0].title}">

        <div class="text-container card-item">
            <h1 class="title">${data.data[0].title}</h1>
            <p class="date">2${data.data[0].date_created.split('T')[0]}</p>
            <hr class="horizontal-line">

            <div class="metadata-container">
            ${metaDataRemplate('Keywords', 'keywords', data.data[0].keywords)}
            ${metaDataRemplate('Center', 'center', [data.data[0].center])}
            ${metaDataRemplate('Secondary Creator', 'secondary_creator', [data.data[0].secondary_creator])}    
            ${metaDataRemplate('NASA ID', 'nasa_id', [data.data[0].nasa_id], false)}   
            <hr class="horizontal-line">

            <p class="description">${data.data[0].description}</p>
        </div>`;
    }
}

const metaDataRemplate = (key, parameterName, valyes, isLink = true) => {
    return `
    <div class="metadata">
        <p class="metadata-key">${key}:</p> 
        ${valyes.map(value => isLink ? `<a href="../image-library/image-library.html?${parameterName}=${value}">${value}</a>` : `<p>${value}</p>`).join(",")}
    </div>`;
}