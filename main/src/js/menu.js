export function initializeMenu() {
    const hamButton = document.querySelector('#hamburger');
    const navigation = document.querySelector('.navigation');

    function toggleMenu() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    }

    hamButton.addEventListener('click', toggleMenu);

    return function removeMenuListener() {
        hamButton.removeEventListener('click', toggleMenu);
    };
}

// Function to assign active class by text content
export function setActiveByText(linkText) {
	const navLinks = document.querySelectorAll('.navigation a');

    // Find the link with the specified text content and add active class
    navLinks.forEach(link => {
        if (link.textContent.trim() === linkText.trim()) {
            link.classList.add('active');
        }
    });
}