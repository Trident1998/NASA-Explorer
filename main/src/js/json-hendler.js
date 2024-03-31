

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
                <a href="../index/index.html">
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
        <img src="${data.hdurl}" alt="${data.title}">

        <div class="text-container">
            <p class="date">${data.date}</p>
            <h1 class="glow">${data.title}</h1>
            <p class="copyright">${data.copyright}</p>
            <p class="explanation">${data.explanation}</p>
        </div>`        
    }
}