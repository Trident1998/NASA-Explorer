

function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
  
        <h2 class="divider">${product.NameWithoutBrand}</h2>
  
        <img class="product-image"
            src="${product.Images.PrimaryLarge}"
            alt="${product.NameWithoutBrand}" />
  
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
  
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`
}


export function imageLibraryCardTemplate(data) {
    if(data.links != null) {
        return `<li>
            <section class="card">
                <a href="./image.html?nasa_id=${data.data[0].nasa_id}">
                    <img src="${data.links[0].href}" alt="${data.data[0].title}" loading="lazy">
                    <div class="text-container">
                        <h4>${data.data[0].date_created.split('T')[0]}</h4>
                        <h4>${data.data[0].title}</h4>

                        <h3>DETAILS</h3>
                    </div>
                </a>
            </section>
        </li>`        
    }
}

export function dayPictureTemplate(data) {
    if(data != null) {
        return `
        <img src="${data.url}" alt="${data.title}">

        <div class="text-container">
            <p class="date">${data.date}</p>
            <h1 class="glow">${data.title}</h1>
            <p class="copyright">${data.copyright}</p>
            <p class="explanation">${data.explanation}</p>
        </div>`;  
    }
}

export function imageCardItemTemplate(data) {
    if(data != null){
        return`
        <img src="${data.links[0].href}" alt="${data.data[0].title}">

        <div class="text-container">
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