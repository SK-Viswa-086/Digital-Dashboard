// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showCustomMessage("Right-click is disabled on this site");
});

// Optional: Show a custom message
function showCustomMessage(message) {
    // Remove existing message if any
    const existingMsg = document.querySelector('.right-click-message');
    if (existingMsg) existingMsg.remove();
    
    // Create and show new message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'right-click-message';
    msgDiv.innerHTML = `
        <div class="message-box">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(msgDiv);
    
    // Auto-remove after 2 seconds
    setTimeout(() => {
        msgDiv.remove();
    }, 2000);
}

// Add this CSS for the message
const style = document.createElement('style');
style.textContent = `
    .right-click-message {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        animation: fadeInOut 2s ease;
    }
    
    .message-box {
        background: #ff6b6b;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
// Add these lines to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add this line to initialize authentication
    initAuth();
    
    // Rest of your existing code...
});
// script.js - Main JavaScript file for Digital Dashboard

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current date and time
    updateDateTime();
    
    // Initialize animations
    initAnimations();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize page-specific functionality
    initPageFeatures();
    
    // Update date/time every second
    setInterval(updateDateTime, 1000);
});

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    const dateStr = now.toLocaleDateString('en-US', dateOptions);
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);
    
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = `${dateStr} | ${timeStr}`;
    }
    
    // Update countdown for rates update
    updateCountdown();
}

// Update countdown for rates update (every 12 hours)
function updateCountdown() {
    const now = new Date();
    let nextUpdate = new Date(now);
    
    // Set next update to next 12-hour interval (12 AM or 12 PM)
    if (now.getHours() < 12) {
        nextUpdate.setHours(12, 0, 0, 0);
    } else {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
        nextUpdate.setHours(0, 0, 0, 0);
    }
    
    const diff = nextUpdate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('updateCountdown');
    if (countdownElement) {
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => observer.observe(element));
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.widget, .stat-card, .link-card, .transport-type-option, .ticket-card, .recent-booking, .forecast-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize page-specific functionality
function initPageFeatures() {
    // Get current page from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active nav link based on current page
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize features based on page
    switch(currentPage) {
        case 'booking.html':
            initBookingPage();
            break;
        case 'rates.html':
            initRatesPage();
            break;
        case 'currency.html':
            initCurrencyPage();
            break;
        case 'weather.html':
            initWeatherPage();
            break;
        default:
            // Dashboard page - already initialized in index.html
            break;
    }
}

// Booking page functionality
function initBookingPage() {
    console.log('Initializing booking page');
    
    // Get URL parameters for pre-filling form
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    const toParam = urlParams.get('to');
    const dateParam = urlParams.get('date');
    
    // Pre-fill form if parameters exist
    if (fromParam) {
        const fromInput = document.getElementById('bookingFrom');
        if (fromInput) fromInput.value = decodeURIComponent(fromParam);
    }
    
    if (toParam) {
        const toInput = document.getElementById('bookingTo');
        if (toInput) toInput.value = decodeURIComponent(toParam);
    }
    
    if (dateParam) {
        const dateInput = document.getElementById('bookingDate');
        if (dateInput) dateInput.value = dateParam;
    }
    
    // Transport type switching
    const transportOptions = document.querySelectorAll('.transport-type-option');
    if (transportOptions.length > 0) {
        transportOptions.forEach(option => {
            option.addEventListener('click', function() {
                transportOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update form based on selected transport type
                const type = this.getAttribute('data-type');
                updateBookingForm(type);
            });
        });
    }
    
    // Initialize date pickers with tomorrow as min date
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = tomorrowStr;
        if (!input.value) {
            input.value = tomorrowStr;
        }
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const from = document.getElementById('bookingFrom')?.value || '';
            const to = document.getElementById('bookingTo')?.value || '';
            const date = document.getElementById('bookingDate')?.value || '';
            const type = document.querySelector('.transport-type-option.active')?.getAttribute('data-type') || 'train';
            
            if (from && to && date) {
                searchTickets(type, from, to, date);
            } else {
                alert('Please fill in all fields');
            }
        });
    }
}

