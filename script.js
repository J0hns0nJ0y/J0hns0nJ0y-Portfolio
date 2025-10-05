const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

function showPage(pageName) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageName);
    const targetLink = document.querySelector(`[data-page="${pageName}"]`);
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        showPage(pageName);
        
        window.history.pushState({page: pageName}, '', `#${pageName}`);
    });
});

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        showPage(e.state.page);
    } else {
        const hash = window.location.hash.replace('#', '');
        if (hash && (hash === 'articles' || hash === 'portfolio')) {
            showPage(hash);
        } else {
            showPage('articles');
        }
    }
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash === 'articles' || hash === 'portfolio')) {
        showPage(hash);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash === 'articles' || hash === 'portfolio')) {
        showPage(hash);
    } else {
        showPage('articles');
        window.history.replaceState({page: 'articles'}, '', '#articles');
    }
});
