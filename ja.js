
// Simple animation for feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            });
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            // Water Image Animation
            const waterImages = document.querySelectorAll('.water-image-slide');
            let currentImageIndex = 0;
            
            function rotateWaterImages() {
                // Fade out current image
                waterImages[currentImageIndex].classList.remove('active');
                waterImages[currentImageIndex].classList.add('exit');
                
                // Calculate next image index
                currentImageIndex = (currentImageIndex + 1) % waterImages.length;
                
                setTimeout(() => {
                    // Reset all images
                    waterImages.forEach(img => {
                        img.classList.remove('active', 'exit');
                    });
                    
                    // Show new image
                    waterImages[currentImageIndex].classList.add('active');
                }, 1000);
            }
            
            // Rotate images every 5 seconds
            setInterval(rotateWaterImages, 5000);

            // Calculator Functionality
            const heightInput = document.getElementById('height-input');
            const weightInput = document.getElementById('weight-input');
            const activitySelect = document.getElementById('activity-select');
            const calculateButton = document.getElementById('calculate-button');
            const resultsContainer = document.getElementById('results-container');
            const waterAmountOutput = document.getElementById('water-amount');
            const heightErrorMessage = document.getElementById('height-error-message');
            const weightErrorMessage = document.getElementById('weight-error-message');

            // Add staggered animations for input fields
            setTimeout(() => {
                document.querySelectorAll('.field-container-fade-in').forEach((el, index) => {
                    el.style.animationDelay = `${0.4 + index * 0.2}s`;
                });
            }, 100);

            calculateButton.addEventListener('click', calculateWaterIntake);

            function calculateWaterIntake() {
                // Get values
                const height = parseInt(heightInput.value);
                const weight = parseInt(weightInput.value);
                const activityLevel = activitySelect.value;

                // Reset errors
                heightErrorMessage.classList.remove('show-error-message');
                weightErrorMessage.classList.remove('show-error-message');
                resultsContainer.classList.remove('show-results');

                // Validation
                let isValid = true;
                
                if (isNaN(height) || height < 100 || height > 250) {
                    heightErrorMessage.classList.add('show-error-message');
                    isValid = false;
                }

                if (isNaN(weight) || weight < 30 || weight > 200) {
                    weightErrorMessage.classList.add('show-error-message');
                    isValid = false;
                }

                if (!activityLevel) {
                    alert('Please select your activity level');
                    isValid = false;
                }

                if (!isValid) {
                    return;
                }

                // Enhanced calculation including height
                // Base calculation (weight * 0.033) + activity adjustment
                // Height adjustment: for every 10cm over 150cm, add 0.1L
                const baseWater = weight * 0.033;
                const activityAdjustment = parseFloat(activityLevel) * 0.5;
                const heightAdjustment = Math.max(0, (height - 150) / 10 * 0.1);
                
                const totalWater = baseWater + activityAdjustment + heightAdjustment;

                // Display results with animation
                waterAmountOutput.textContent = `${totalWater.toFixed(2)} liters (${(totalWater * 1000).toFixed(0)} ml)`;
                resultsContainer.classList.add('show-results');

                // Add celebration animation
                calculateButton.textContent = '✓ Calculated!';
                calculateButton.style.backgroundColor = '#10b981';
                setTimeout(() => {
                    calculateButton.textContent = 'Calculate Again';
                    calculateButton.style.backgroundColor = '';
                }, 2000);
            }
        });
        
        // Navigation and Scroll Animation Script for Textile Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mainHeading = document.getElementById('mainHeading');
    const introText = document.querySelector('.intro-text');
    const sections = document.querySelectorAll('.content-section');
    const footer = document.getElementById('footer');
    
    // ============= Menu Functionality =============
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    // ============= Scroll Animations =============
    function animateOnScroll() {
        // Navbar effect on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Animate heading elements after page load
        setTimeout(() => {
            mainHeading.style.opacity = '1';
            mainHeading.style.transform = 'translateY(0)';
            mainHeading.classList.add('animated');
            introText.style.opacity = '1';
            introText.style.transform = 'translateY(0)';
        }, 300);
        
        // Animate sections when in viewport
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (sectionBottom >= windowTop && sectionTop <= windowBottom) {
                section.classList.add('animated');
                
                // Animate child elements with staggered delays
                const imageLeft = section.querySelector('.image-left');
                const centerText = section.querySelector('.center-text');
                const imageRight = section.querySelector('.image-right');
                const mobileText = section.querySelector('.text-content');
                const mobileImages = section.querySelectorAll('.image-container');
                
                if (imageLeft) imageLeft.classList.add('animated');
                if (centerText) setTimeout(() => centerText.classList.add('animated'), 200);
                if (imageRight) setTimeout(() => imageRight.classList.add('animated'), 400);
                if (mobileText) mobileText.classList.add('animated');
                
                mobileImages.forEach((img, index) => {
                    setTimeout(() => img.classList.add('animated'), 200 * index);
                });
            }
        });
        
        // Animate footer when in view
        const footerBottom = footer.offsetTop + footer.offsetHeight;
        if (footerBottom >= windowTop && footer.offsetTop <= windowBottom) {
            footer.classList.add('animated');
        }
    }
    
    // ============= Textile Movement Effect =============
    const headingSpan = document.querySelector('h1 span');
    let movementInterval;
    
    function startTextileMovement() {
        movementInterval = setInterval(() => {
            headingSpan.style.transform = `
                translateX(${Math.random() * 4 - 2}px) 
                translateY(${Math.random() * 4 - 2}px) 
                rotate(${Math.random() * 2 - 1}deg)
            `;
        }, 100);
    }
    
    function stopTextileMovement() {
        clearInterval(movementInterval);
        headingSpan.style.transform = '';
    }
    
    headingSpan.addEventListener('mouseenter', startTextileMovement);
    headingSpan.addEventListener('mouseleave', stopTextileMovement);
    
    // ============= Initialization =============
    animateOnScroll(); // Run immediately on load
    window.addEventListener('scroll', animateOnScroll);
});

