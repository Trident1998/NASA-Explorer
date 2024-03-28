import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu } from "./menu.js";



document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
});