// Update booking form based on transport type
function updateBookingForm(type) {
    const formTitle = document.querySelector('.booking-form-title');
    const fromPlaceholder = document.getElementById('bookingFrom');
    const toPlaceholder = document.getElementById('bookingTo');
    
    if (formTitle && fromPlaceholder && toPlaceholder) {
        switch(type) {
            case 'train':
                formTitle.textContent = 'Train Ticket Booking';
                fromPlaceholder.placeholder = 'Enter departure station';
                toPlaceholder.placeholder = 'Enter arrival station';
                break;
            case 'bus':
                formTitle.textContent = 'Bus Ticket Booking';
                fromPlaceholder.placeholder = 'Enter departure city';
                toPlaceholder.placeholder = 'Enter arrival city';
                break;
            case 'flight':
                formTitle.textContent = 'Flight Ticket Booking';
                fromPlaceholder.placeholder = 'Enter departure airport';
                toPlaceholder.placeholder = 'Enter arrival airport';
                break;
        }
    }
}

// Mock ticket search function
function searchTickets(type, from, to, date) {
    console.log(`Searching ${type} tickets from ${from} to ${to} on ${date}`);
    
    // In a real application, this would be an API call
    // For demo purposes, we'll simulate a search result
    
    const resultsContainer = document.querySelector('.booking-results');
    if (!resultsContainer) return;
    
    // Show loading state
    resultsContainer.innerHTML = `
        <div class="loading-results">
            <div class="spinner"></div>
            <p>Searching for ${type} tickets...</p>
        </div>
    `;
    
    // Simulate API delay
    setTimeout(() => {
        // Mock results data
        const mockResults = {
            train: [
                { name: 'Rajdhani Express', departure: '08:00 AM', arrival: '02:30 PM', duration: '6h 30m', price: '₹1,850', available: true },
                { name: 'Shatabdi Express', departure: '10:30 AM', arrival: '05:45 PM', duration: '7h 15m', price: '₹2,150', available: true },
                { name: 'Duronto Express', departure: '11:45 PM', arrival: '07:30 AM', duration: '7h 45m', price: '₹1,650', available: false }
            ],
            bus: [
                { name: 'Volvo AC Sleeper', departure: '10:00 PM', arrival: '07:00 AM', duration: '9h', price: '₹1,200', available: true },
                { name: 'Non-AC Seater', departure: '08:30 PM', arrival: '06:00 AM', duration: '9h 30m', price: '₹650', available: true },
                { name: 'AC Semi-Sleeper', departure: '11:00 PM', arrival: '08:30 AM', duration: '9h 30m', price: '₹950', available: true }
            ],
            flight: [
                { name: 'Air India AI-203', departure: '07:30 AM', arrival: '09:45 AM', duration: '2h 15m', price: '₹5,800', available: true },
                { name: 'IndiGo 6E-512', departure: '02:15 PM', arrival: '04:30 PM', duration: '2h 15m', price: '₹6,200', available: true },
                { name: 'SpiceJet SG-789', departure: '09:00 PM', arrival: '11:15 PM', duration: '2h 15m', price: '₹4,950', available: false }
            ]
        };
        
        const results = mockResults[type] || [];
        
        // Display results
        if (results.length > 0) {
            let resultsHTML = '<h3>Available Tickets</h3>';
            
            results.forEach((ticket, index) => {
                const availableClass = ticket.available ? '' : 'sold-out';
                const availableText = ticket.available ? 'Book Now' : 'Sold Out';
                const transportClass = type === 'bus' ? 'bus' : type === 'flight' ? 'flight' : '';
                
                resultsHTML += `
                    <div class="ticket-card ${transportClass} ${availableClass}">
                        <div class="ticket-header">
                            <h4>${ticket.name}</h4>
                            <span class="ticket-price">${ticket.price}</span>
                        </div>
                        <div class="ticket-details">
                            <div class="ticket-time">
                                <div>
                                    <strong>Departure</strong>
                                    <p>${ticket.departure}</p>
                                </div>
                                <div class="ticket-duration">
                                    <i class="fas fa-clock"></i>
                                    <span>${ticket.duration}</span>
                                </div>
                                <div>
                                    <strong>Arrival</strong>
                                    <p>${ticket.arrival}</p>
                                </div>
                            </div>
                            <button class="btn-book-ticket" ${ticket.available ? '' : 'disabled'}>
                                ${availableText}
                            </button>
                        </div>
                    </div>
                `;
            });
            
            resultsContainer.innerHTML = resultsHTML;
            
            // Add event listeners to book buttons
            const bookButtons = document.querySelectorAll('.btn-book-ticket');
            bookButtons.forEach(button => {
                if (!button.disabled) {
                    button.addEventListener('click', function() {
                        const ticketCard = this.closest('.ticket-card');
                        const ticketName = ticketCard.querySelector('h4').textContent;
                        const ticketPrice = ticketCard.querySelector('.ticket-price').textContent;
                        
                        alert(`Booking confirmed for ${ticketName} at ${ticketPrice}. Thank you!`);
                        
                        // In a real app, this would redirect to payment page
                    });
                }
            });
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No tickets found for your search criteria.</p>
                </div>
            `;
        }
    }, 1500);
}

// Rates page functionality
function initRatesPage() {
    console.log('Initializing rates page');
    
    // Initialize charts for gold and silver rates
    initRatesCharts();
    
    // Simulate real-time updates
    simulateRateUpdates();
}

// Initialize charts for rates page
function initRatesCharts() {
    const goldChartCtx = document.getElementById('goldChart')?.getContext('2d');
    const silverChartCtx = document.getElementById('silverChart')?.getContext('2d');
    
    if (goldChartCtx) {
        new Chart(goldChartCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Gold (24K) per gram',
                    data: [5200, 5300, 5450, 5600, 5800, 5900, 6000, 6100, 6150, 6200, 6250, 6300],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Gold Price Trends (2023)',
                        color: '#e0e0e0',
                        font: {
                            size: 16
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    if (silverChartCtx) {
        new Chart(silverChartCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Silver per gram',
                    data: [68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 78.5, 79],
                    borderColor: '#C0C0C0',
                    backgroundColor: 'rgba(192, 192, 192, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Silver Price Trends (2023)',
                        color: '#e0e0e0',
                        font: {
                            size: 16
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Simulate rate updates
function simulateRateUpdates() {
    // In a real app, this would connect to a live API
    // For demo, we'll simulate small changes every 30 seconds
    setInterval(() => {
        const goldRateElement = document.querySelector('.gold-rate .current-rate');
        const silverRateElement = document.querySelector('.silver-rate .current-rate');
        
        if (goldRateElement) {
            const currentGold = parseFloat(goldRateElement.textContent.replace(/[^0-9.]/g, ''));
            const change = (Math.random() - 0.5) * 10; // Random change between -5 and +5
            const newGold = currentGold + change;
            
            goldRateElement.textContent = `₹${newGold.toFixed(1)} / gram`;
            
            // Update change indicator
            const goldChangeElement = document.querySelector('.gold-rate .rate-change');
            if (goldChangeElement) {
                const isPositive = change >= 0;
                goldChangeElement.textContent = `${isPositive ? '+' : ''}${change.toFixed(1)}`;
                goldChangeElement.className = `rate-change ${isPositive ? 'positive' : 'negative'}`;
            }
        }
        
        if (silverRateElement) {
            const currentSilver = parseFloat(silverRateElement.textContent.replace(/[^0-9.]/g, ''));
            const change = (Math.random() - 0.5) * 0.5; // Random change between -0.25 and +0.25
            const newSilver = currentSilver + change;
            
            silverRateElement.textContent = `₹${newSilver.toFixed(2)} / gram`;
            
            // Update change indicator
            const silverChangeElement = document.querySelector('.silver-rate .rate-change');
            if (silverChangeElement) {
                const isPositive = change >= 0;
                silverChangeElement.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)}`;
                silverChangeElement.className = `rate-change ${isPositive ? 'positive' : 'negative'}`;
            }
        }
    }, 30000); // Update every 30 seconds for demo
}

