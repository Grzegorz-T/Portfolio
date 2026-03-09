document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    const html = document.documentElement;
    const body = document.body;

    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
        toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
        // ustawienie tła przy wczytaniu
        body.style.backgroundImage = savedTheme === "dark"
            ? 'url("/static/img/background_dark.jpg")'
            : 'url("/static/img/background.jpg")';
    }

    toggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    if (currentTheme === "dark") {
        html.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    }
    });
});
