const navLinks = document.querySelectorAll('.navigation a');


// Function to assign active class by text content
export function setActiveByText(linkText) {

    // Find the link with the specified text content and add active class
    navLinks.forEach(link => {
        if (link.textContent.trim() === linkText.trim()) {
            link.classList.add('active');
        }
    });
}