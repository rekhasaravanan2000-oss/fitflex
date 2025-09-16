// Exercise and Equipment Data
const exerciseData = [
    {
        id: 1,
        name: "Barbell Bench Press",
        category: "chest",
        difficulty: "Intermediate",
        equipment: "Barbell",
        target: "Chest",
        type: "equipment",
        isPremium: false,
        instructions: [
            "Lie flat on bench with eyes under the bar",
            "Grip bar with hands slightly wider than shoulder-width",
            "Lower bar to chest with control",
            "Press bar back up to starting position"
        ]
    },
    {
        id: 2,
        name: "Dumbbell Bicep Curls",
        category: "arms",
        difficulty: "Beginner",
        equipment: "Dumbbell",
        target: "Biceps",
        type: "equipment",
        isPremium: false,
        instructions: [
            "Stand with feet shoulder-width apart",
            "Hold dumbbells at your sides",
            "Curl weights up towards shoulders",
            "Lower back down with control"
        ]
    },
    {
        id: 3,
        name: "Advanced Deadlift Variations",
        category: "back",
        difficulty: "Advanced",
        equipment: "Barbell",
        target: "Back, Glutes",
        type: "equipment",
        isPremium: true,
        instructions: [
            "Premium exercise with detailed video instruction",
            "Multiple variation techniques",
            "Progressive overload strategies",
            "Form correction tips from certified trainers"
        ]
    },
    {
        id: 4,
        name: "Push-ups",
        category: "chest",
        difficulty: "Beginner",
        equipment: "None",
        target: "Chest, Arms",
        type: "bodyweight",
        isPremium: false,
        instructions: [
            "Start in plank position",
            "Lower body until chest nearly touches floor",
            "Push back up to starting position",
            "Keep core engaged throughout"
        ]
    },
    {
        id: 5,
        name: "Elite HIIT Training",
        category: "cardio",
        difficulty: "Advanced",
        equipment: "None",
        target: "Full Body",
        type: "bodyweight",
        isPremium: true,
        instructions: [
            "Premium HIIT workout series",
            "Customized intensity levels",
            "Real-time heart rate monitoring guidance",
            "Recovery optimization protocols"
        ]
    },
    {
        id: 6,
        name: "Plank",
        category: "abs",
        difficulty: "Beginner",
        equipment: "None",
        target: "Core",
        type: "bodyweight",
        isPremium: false,
        instructions: [
            "Start in push-up position",
            "Hold body in straight line",
            "Engage core muscles",
            "Breathe normally while holding"
        ]
    }
];

const equipmentData = [
    {
        id: 1,
        name: "Professional Adjustable Dumbbells",
        price: 299.99,
        originalPrice: 399.99,
        description: "High-quality adjustable dumbbells perfect for home workouts. Weight range: 5-50 lbs each.",
        features: ["Adjustable weight", "Space-saving design", "Durable construction", "Quick weight changes"],
        category: "weights",
        inStock: true
    },
    {
        id: 2,
        name: "Olympic Barbell Set",
        price: 449.99,
        originalPrice: 599.99,
        description: "Complete Olympic barbell set with plates. Perfect for serious strength training.",
        features: ["45lb Olympic bar", "Weight plates included", "Knurled grip", "Standard size"],
        category: "weights",
        inStock: true
    },
    {
        id: 3,
        name: "Premium Resistance Bands Set",
        price: 79.99,
        originalPrice: 119.99,
        description: "Complete resistance band set with multiple resistance levels and accessories.",
        features: ["5 resistance levels", "Door anchor included", "Comfortable handles", "Exercise guide"],
        category: "accessories",
        inStock: true
    },
    {
        id: 4,
        name: "Smart Fitness Mirror",
        price: 1299.99,
        originalPrice: 1599.99,
        description: "Interactive fitness mirror with live classes and personal training sessions.",
        features: ["Live streaming classes", "Personal training", "Progress tracking", "Multiple workout types"],
        category: "technology",
        inStock: false
    },
    {
        id: 5,
        name: "Yoga Mat Premium",
        price: 59.99,
        originalPrice: 79.99,
        description: "Non-slip premium yoga mat perfect for all types of workouts.",
        features: ["Non-slip surface", "Extra cushioning", "Eco-friendly material", "Easy to clean"],
        category: "accessories",
        inStock: true
    },
    {
        id: 6,
        name: "Adjustable Bench",
        price: 249.99,
        originalPrice: 329.99,
        description: "Versatile adjustable bench for strength training and stretching.",
        features: ["Multiple positions", "Sturdy construction", "Compact design", "Easy adjustment"],
        category: "equipment",
        inStock: true
    }
];

