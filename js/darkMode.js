const darkToggleButton = document.querySelector(".dark-toggle");

let changeTheme = () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === "light-mode" ? "dark-mode" : "light-mode";
    document.body.dataset.theme = newTheme;

    localStorage.setItem('theme', newTheme);

    console.log('Changing theme to:', newTheme);
    const newToggleImgSrc = newTheme === "light-mode" ? "img/moon.svg" : "img/sun.svg";
    console.log('New image src:', newToggleImgSrc);
    darkToggleButton.src = newToggleImgSrc;
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;

        const initialToggleSrc = savedTheme === "light-mode" ? "img/moon.svg" : "img/sun.svg";
        console.log('Initial image src:', initialToggleSrc);
        darkToggleButton.src = initialToggleSrc;
    } else {
        document.body.dataset.theme = "light-mode";
        darkToggleButton.src = "img/moon.svg";
    }
});

darkToggleButton.addEventListener("click", changeTheme);
