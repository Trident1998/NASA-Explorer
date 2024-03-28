export function initializeMenu() {
    const hamButton = document.querySelector('#hamburger');
    const navigation = document.querySelector('.navigation');

    function toggleMenu() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    }

    hamButton.addEventListener('click', toggleMenu);

    // Optionally, you can return a function to remove the event listener
    return function removeMenuListener() {
        hamButton.removeEventListener('click', toggleMenu);
    };
}