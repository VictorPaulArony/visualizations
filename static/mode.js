function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.artist-preview').forEach(preview => {
        preview.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        preview.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
