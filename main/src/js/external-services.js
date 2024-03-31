import { imageLibraryCardTemplate } from "./json-hendler.js"

const baseURL = "https://images-api.nasa.gov"

"https://images-api.nasa.gov/search?q=apollo%2011...";

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}
