import { imageLibraryCardTemplate } from "./json-hendler.js"

const baseURL = "https://images-api.nasa.gov"

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res };
  }
}
