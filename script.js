// ===== GLOBAL VARIABLES =====
// These variables have global scope and can be accessed from any function
const animationElements = ['box', 'circle'];
let isSpinning = false;
let animationIntervals = {};

// ===== ANIMATION FUNCTIONS =====
/**
 * Applies a specific animation to an element
 * @param {string} elementId - The ID of the element to animate
 * @param {string} animationName - The name of the animation class to apply
 * @returns {boolean} - Returns true if animation was applied successfully
 */
function applyAnimation(elementId, animationName) {
    // This variable has local scope and is only accessible within this function
    const element = document.getElementById(elementId);
    
    if (!element) {
        updateStatus('Element not found: ' + elementId, 'error');
        return false;
    }
    
    // First reset any existing animations
    resetElementAnimation(element);
    
    // Add the new animation class
    element.classList.add(animationName);
    
    updateStatus(`Applied ${animationName} to ${elementId}`, 'success');
    return true;
}

/**
 * Resets animation on a specific element
 * @param {HTMLElement} element - The DOM element to reset
 */
function resetElementAnimation(element) {
    // Remove all animation classes
    element.classList.remove('pulse', 'bounce', 'spin', 'shake', 'fade-in', 'slide-in');
    
    // Force reflow to ensure animation reset
    void element.offsetWidth;
}

/**
 * Resets all animations on the page
 */
function resetAnimations() {
    // Clear any interval-based animations
    for (const id in animationIntervals) {
        clearInterval(animationIntervals[id]);
    }
    animationIntervals = {};
    
    // Reset specific elements
    animationElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) resetElementAnimation(element);
    });
    
    isSpinning = false;
    updateStatus('All animations reset', 'info');
}

/**
 * Toggles spin animation on the circle element
 */
function toggleSpin() {
    const circle = document.getElementById('circle');
    if (!circle) return;
    
    if (isSpinning) {
        circle.classList.remove('spin');
        updateStatus('Spin animation stopped', 'info');
    } else {
        resetElementAnimation(circle);
        circle.classList.add('spin');
        updateStatus('Spin animation started', 'success');
    }
    
    isSpinning = !isSpinning;
}

/**
 * Triggers shake animation on the box element
 */
function triggerShake() {
    const box = document.getElementById('box');
    if (!box) return;
    
    resetElementAnimation(box);
    box.classList.add('shake');
    
    // Remove shake class after animation completes
    setTimeout(() => {
        box.classList.remove('shake');
    }, 500);
    
    updateStatus('Shake animation triggered', 'success');
}

// ===== MODAL FUNCTIONS =====
/**
 * Shows the modal with transition
 */
function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
    updateStatus('Modal opened', 'success');
}

/**
 * Hides the modal with transition
 */
function hideModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    updateStatus('Modal closed', 'info');
}

// ===== UTILITY FUNCTIONS =====
/**
 * Updates the status message
 * @param {string} message - The status message to display
 * @param {string} type - The type of status (info, success, error)
 */
function updateStatus(message, type = 'info') {
    const statusElement = document.getElementById('status');
    if (!statusElement) return;
    
    statusElement.textContent = 'Status: ' + message;
    statusElement.style.backgroundColor = 
        type === 'error' ? '#ffecec' : 
        type === 'success' ? '#ecfef0' : '#f8f9fa';
    statusElement.style.color = 
        type === 'error' ? '#e74c3c' : 
        type === 'success' ? '#27ae60' : '#7f8c8d';
}

/**
 * Generates a random color in hexadecimal format
 * @returns {string} - Random color in #RRGGBB format
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ===== DEMONSTRATION FUNCTIONS =====
/**
 * Calculates the area of a rectangle and displays it
 */
function calculateArea() {
    // These variables have local function scope
    const width = 10;
    const height = 5;
    
    // Call another function to perform the calculation
    const area = calculateRectangleArea(width, height);
    
    // Display the result
    document.getElementById('output').innerHTML = 
        `The area of a rectangle with width ${width} and height ${height} is <strong>${area}</strong>`;
    
    updateStatus('Area calculation completed', 'success');
}

/**
 * Calculates the area of a rectangle
 * @param {number} width - The width of the rectangle
 * @param {number} height - The height of the rectangle
 * @returns {number} - The calculated area
 */
function calculateRectangleArea(width, height) {
    // This variable has local function scope
    const area = width * height;
    return area;
}

/**
 * Demonstrates string manipulation functions
 */
function stringManipulation() {
    // Original string (local variable)
    const originalString = "Hello World!";
    
    // Call functions to manipulate the string
    const reversed = reverseString(originalString);
    const capitalized = capitalizeString(originalString);
    
    // Display results
    document.getElementById('output').innerHTML = 
        `Original: <strong>${originalString}</strong><br>
         Reversed: <strong>${reversed}</strong><br>
         Capitalized: <strong>${capitalized}</strong>`;
    
    updateStatus('String manipulation completed', 'success');
}

/**
 * Reverses a string
 * @param {string} str - The string to reverse
 * @returns {string} - The reversed string
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}

/**
 * Capitalizes a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeString(str) {
    return str.toUpperCase();
}

/**
 * Applies a random color to the box element
 */
function randomColor() {
    const box = document.getElementById('box');
    if (!box) return;
    
    // Get a random color using our utility function
    const color = getRandomColor();
    
    // Apply the color with a transition
    box.style.transition = 'background-color 0.5s ease';
    box.style.backgroundColor = color;
    
    document.getElementById('output').innerHTML = 
        `Box color changed to: <strong>${color}</strong>`;
    
    updateStatus('Random color applied', 'success');
}

// ===== CONTROL PANEL FUNCTIONS =====
/**
 * Starts all available animations
 */
function startAnimations() {
    applyAnimation('box', 'pulse');
    applyAnimation('circle', 'bounce');
    
    // Create an interval-based animation for demonstration
    let counter = 0;
    const outputElement = document.getElementById('output');
    
    animationIntervals.counter = setInterval(() => {
        counter++;
        if (outputElement) {
            outputElement.innerHTML = `Animation running for <strong>${counter}</strong> seconds`;
        }
    }, 1000);
    
    updateStatus('All animations started', 'success');
}

/**
 * Stops all animations
 */
function stopAnimations() {
    resetAnimations();
    document.getElementById('output').innerHTML = 'Animations stopped';
    updateStatus('All animations stopped', 'info');
}

/**
 * Fades in all card elements
 */
function fadeInElements() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Reset animation first
        card.classList.remove('fade-in');
        void card.offsetWidth; // Force reflow
        
        // Apply fade-in with staggered delay
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    updateStatus('Fade-in animation applied to all cards', 'success');
}

// ===== INITIALIZATION =====
// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', function() {
    updateStatus('Page loaded successfully', 'success');
    
    // Apply initial animations after a short delay
    setTimeout(() => {
        fadeInElements();
        applyAnimation('box', 'fade-in');
        applyAnimation('circle', 'slide-in');
    }, 500);
});