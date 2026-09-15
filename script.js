// ============================================================================
// SANCHIT PORTFOLIO - INTERACTIVE FEATURES
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    initializeScrollAnimations();
    initializeMobileMenu();
});

// ============================================================================
// NAVIGATION - Smooth Scrolling and Active Link Highlighting
// ============================================================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    updateActiveLink(href);
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// ============================================================================
// MOBILE MENU - Toggle Navigation on Mobile
// ============================================================================

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.style.display = 'none';
            });
        });
    }
}

// ============================================================================
// CONTACT FORM - Validation and Submission
// ============================================================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!validateForm(name, email, subject, message)) {
                showFormMessage('Please fill in all fields correctly.', 'error');
                return;
            }

            // Prepare form data
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            };

            // Submit form (using FormSubmit.co for free form handling)
            submitFormViaFormSubmit(formData);
        });
    }
}

function validateForm(name, email, subject, message) {
    // Check if fields are empty
    if (!name || !email || !subject || !message) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }

    // Check minimum message length
    if (message.length < 10) {
        return false;
    }

    return true;
}

function submitFormViaFormSubmit(formData) {
    const form = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    // Create a hidden form to submit to FormSubmit.co
    const submitForm = document.createElement('form');
    submitForm.method = 'POST';
    submitForm.action = 'https://formsubmit.co/sanchit.bhadoria@example.com';
    submitForm.style.display = 'none';

    // Add form fields
    submitForm.innerHTML = `
        <input type="hidden" name="name" value="${escapeHtml(formData.name)}">
        <input type="hidden" name="email" value="${escapeHtml(formData.email)}">
        <input type="hidden" name="subject" value="${escapeHtml(formData.subject)}">
        <input type="hidden" name="message" value="${escapeHtml(formData.message)}">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="https://sanchitportfolio.github.io/#contact">
    `;

    document.body.appendChild(submitForm);

    // Show loading message
    showFormMessage('Sending your message...', 'info');

    // Submit the form
    submitForm.submit();

    // Reset form after submission
    setTimeout(() => {
        form.reset();
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        document.body.removeChild(submitForm);
    }, 1000);
}

function showFormMessage(message, type) {
    const formNote = document.getElementById('formNote');
    if (formNote) {
        formNote.textContent = message;
        formNote.className = 'form-note ' + type;
        
        // Auto-clear success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formNote.textContent = '';
            }, 5000);
        }
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================================================
// SCROLL ANIMATIONS - Animate elements on scroll
// ============================================================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animation');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards and other elements
    const elementsToObserve = document.querySelectorAll(
        '.project-card, .experience-item, .skill-category, .stat'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Smooth scroll for anchor links (fallback for older browsers)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const top = element.offsetTop - 80;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

// Add scroll event listener for animations
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================================================
// LAZY LOADING IMAGES
// ============================================================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================

console.log('%cWelcome to Sanchit\'s Portfolio!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cLooking for opportunities to work together? Let\'s connect!', 'color: #00d4ff; font-size: 12px;');