// Currency page functionality
function initCurrencyPage() {
    console.log('Initializing currency page');
    
    // Initialize currency converter
    initCurrencyConverter();
    
    // Initialize currency table
    initCurrencyTable();
}

// Initialize currency converter
function initCurrencyConverter() {
    const fromCurrency = document.getElementById('currencyFrom');
    const toCurrency = document.getElementById('currencyTo');
    const fromAmount = document.getElementById('currencyAmount');
    const toAmount = document.getElementById('convertedAmount');
    const swapBtn = document.getElementById('swapCurrency');
    const convertBtn = document.getElementById('convertCurrency');
    
    if (!fromCurrency || !toCurrency || !fromAmount || !toAmount) return;
    
    // Mock exchange rates (in a real app, this would come from an API)
    const exchangeRates = {
        'USD': { 'INR': 83.0, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 146.0, 'CAD': 1.35, 'AUD': 1.52, 'CHF': 0.88, 'CNY': 7.28, 'USD': 1 },
        'INR': { 'USD': 0.01205, 'EUR': 0.01105, 'GBP': 0.00955, 'JPY': 1.76, 'CAD': 0.0163, 'AUD': 0.0183, 'CHF': 0.0106, 'CNY': 0.087, 'INR': 1 },
        'EUR': { 'USD': 1.09, 'INR': 90.5, 'GBP': 0.86, 'JPY': 159.0, 'CAD': 1.47, 'AUD': 1.65, 'CHF': 0.96, 'CNY': 7.92, 'EUR': 1 },
        'GBP': { 'USD': 1.27, 'INR': 104.7, 'EUR': 1.16, 'JPY': 185.0, 'CAD': 1.71, 'AUD': 1.92, 'CHF': 1.11, 'CNY': 9.18, 'GBP': 1 },
        'JPY': { 'USD': 0.0068, 'INR': 0.57, 'EUR': 0.0063, 'GBP': 0.0054, 'CAD': 0.0092, 'AUD': 0.0104, 'CHF': 0.0060, 'CNY': 0.0497, 'JPY': 1 }
    };
    
    // Function to perform conversion
    function performConversion() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = parseFloat(fromAmount.value) || 0;
        
        if (from === to) {
            toAmount.value = amount.toFixed(2);
            updateConversionRate(from, to);
            return;
        }
        
        if (exchangeRates[from] && exchangeRates[from][to]) {
            const rate = exchangeRates[from][to];
            const result = amount * rate;
            
            toAmount.value = result.toFixed(2);
            updateConversionRate(from, to);
        } else {
            // If direct rate not available, convert via USD
            const usdRate = exchangeRates[from]['USD'];
            const toRate = exchangeRates['USD'][to];
            const result = amount * usdRate * toRate;
            
            toAmount.value = result.toFixed(2);
            updateConversionRate(from, to, usdRate * toRate);
        }
    }
    
    // Update conversion rate display
    function updateConversionRate(from, to, customRate = null) {
        const rateElement = document.getElementById('conversionRate');
        if (!rateElement) return;
        
        let rate;
        if (customRate) {
            rate = customRate;
        } else if (from === to) {
            rate = 1;
        } else {
            rate = exchangeRates[from] && exchangeRates[from][to] ? exchangeRates[from][to] : 0;
        }
        
        rateElement.textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
    }
    
    // Event listeners
    fromCurrency.addEventListener('change', performConversion);
    toCurrency.addEventListener('change', performConversion);
    fromAmount.addEventListener('input', performConversion);
    
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            const temp = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = temp;
            
            performConversion();
        });
    }
    
    if (convertBtn) {
        convertBtn.addEventListener('click', performConversion);
    }
    
    // Initial conversion
    performConversion();
}

