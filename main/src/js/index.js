import { loadHeaderFooter } from "./load-header.js";
import { initializeMenu, setActiveByText } from "./menu.js";



document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    initializeMenu();
    setActiveByText('Home');
});
