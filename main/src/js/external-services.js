import {imageLibraryCardTemplate } from "./json-hendler.js"

const baseURL = "https://images-api.nasa.gov"

"https://images-api.nasa.gov/search?q=apollo%2011...";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getTestData() {
  const element = document.querySelector(".image-list");


  const response = await fetch(baseURL + `/search?q=apollo%2011...`);
  const data = await convertToJson(response);
  console.log(data.collection.items)

  const list = data.collection.items.map(imageLibraryCardTemplate).join("");

  console.log(list);

  element.innerHTML = list;


}


export default class ExternalServices {
  constructor(category) {
  }
  async getData(category) {
    const response = await fetch(baseURL + `/products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `/product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "/checkout/", options).then(convertToJson);
  }
}