// Initialize currency table
function initCurrencyTable() {
    const tableBody = document.querySelector('.currency-table tbody');
    if (!tableBody) return;
    
    // Mock currency data
    const currencies = [
        { code: 'USD', name: 'US Dollar', rate: 1.0000, change: 0.00 },
        { code: 'EUR', name: 'Euro', rate: 0.9200, change: -0.12 },
        { code: 'GBP', name: 'British Pound', rate: 0.7900, change: -0.08 },
        { code: 'JPY', name: 'Japanese Yen', rate: 146.0000, change: 0.45 },
        { code: 'INR', name: 'Indian Rupee', rate: 83.0000, change: 0.12 },
        { code: 'CAD', name: 'Canadian Dollar', rate: 1.3500, change: 0.05 },
        { code: 'AUD', name: 'Australian Dollar', rate: 1.5200, change: 0.18 },
        { code: 'CHF', name: 'Swiss Franc', rate: 0.8800, change: -0.03 },
        { code: 'CNY', name: 'Chinese Yuan', rate: 7.2800, change: 0.02 }
    ];
    
    // Populate table
    tableBody.innerHTML = '';
    
    currencies.forEach(currency => {
        const row = document.createElement('tr');
        const changeClass = currency.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = currency.change >= 0 ? '+' : '';
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center;">
                    <div class="currency-flag">${currency.code.charAt(0)}</div>
                    <div class="currency-info">
                        <strong>${currency.code}</strong>
                        <span>${currency.name}</span>
                    </div>
                </div>
            </td>
            <td>${currency.rate.toFixed(4)}</td>
            <td class="${changeClass}">${changeSymbol}${currency.change.toFixed(2)}%</td>
            <td>
                <button class="btn-use-currency" data-code="${currency.code}">Use</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to "Use" buttons
    const useButtons = document.querySelectorAll('.btn-use-currency');
    useButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currencyCode = this.getAttribute('data-code');
            const fromCurrency = document.getElementById('currencyFrom');
            const toCurrency = document.getElementById('currencyTo');
            
            // Set the selected currency as "from" currency
            if (fromCurrency) {
                fromCurrency.value = currencyCode;
                
                // Trigger conversion
                const event = new Event('change');
                fromCurrency.dispatchEvent(event);
            }
        });
    });
}

