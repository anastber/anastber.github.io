// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
    }
});

// Image carousel functionality
function startImageCarousel() {
    const carousels = document.querySelectorAll('.image-carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        
        setInterval(() => {
            images[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.opacity = '1';
        }, 3000); // Change image every 3 seconds
    });
}

// Modal functionality
let currentCarousel = null;
let currentImageIndex = 0;

function openImageModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const carousel = element.querySelector('.image-carousel');
    const images = carousel.querySelectorAll('img');
    
    currentCarousel = carousel;
    currentImageIndex = 0;
    
    // Find the currently visible image
    for (let i = 0; i < images.length; i++) {
        if (images[i].style.opacity === '1' || (i === 0 && images[i].style.opacity === '')) {
            currentImageIndex = i;
            break;
        }
    }
    
    modalImg.src = images[currentImageIndex].src;
    modal.style.display = 'block';
    updateNavButtons();
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
    currentCarousel = null;
}

function nextImage() {
    if (!currentCarousel) return;
    const images = currentCarousel.querySelectorAll('img');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('modalImage').src = images[currentImageIndex].src;
    updateNavButtons();
}

function previousImage() {
    if (!currentCarousel) return;
    const images = currentCarousel.querySelectorAll('img');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById('modalImage').src = images[currentImageIndex].src;
    updateNavButtons();
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = currentCarousel ? currentCarousel.querySelectorAll('img') : [];
    
    prevBtn.disabled = images.length <= 1;
    nextBtn.disabled = images.length <= 1;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (document.getElementById('imageModal').style.display === 'block') {
        switch(event.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeImageModal();
                break;
        }
    }
});

// Start carousel when page loads
document.addEventListener('DOMContentLoaded', startImageCarousel);