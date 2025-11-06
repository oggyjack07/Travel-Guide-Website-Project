// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    loadCities();
    initializeSearch();
    initializeScrollToTop();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    const body = document.body;

    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Mobile dropdown functionality
    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = btn.parentElement;
            dropdown.classList.toggle('active');
            
            // Rotate arrow
            const arrow = btn.querySelector('.fa-chevron-down');
            if (arrow) {
                arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });

    // Close menu when clicking on links
    document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Load Cities Dynamically
function loadCities() {
    const cities = [
        {
            name: "Indore",
            image: "https://www.holidify.com/images/cmsuploads/compressed/3551_20190228103219.jpg",
            description: "Food Capital",
            link: "indore.html"
        },
        {
            name: "Ujjain", 
            image: "https://static.toiimg.com/photo/94055833.cms",
            description: "Spiritual City",
            link: "ujjain.html"
        },
        {
            name: "Dewas",
            image: "https://d34vm3j4h7f97z.cloudfront.net/optimized/4X/f/0/0/f0024da20a7fbff030b2ec166e82bf59517ba441_2_631x500.jpeg",
            description: "Hill Temple", 
            link: "dewas.html"
        },
        {
            name: "Mumbai",
            image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/c8/3a.jpg",
            description: "City of Dreams",
            link: "mumbai.html"
        },
        {
            name: "Delhi",
            image: "https://www.holidify.com/images/cmsuploads/compressed/5621259188_e74d63cb05_b_20180302140149.jpg", 
            description: "Capital City",
            link: "delhi.html"
        },
        {
            name: "Bhopal",
            image: "https://i.pinimg.com/736x/ca/60/ca/ca60ca89811df10f0c2f24261162cfee.jpg",
            description: "City of Lakes",
            link: "bhopal.html"
        }
    ];

    const placeGrid = document.querySelector('.place-grid');
    const viewMoreBtn = document.querySelector('#viewMoreBtn');

    if (placeGrid) {
        // Clear existing content
        placeGrid.innerHTML = '';

        // Determine how many cities to show initially
        const isMobile = window.innerWidth <= 768;
        const citiesToShow = isMobile ? 3 : cities.length;

        // Create city cards
        cities.forEach((city, index) => {
            const cityCard = document.createElement('div');
            cityCard.className = `place-card ${index >= 3 ? 'mobile-hidden' : ''}`;
            cityCard.innerHTML = `
                <a href="${city.link}">
                    <img src="${city.image}" alt="${city.name}" loading="lazy">
                    <div class="card-overlay">
                        <p>${city.name}</p>
                        <span>${city.description}</span>
                    </div>
                </a>
            `;
            placeGrid.appendChild(cityCard);
        });

        // View More functionality
        if (viewMoreBtn && isMobile) {
            viewMoreBtn.addEventListener('click', () => {
                const placeGrid = document.querySelector('.place-grid');
                const hiddenCities = document.querySelectorAll('.mobile-hidden');
                const isShowingAll = placeGrid.classList.contains('show-all');

                if (isShowingAll) {
                    // Show less
                    placeGrid.classList.remove('show-all');
                    viewMoreBtn.innerHTML = '<span>View More Cities</span><i class="fas fa-chevron-down"></i>';
                } else {
                    // Show more
                    placeGrid.classList.add('show-all');
                    viewMoreBtn.innerHTML = '<span>View Less Cities</span><i class="fas fa-chevron-up"></i>';
                }
            });
        }
    }
}

// Search Functionality
function initializeSearch() {
    const cities = [
        { name: "Indore", url: "indore.html" },
        { name: "Ujjain", url: "ujjain.html" },
        { name: "Dewas", url: "dewas.html" },
        { name: "Mumbai", url: "mumbai.html" },
        { name: "Delhi", url: "delhi.html" },
        { name: "Bhopal", url: "bhopal.html" }
    ];

    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (searchInput && searchResults) {
        searchInput.addEventListener("input", () => {
            const input = searchInput.value.toLowerCase().trim();
            searchResults.innerHTML = "";

            if (input.length < 2) {
                searchResults.style.display = "none";
                return;
            }

            const filtered = cities.filter(city =>
                city.name.toLowerCase().includes(input)
            );

            if (filtered.length) {
                searchResults.style.display = "block";
                filtered.forEach(city => {
                    const div = document.createElement("div");
                    div.textContent = city.name;
                    div.addEventListener("click", () => {
                        window.location.href = city.url;
                    });
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.style.display = "none";
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }
}

// Scroll to Top Functionality
function initializeScrollToTop() {
    const topBtn = document.getElementById("topBtn");

    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };

    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Theme Toggle Functionality
function initializeTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeBtn.title = 'Switch to Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            themeBtn.title = 'Switch to Dark Mode';
        }
    }
}

// Scroll to Cities Section
function scrollToCities() {
    const citiesSection = document.getElementById('cities');
    if (citiesSection) {
        citiesSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    loadCities(); // Reload cities to adjust mobile/desktop view
});

// Add loaded class to body when page is ready
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});