// Weather page functionality
function initWeatherPage() {
    console.log('Initializing weather page');
    
    // Initialize city selection
    initCitySelection();
    
    // Initialize default weather display
    displayWeather('New Delhi');
}

// Initialize city selection
function initCitySelection() {
    const citySelect = document.getElementById('citySelect');
    const searchCity = document.getElementById('searchCity');
    const searchBtn = document.getElementById('searchWeather');
    
    if (citySelect) {
        // Mock cities data
        const cities = [
            { name: 'New Delhi', country: 'India' },
            { name: 'Mumbai', country: 'India' },
            { name: 'Bangalore', country: 'India' },
            { name: 'Chennai', country: 'India' },
            { name: 'Kolkata', country: 'India' },
            { name: 'London', country: 'UK' },
            { name: 'New York', country: 'USA' },
            { name: 'Tokyo', country: 'Japan' },
            { name: 'Sydney', country: 'Australia' },
            { name: 'Paris', country: 'France' }
        ];
        
        // Populate select dropdown
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = `${city.name}, ${city.country}`;
            citySelect.appendChild(option);
        });
        
        // Add change event
        citySelect.addEventListener('change', function() {
            displayWeather(this.value);
        });
    }
    
    // Search functionality
    if (searchBtn && searchCity) {
        searchBtn.addEventListener('click', function() {
            const city = searchCity.value.trim();
            if (city) {
                displayWeather(city);
            }
        });
        
        // Allow Enter key to trigger search
        searchCity.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const city = searchCity.value.trim();
                if (city) {
                    displayWeather(city);
                }
            }
        });
    }
}