// User subscription status
let userSubscription = {
    plan: 'free',
    isActive: false
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupEventListeners();
    loadExercises();
    loadEquipment();
});

function initializeApp() {
    // Check for saved user subscription
    const savedSubscription = localStorage.getItem('userSubscription');
    if (savedSubscription) {
        userSubscription = JSON.parse(savedSubscription);
        updateUIForSubscription();
    }

    // Add scroll event for navbar
    window.addEventListener('scroll', handleNavbarScroll);
}

function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');

            const filter = e.target.getAttribute('data-filter');
            filterExercises(filter);
        });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchExercises);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchExercises();
            }
        });
    }
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
}

function loadExercises(filter = 'all') {
    const exerciseGrid = document.getElementById('exerciseGrid');
    if (!exerciseGrid) return;

    let filteredExercises = exerciseData;

    if (filter !== 'all') {
        filteredExercises = exerciseData.filter(exercise =>
            exercise.category === filter || exercise.type === filter
        );
    }

    exerciseGrid.innerHTML = filteredExercises.map(exercise => `
        <div class="exercise-card fade-in" onclick="openExerciseDetails(${exercise.id})">
            <div class="exercise-image">
                <i class="fas fa-dumbbell"></i>
            </div>
            <div class="exercise-info">
                <h3>${exercise.name}</h3>
                <p>${exercise.target} • ${exercise.difficulty}</p>
                <div class="exercise-meta">
                    <span>${exercise.equipment}</span>
                    ${exercise.isPremium ? '<span class="premium-badge">Premium</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function loadEquipment() {
    const equipmentGrid = document.getElementById('equipmentGrid');
    if (!equipmentGrid) return;

    equipmentGrid.innerHTML = equipmentData.map(item => `
        <div class="equipment-card fade-in" onclick="openEquipmentModal(${item.id})">
            <div class="equipment-image">
                <i class="fas fa-dumbbell"></i>
            </div>
            <div class="equipment-info">
                <h3>${item.name}</h3>
                <div class="equipment-price">
                    $${item.price}
                    ${item.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 1rem; margin-left: 10px;">$${item.originalPrice}</span>` : ''}
                </div>
                <p>${item.description}</p>
                <button class="btn-primary" onclick="event.stopPropagation(); purchaseEquipment(${item.id})">
                    ${item.inStock ? 'Buy Now' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
}

function filterExercises(category) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    loadExercises(category);
}

function searchExercises() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        loadExercises();
        return;
    }

    const filteredExercises = exerciseData.filter(exercise =>
        exercise.name.toLowerCase().includes(query) ||
        exercise.target.toLowerCase().includes(query) ||
        exercise.category.toLowerCase().includes(query) ||
        exercise.equipment.toLowerCase().includes(query)
    );

    const exerciseGrid = document.getElementById('exerciseGrid');
    if (!exerciseGrid) return;

    if (filteredExercises.length === 0) {
        exerciseGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #ccc;">
                <h3>No exercises found</h3>
                <p>Try searching for different terms like "chest", "arms", or "cardio"</p>
            </div>
        `;
        return;
    }

    exerciseGrid.innerHTML = filteredExercises.map(exercise => `
        <div class="exercise-card fade-in" onclick="openExerciseDetails(${exercise.id})">
            <div class="exercise-image">
                <i class="fas fa-dumbbell"></i>
            </div>
            <div class="exercise-info">
                <h3>${exercise.name}</h3>
                <p>${exercise.target} • ${exercise.difficulty}</p>
                <div class="exercise-meta">
                    <span>${exercise.equipment}</span>
                    ${exercise.isPremium ? '<span class="premium-badge">Premium</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function openExerciseDetails(exerciseId) {
    const exercise = exerciseData.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    // Check if premium exercise and user doesn't have premium
    if (exercise.isPremium && userSubscription.plan === 'free') {
        showSubscriptionModal();
        return;
    }

    // Create and show exercise details modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${exercise.name}</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                <div>
                    <h3>Exercise Details</h3>
                    <p><strong>Target:</strong> ${exercise.target}</p>
                    <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
                    <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                    ${exercise.isPremium ? '<p><span class="premium-badge">Premium Exercise</span></p>' : ''}
                </div>
                <div style="background: #444; padding: 2rem; border-radius: 15px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-play-circle" style="font-size: 4rem; color: #ff6b35;"></i>
                </div>
            </div>
            <div>
                <h3>Instructions</h3>
                <ol style="color: #ccc; line-height: 1.8;">
                    ${exercise.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Modal Functions
function showSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openEquipmentModal(equipmentId) {
    const equipment = equipmentData.find(item => item.id === equipmentId);
    if (!equipment) return;

    const modal = document.getElementById('equipmentModal');
    const detailsContainer = document.getElementById('equipmentDetails');

    if (!modal || !detailsContainer) return;

    detailsContainer.innerHTML = `
        <h2>${equipment.name}</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
            <div style="background: #444; padding: 2rem; border-radius: 15px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-dumbbell" style="font-size: 4rem; color: #ff6b35;"></i>
            </div>
            <div>
                <div class="equipment-price" style="font-size: 2rem; margin-bottom: 1rem;">
                    $${equipment.price}
                    ${equipment.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 1.5rem; margin-left: 10px;">$${equipment.originalPrice}</span>` : ''}
                </div>
                <p style="color: #ccc; margin-bottom: 1rem;">${equipment.description}</p>
                <h4 style="color: #ff6b35; margin-bottom: 0.5rem;">Features:</h4>
                <ul style="color: #ccc; margin-bottom: 2rem;">
                    ${equipment.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="btn-primary" onclick="purchaseEquipment(${equipment.id})" ${!equipment.inStock ? 'disabled' : ''}>
                    ${equipment.inStock ? 'Buy Now' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeEquipmentModal() {
    const modal = document.getElementById('equipmentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Subscription and Payment Functions
function selectPlan(planType) {
    if (planType === 'free') {
        userSubscription = { plan: 'free', isActive: true };
        localStorage.setItem('userSubscription', JSON.stringify(userSubscription));
        updateUIForSubscription();
        alert('Welcome to FitFlex Free! You now have access to basic workouts.');
        return;
    }

    const prices = {
        premium: 1900, // $19.00 in cents
        elite: 3900    // $39.00 in cents
    };

    initiatePurchase(planType, prices[planType]);
}

function initiatePurchase(planType, priceInCents) {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        // For demo purposes, we'll simulate a successful payment
        // In a real app, this would integrate with Stripe

        if (planType) {
            userSubscription = { plan: planType, isActive: true };
            localStorage.setItem('userSubscription', JSON.stringify(userSubscription));
            updateUIForSubscription();
            closeSubscriptionModal();

            alert(`Welcome to FitFlex ${planType.charAt(0).toUpperCase() + planType.slice(1)}! You now have access to all premium features.`);
        }

        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

function purchaseEquipment(equipmentId) {
    const equipment = equipmentData.find(item => item.id === equipmentId);
    if (!equipment || !equipment.inStock) return;

    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        alert(`Thank you for purchasing ${equipment.name}! Your order will be shipped within 3-5 business days.`);

        // Reset button
        button.textContent = originalText;
        button.disabled = false;

        closeEquipmentModal();
    }, 2000);
}

function updateUIForSubscription() {
    const premiumButtons = document.querySelectorAll('.premium-btn');
    premiumButtons.forEach(btn => {
        if (userSubscription.plan !== 'free') {
            btn.textContent = 'Premium Active';
            btn.style.background = '#4ade80';
        }
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modals when clicking outside
window.addEventListener('click', function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add smooth scrolling to all anchor links
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

// Revenue Analytics (for demonstration)
const revenueData = {
    subscriptions: {
        premium: { count: 1247, revenue: 23693 },
        elite: { count: 423, revenue: 16497 }
    },
    equipment: {
        totalSales: 89432,
        popularItems: ['Adjustable Dumbbells', 'Resistance Bands', 'Yoga Mat']
    },
    affiliateCommissions: 5643
};

// Function to display revenue analytics (for admin dashboard)
function displayRevenueAnalytics() {
    console.log('Revenue Analytics:', revenueData);
    console.log(`Total Monthly Subscription Revenue: $${(revenueData.subscriptions.premium.revenue + revenueData.subscriptions.elite.revenue) / 100}`);
    console.log(`Total Equipment Sales: $${revenueData.equipment.totalSales / 100}`);
    console.log(`Affiliate Commissions: $${revenueData.affiliateCommissions / 100}`);
}

// Initialize revenue tracking
if (window.location.hash === '#admin') {
    displayRevenueAnalytics();
}