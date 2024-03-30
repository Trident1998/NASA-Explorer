import { getTestData } from "./external-services.js";


getTestData();

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const description = document.getElementById("description").value;

    // Perform search with the form values
    search(description);
});

function search(description) {
    // Perform search logic here
    // For demonstration purposes, let's just display the search parameters
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = `<p>Searching with Description: ${description}, Start Year: ss</p>`;
}