// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Vehicle search functionality
    const searchBtn = document.querySelector('.search-btn');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Collect filter values
            const filters = {};
            filterSelects.forEach(select => {
                if (select.value) {
                    filters[select.name || 'filter'] = select.value;
                }
            });
            
            // Simulate search (in real app, this would make API call)
            console.log('Searching with filters:', filters);
            
            // Add loading state
            searchBtn.classList.add('loading');
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';
            
            // Simulate API delay
            setTimeout(() => {
                searchBtn.classList.remove('loading');
                searchBtn.innerHTML = '<i class="fas fa-search"></i> بحث ذكي';
                
                // Show results (in real app, update vehicle grid)
                showSearchResults();
            }, 2000);
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = 'تم الإرسال بنجاح!';
                submitBtn.style.background = 'var(--success-color)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = 'إرسال الرسالة';
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Vehicle card interactions
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    vehicleCards.forEach(card => {
        const heartBtn = card.querySelector('.btn-outline');
        if (heartBtn) {
            heartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('fas')) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.style.color = '';
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.style.color = 'var(--danger-color)';
                }
            });
        }
        
        const detailsBtn = card.querySelector('.btn-primary');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function() {
                // In real app, this would navigate to vehicle details page
                console.log('Viewing vehicle details');
                showVehicleModal(card);
            });
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .vehicle-card, .tech-card');
    animateElements.forEach(el => observer.observe(el));

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number, .stat-item h3');
    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('مليون')) {
                element.textContent = current.toFixed(1) + ' مليون جنيه';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                if (number) {
                    countUp(entry.target, number);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => statsObserver.observe(stat));
});

// Helper Functions
function showSearchResults() {
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    if (vehiclesGrid) {
        // Add a subtle animation to indicate new results
        vehiclesGrid.style.opacity = '0.7';
        setTimeout(() => {
            vehiclesGrid.style.opacity = '1';
        }, 300);
    }
}

function showVehicleModal(card) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'vehicle-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>تفاصيل المركبة</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>هنا ستظهر تفاصيل المركبة الكاملة مع الصور والمواصفات والتقارير.</p>
                <div class="modal-features">
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <span>فحص شامل بالذكاء الاصطناعي</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-link"></i>
                        <span>سجل البلوك تشين</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-certificate"></i>
                        <span>ضمان شهر كامل</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">تواصل مع البائع</button>
                <button class="btn btn-secondary">طلب فحص إضافي</button>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .vehicle-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-light);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-features {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .modal-features .feature {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--primary-color);
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    // Add modal to body
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Utility functions for future enhancements
const VINUtils = {
    // Format price with Egyptian pound
    formatPrice: (price) => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: 'EGP'
        }).format(price);
    },

    // Validate Egyptian phone number
    validatePhone: (phone) => {
        const phoneRegex = /^(\+20|0)?1[0125]\d{8}$/;
        return phoneRegex.test(phone);
    },

    // Generate vehicle ID
    generateVehicleId: () => {
        return 'VIN-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Calculate financing options
    calculateFinancing: (price, downPayment, months) => {
        const principal = price - downPayment;
        const monthlyRate = 0.12 / 12; // 12% annual rate
        const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                              (Math.pow(1 + monthlyRate, months) - 1);
        
        return {
            monthlyPayment: Math.round(monthlyPayment),
            totalAmount: Math.round(monthlyPayment * months + downPayment),
            totalInterest: Math.round(monthlyPayment * months + downPayment - price)
        };
    }
};

// Export for use in other modules
window.VINUtils = VINUtils;

