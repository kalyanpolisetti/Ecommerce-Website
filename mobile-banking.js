

// 1. GLOBAL VARIABLE: Target Page
let selectedTarget = "card-details.html";

// 2. ON LOAD: Populate Cart Data
// window.onload = function() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const priceDisplay = document.getElementById("total-price");
//     const listContainer = document.getElementById("item-list-mini");
//     let total = 0;

window.onload = function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const priceDisplay = document.getElementById("total-price");
    const listContainer = document.getElementById("item-list-mini");
    let total=0;
    
    // 1. Check if we have a discounted price from the previous pages
    let savedTotal = localStorage.getItem('finalOrderTotal');
    
    if (savedTotal) {
        // Use the discounted price
        if (priceDisplay) priceDisplay.innerText = `₹${savedTotal}`;
    } else {
        // Fallback: Calculate from scratch if no discount was applied
        let total = 0;
        cart.forEach(item => {
            total += (parseFloat(item.price) * (item.quantity || 1));
        });
        if (priceDisplay) priceDisplay.innerText = `₹${total.toFixed(2)}`;
        localStorage.setItem('finalOrderTotal', total.toFixed(2));
    }

    if (listContainer) listContainer.innerHTML = ""; // Clear existing

    cart.forEach(item => {
        const price = parseFloat(item.price || item.price || 0);
        const qty = item.quantity || 1;
        total += (price * qty);

        const itemRow = document.createElement("div");
        itemRow.className = "mini-item"; 
        itemRow.innerHTML = `
            <span>${item.name || "Product"}</span>
            <span>- ₹ ${price.toFixed(2)}</span>
        `;
        if (listContainer) listContainer.appendChild(itemRow);
    });
};

// 3. SELECTION & ANIMATION LOGIC
function selectMethod(element, targetPage) {
    const options = document.querySelectorAll('.pay-option');
    const continueBtn = document.querySelector('.payment-continue-btn');

    // Remove 'active' state from all
    options.forEach(box => {
        box.classList.remove('active');
        box.style.transform = "scale(1)";
    });

    // Add 'active' state to clicked element
    element.classList.add('active');
    selectedTarget = targetPage;

    // --- THE ANIMATION (The "Pop" Style) ---
    element.animate([
        { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 0, 0, 0.18)' },
        { transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(212, 232, 110, 0.6)' },
        { transform: 'scale(1.02)', boxShadow: '0 4px 10px rgba(7, 7, 7, 0.34)' }
    ], {
        duration: 400,
        easing: 'cubic-bezier(0.175, 0.985, 0.39, 1.475)',
        fill: 'forwards'
    });

    // Enable button with a fade-in effect
    if (continueBtn) {
        continueBtn.disabled = false;
        continueBtn.style.opacity = "1";
    }
}

// 4. NAVIGATION LOGIC
function redirectUser() {
    console.log("Attempting to redirect to: " + selectedTarget);

    if (selectedTarget) {
        // 1. Visual Feedback
        const btn = document.querySelector('.payment-continue-btn');
        btn.style.transform = "scale(1.0)";
        
        // 2. Small delay so user sees the click animation
        setTimeout(() => {
            window.location.href = selectedTarget;
        }, 200);
    } else {
        alert("Please select a payment method first!");
    }
}