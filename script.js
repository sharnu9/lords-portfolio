// script.js

// Loading Animation
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1000);
};

// Particles Background
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#6C63FF' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animated Text
const textElements = document.querySelectorAll('.animated-text span');
let currentIndex = 0;

function animateText() {
    textElements.forEach(text => text.classList.remove('active'));
    textElements[currentIndex].classList.add('active');
    currentIndex = (currentIndex + 1) % textElements.length;
}
setInterval(animateText, 2000);

// 3D Card Hover Effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth/2 - e.pageX)/25;
        const yAxis = (window.innerHeight/2 - e.pageY)/25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .animate-slide-left, .animate-slide-right').forEach(element => {
    observer.observe(element);
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Oops! There was a problem sending your message.');
        }
    } catch (error) {
        alert('Oops! There was a problem sending your message.');
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Menu Highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Resume Download
const downloadResume = document.querySelector('.download-resume');
if(downloadResume) {
    downloadResume.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace with actual resume PDF path
        const link = document.createElement('a');
        link.href = 'path/to/your-resume.pdf';
        link.download = 'Sharanabasava-Patil-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Image Hover Effect
document.querySelectorAll('.about-image').forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        image.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/10}deg) rotateY(${-(x - rect.width/2)/10}deg)`;
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});