// Display weather for a city
function displayWeather(city) {
    console.log(`Displaying weather for ${city}`);
    
    // Show loading state
    const weatherContainer = document.querySelector('.weather-details-container');
    const forecastContainer = document.querySelector('.weather-forecast');
    
    if (weatherContainer) {
        weatherContainer.innerHTML = `
            <div class="loading-weather">
                <div class="spinner"></div>
                <p>Loading weather data for ${city}...</p>
            </div>
        `;
    }
    
    if (forecastContainer) {
        forecastContainer.innerHTML = '';
    }
    
    // Simulate API delay
    setTimeout(() => {
        // Mock weather data
        const mockWeather = {
            'New Delhi': {
                current: {
                    temp: 28,
                    feels_like: 30,
                    condition: 'Partly Cloudy',
                    humidity: 45,
                    wind: 12,
                    pressure: 1013,
                    icon: 'cloud-sun'
                },
                forecast: [
                    { day: 'Today', high: 32, low: 26, condition: 'Partly Cloudy', icon: 'cloud-sun' },
                    { day: 'Tue', high: 33, low: 27, condition: 'Sunny', icon: 'sun' },
                    { day: 'Wed', high: 31, low: 25, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Thu', high: 29, low: 24, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Fri', high: 30, low: 25, condition: 'Cloudy', icon: 'cloud' }
                ]
            },
            'Mumbai': {
                current: {
                    temp: 32,
                    feels_like: 38,
                    condition: 'Humid',
                    humidity: 75,
                    wind: 8,
                    pressure: 1010,
                    icon: 'cloud'
                },
                forecast: [
                    { day: 'Today', high: 34, low: 28, condition: 'Humid', icon: 'cloud' },
                    { day: 'Tue', high: 35, low: 29, condition: 'Sunny', icon: 'sun' },
                    { day: 'Wed', high: 33, low: 28, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Thu', high: 32, low: 27, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Fri', high: 33, low: 28, condition: 'Partly Cloudy', icon: 'cloud-sun' }
                ]
            },
            'London': {
                current: {
                    temp: 12,
                    feels_like: 10,
                    condition: 'Cloudy',
                    humidity: 68,
                    wind: 18,
                    pressure: 1015,
                    icon: 'cloud'
                },
                forecast: [
                    { day: 'Today', high: 13, low: 9, condition: 'Cloudy', icon: 'cloud' },
                    { day: 'Tue', high: 14, low: 10, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Wed', high: 12, low: 8, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Thu', high: 11, low: 7, condition: 'Cloudy', icon: 'cloud' },
                    { day: 'Fri', high: 13, low: 8, condition: 'Partly Cloudy', icon: 'cloud-sun' }
                ]
            },
            'New York': {
                current: {
                    temp: 18,
                    feels_like: 17,
                    condition: 'Sunny',
                    humidity: 55,
                    wind: 10,
                    pressure: 1018,
                    icon: 'sun'
                },
                forecast: [
                    { day: 'Today', high: 20, low: 16, condition: 'Sunny', icon: 'sun' },
                    { day: 'Tue', high: 19, low: 15, condition: 'Partly Cloudy', icon: 'cloud-sun' },
                    { day: 'Wed', high: 17, low: 13, condition: 'Rain', icon: 'cloud-rain' },
                    { day: 'Thu', high: 16, low: 12, condition: 'Cloudy', icon: 'cloud' },
                    { day: 'Fri', high: 18, low: 14, condition: 'Sunny', icon: 'sun' }
                ]
            }
        };
        
        // Get weather data for city or default
        const weatherData = mockWeather[city] || mockWeather['New Delhi'];
        
        // Update current weather display
        if (weatherContainer) {
            weatherContainer.innerHTML = `
                <div class="current-weather-card">
                    <div class="current-weather-header">
                        <h3>${city}</h3>
                        <p>Current Weather</p>
                    </div>
                    <div class="current-weather-body">
                        <div class="current-temp">
                            <i class="fas fa-${weatherData.current.icon}"></i>
                            <h1>${weatherData.current.temp}°C</h1>
                            <p>Feels like ${weatherData.current.feels_like}°C</p>
                        </div>
                        <div class="weather-stats">
                            <div class="weather-stat">
                                <i class="fas fa-wind"></i>
                                <div>
                                    <span>Wind</span>
                                    <strong>${weatherData.current.wind} km/h</strong>
                                </div>
                            </div>
                            <div class="weather-stat">
                                <i class="fas fa-tint"></i>
                                <div>
                                    <span>Humidity</span>
                                    <strong>${weatherData.current.humidity}%</strong>
                                </div>
                            </div>
                            <div class="weather-stat">
                                <i class="fas fa-tachometer-alt"></i>
                                <div>
                                    <span>Pressure</span>
                                    <strong>${weatherData.current.pressure} hPa</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Update forecast display
        if (forecastContainer) {
            let forecastHTML = '<h3>5-Day Forecast</h3><div class="forecast-cards">';
            
            weatherData.forecast.forEach(day => {
                forecastHTML += `
                    <div class="forecast-card">
                        <h4>${day.day}</h4>
                        <i class="fas fa-${day.icon}"></i>
                        <div class="forecast-temp">
                            <span class="high-temp">${day.high}°</span>
                            <span class="low-temp">${day.low}°</span>
                        </div>
                        <p>${day.condition}</p>
                    </div>
                `;
            });
            
            forecastHTML += '</div>';
            forecastContainer.innerHTML = forecastHTML;
        }
    }, 1000);
}
// auth.js - Student Authentication Module

// Add these functions to your existing script.js file

// Check if user is logged in
function checkAuth() {
    const studentSession = JSON.parse(localStorage.getItem('studentSession'));
    return studentSession !== null;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('studentSession'));
}

// Update navigation based on auth status
function updateNavigation() {
    const studentSession = getCurrentUser();
    const navUser = document.querySelector('.nav-user');
    
    if(navUser && studentSession) {
        navUser.innerHTML = `
            <div class="user-dropdown">
                <div class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <span>${studentSession.fullName || studentSession.email.split('@')[0]}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="dropdown-menu">
                    <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
        
        // Add logout functionality
        document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
            e.preventDefault();
            if(confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('studentSession');
                window.location.href = 'login.html';
            }
        });
    }
}

// Protect pages that require authentication
function protectPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages that require authentication (except login/register)
    const protectedPages = ['index.html', 'booking.html', 'rates.html', 'currency.html', 'weather.html', 'profile.html'];
    
    if(protectedPages.includes(currentPage) && !checkAuth()) {
        window.location.href = 'login.html';
    }
    
    // Redirect logged-in users away from login/register pages
    if((currentPage === 'login.html' || currentPage === 'register.html') && checkAuth()) {
        window.location.href = 'index.html';
    }
}

// Initialize authentication
function initAuth() {
    protectPage();
    updateNavigation();
}

// Call this function in your main DOMContentLoaded event
// Add: initAuth();