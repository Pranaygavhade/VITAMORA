// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Product Data
const productData = {
    moringa: {
        name: "Moringa Powder",
        price: "₹499",
        icon: "🌿",
        bgClass: "moringa-bg",
        description: "Our premium Moringa powder is sourced from organic farms and carefully processed to retain maximum nutrients. Known as the 'Miracle Tree', Moringa is packed with vitamins, minerals, and antioxidants that support overall health and wellness.",
        benefits: [
            "Rich in Vitamins A, C, and E",
            "Contains 7x more Vitamin C than oranges",
            "Powerful antioxidant properties",
            "Supports immune system function",
            "Helps reduce inflammation",
            "Promotes healthy digestion",
            "Boosts energy levels naturally",
            "Supports healthy blood sugar levels"
        ],
        usage: `
            <p><strong>Recommended Dosage:</strong> 1-2 teaspoons daily</p>
            <p><strong>How to Use:</strong></p>
            <ul>
                <li>Mix with water or juice</li>
                <li>Add to smoothies or shakes</li>
                <li>Sprinkle over salads or yogurt</li>
                <li>Blend into soups or curries</li>
            </ul>
            <p><strong>Best Time:</strong> Morning on empty stomach or before meals</p>
        `,
        ingredients: "100% Pure Organic Moringa Oleifera Leaf Powder"
    },
    amla: {
        name: "Amla Powder",
        price: "₹399",
        icon: "🍋",
        bgClass: "amla-bg",
        description: "Pure Amla (Indian Gooseberry) powder, rich in Vitamin C and natural antioxidants. This superfood has been used in Ayurveda for centuries to promote health, vitality, and longevity. Our Amla powder is made from sun-dried amla fruits, preserving all natural nutrients.",
        benefits: [
            "Highest natural source of Vitamin C",
            "Boosts immunity and fights infections",
            "Improves digestion and metabolism",
            "Enhances skin health and glow",
            "Promotes healthy hair growth",
            "Supports liver function",
            "Helps manage cholesterol levels",
            "Rich in antioxidants and fiber"
        ],
        usage: `
            <p><strong>Recommended Dosage:</strong> 1 teaspoon daily</p>
            <p><strong>How to Use:</strong></p>
            <ul>
                <li>Mix with warm water and honey</li>
                <li>Add to fruit juices</li>
                <li>Blend into smoothies</li>
                <li>Mix with yogurt</li>
            </ul>
            <p><strong>Best Time:</strong> Morning on empty stomach for best results</p>
        `,
        ingredients: "100% Pure Organic Amla (Phyllanthus Emblica) Fruit Powder"
    }
};

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Sticky Navbar
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.padding = '15px 0';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
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

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDark = false;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Product Modal
function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const product = productData[productId];
    
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalIcon').textContent = product.icon;
    document.getElementById('modalImage').className = `modal-img-placeholder ${product.bgClass}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalUsage').innerHTML = product.usage;
    
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = '';
    product.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Reviews Carousel
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');

function showReview(index) {
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            review.classList.add('active');
        }
    });
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}

function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
}

// Auto-slide reviews
setInterval(nextReview, 5000);

// Feedback Form Validation and Submission
const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validation
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = feedbackForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS
        await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "your-email@example.com" // Replace with your email
        });
        
        // Show success popup
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.add('show');
        
        // Reset form
        feedbackForm.reset();
        
        // Hide success popup after 3 seconds
        setTimeout(() => {
            successPopup.classList.remove('show');
        }, 3000);
        
    } catch (error) {
        console.error('Error sending feedback:', error);
        alert('Failed to send feedback. Please try again or contact us directly.');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .benefit-card, .contact-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});