// Note: This JavaScript works with the CSS animations defined in the HTML file
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('.animated-image');
            
            function checkPosition() {
                animatedElements.forEach(element => {
                    const positionFromTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (positionFromTop - windowHeight <= -100) {
                        element.classList.add('active');
                    }
                });
            }
            
            // Initial check in case elements are already in view
            checkPosition();
            
            // Debounce scroll events for performance
            let isScrolling;
            window.addEventListener('scroll', function() {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(checkPosition, 66);
            }, { passive: true });
        });
        document.addEventListener('DOMContentLoaded', function() {
            // Initially hide all water can containers
            const containers = document.querySelectorAll('.water-can-container');
            containers.forEach(container => {
                container.style.opacity = '0';
                container.style.opacity = '9';
            });

            // Intersection Observer for scroll animations
            const animateOnScroll = () => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.1
                });

                containers.forEach(container => {
                    observer.observe(container);
                });
            };

            // Initialize scroll animations
            animateOnScroll();
        });
                document.addEventListener('DOMContentLoaded', function() {
            // Initially hide all water can containers
            const containers = document.querySelectorAll('.water-can-container');
            containers.forEach(container => {
                container.style.opacity = '0';
                container.style.opacity = '9';
            });

            // Intersection Observer for scroll animations
            const animateOnScroll = () => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.1
                });

                containers.forEach(container => {
                    observer.observe(container);
                });
            };

            // Initialize scroll animations
            animateOnScroll();
        });
document.addEventListener('DOMContentLoaded', function() {
            // Water Image Animation
            const waterImages = document.querySelectorAll('.water-image-slide');
            let currentImageIndex = 0;
            
            function rotateWaterImages() {
                // Fade out current image
                waterImages[currentImageIndex].classList.remove('active');
                waterImages[currentImageIndex].classList.add('exit');
                
                // Calculate next image index
                currentImageIndex = (currentImageIndex + 1) % waterImages.length;
                
                setTimeout(() => {
                    // Reset all images
                    waterImages.forEach(img => {
                        img.classList.remove('active', 'exit');
                    });
                    
                    // Show new image
                    waterImages[currentImageIndex].classList.add('active');
                }, 1000);
            }
            
            // Rotate images every 5 seconds
            setInterval(rotateWaterImages, 5000);

            // Calculator Functionality
            const heightInput = document.getElementById('height-input');
            const weightInput = document.getElementById('weight-input');
            const activitySelect = document.getElementById('activity-select');
            const calculateButton = document.getElementById('calculate-button');
            const resultsContainer = document.getElementById('results-container');
            const waterAmountOutput = document.getElementById('water-amount');
            const heightErrorMessage = document.getElementById('height-error-message');
            const weightErrorMessage = document.getElementById('weight-error-message');

            // Add staggered animations for input fields
            setTimeout(() => {
                document.querySelectorAll('.field-container-fade-in').forEach((el, index) => {
                    el.style.animationDelay = `${0.4 + index * 0.2}s`;
                });
            }, 100);

            calculateButton.addEventListener('click', calculateWaterIntake);

            function calculateWaterIntake() {
                // Get values
                const height = parseInt(heightInput.value);
                const weight = parseInt(weightInput.value);
                const activityLevel = activitySelect.value;

                // Reset errors
                heightErrorMessage.classList.remove('show-error-message');
                weightErrorMessage.classList.remove('show-error-message');
                resultsContainer.classList.remove('show-results');

                // Validation
                let isValid = true;
                
                if (isNaN(height) || height < 100 || height > 250) {
                    heightErrorMessage.classList.add('show-error-message');
                    isValid = false;
                }

                if (isNaN(weight) || weight < 30 || weight > 200) {
                    weightErrorMessage.classList.add('show-error-message');
                    isValid = false;
                }

                if (!activityLevel) {
                    alert('Please select your activity level');
                    isValid = false;
                }

                if (!isValid) {
                    return;
                }

                // Enhanced calculation including height
                // Base calculation (weight * 0.033) + activity adjustment
                // Height adjustment: for every 10cm over 150cm, add 0.1L
                const baseWater = weight * 0.033;
                const activityAdjustment = parseFloat(activityLevel) * 0.5;
                const heightAdjustment = Math.max(0, (height - 150) / 10 * 0.1);
                
                const totalWater = baseWater + activityAdjustment + heightAdjustment;

                // Display results with animation
                waterAmountOutput.textContent = `${totalWater.toFixed(2)} liters (${(totalWater * 1000).toFixed(0)} ml)`;
                resultsContainer.classList.add('show-results');

                // Add celebration animation
                calculateButton.textContent = '✓ Calculated!';
                calculateButton.style.backgroundColor = '#10b981';
                setTimeout(() => {
                    calculateButton.textContent = 'Calculate Again';
                    calculateButton.style.backgroundColor = '';
                }, 2000);
            }
        });
    

