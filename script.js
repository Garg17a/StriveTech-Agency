document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

const { body } = document;

function toggleDarkMode() {
    const themeToggleButton = document.getElementById('theme-toggle');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleButton.textContent = '🌞';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleButton.textContent = '🌙';
    }
}

// Check local storage and apply the saved theme on page load
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'dark' || !savedTheme) { // Default to dark mode if no theme is saved
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = '🌞';
    } else {
        
        document.getElementById('theme-toggle').textContent = '🌙';
    }
});

// Add event listener to the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
}

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        alert('Form submitted successfully!');
        event.target.reset(); // Reset form after submission
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
});

// Function to handle adding the active class to the clicked link
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        document.querySelector('nav ul li a.active')?.classList.remove('active');
        anchor.classList.add('active');
    });
});

// Optional: Adding active class based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
            document.querySelector('nav ul li a.active')?.classList.remove('active');
            navLink.classList.add('active');
        }
    });
});

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const totalSlides = slideElements.length;
let currentIndex = 0;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

// Optionally add auto-slide functionality
setInterval(() => showSlide(currentIndex + 1), 5000); // Change slides every 5 seconds






