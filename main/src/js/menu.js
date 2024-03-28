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