/**
 * ELVIOR HOUSE - Checkout Logic
 * This script pulls real cart data from LocalStorage and displays it
 * in the "Your Order" summary section.
 */

function loadCheckoutItems() {
    // 1. Get the data from the 'cart' storage box
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    
    // 2. Select all the HTML elements we need to update
    const container = document.getElementById("dynamic-order-items");
    const itemSumEl = document.getElementById("items-sum");
    const subTotalEl = document.getElementById("sub-total");
    const grandTotalEl = document.getElementById("grand-total");
    const countEl = document.getElementById("count-items");

    // Safety Check: If the container doesn't exist, stop the script
    if (!container) return;

    // 3. Clear the container before adding items (prevents duplicates)
    container.innerHTML = "";
    let total = 0;

    // 4. Handle Empty Cart Case
    if (cartData.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <p>Your bag is empty.</p>
                <a href="shop-page.html" style="color: #088178; text-decoration: underline;">Continue Shopping</a>
            </div>`;
        updatePriceDisplays(0, 0);
        return;
    }

    // 5. Loop through each item and create the HTML structure
    cartData.forEach((item) => {
        // Calculate sub-price for this item
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("summary-item");
        
        // This matches the design from your Rayhan Nasir template
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Size: ${item.size || 'M'} | Qty: ${item.quantity}</p>
                <strong>₹${itemTotal}</strong>
            </div>
        `;
        container.appendChild(itemDiv);
    });

    // 6. Update all the price labels on the page
    updatePriceDisplays(total, cartData.length);
}

// Helper function to update the text labels


// Place this at the bottom of place-order.js
window.addEventListener('load', () => {
    const orderBtn = document.getElementById("final-checkout-btn");

    if (!orderBtn) {
        console.error("Button with ID 'final-checkout-btn' not found!");
        return;
    }

    orderBtn.addEventListener("click", function(e) {
        e.preventDefault(); // Prevents page refresh
        console.log("Button clicked, starting validation...");

        // 1. List your input IDs exactly as they appear in HTML
        const inputIds = ["billing-name", "billing-address", "billing-city", "billing-phone"];
        let allValid = true;

        inputIds.forEach(id => {
            const field = document.getElementById(id);
            
            if (field) {
                if (field.value.trim() === "") {
                    console.log(`Field ${id} is empty!`);
                    field.style.border = "2px solid red";
                    field.style.backgroundColor = "#fff0f0"; // Light red tint
                    allValid = false;
                } else {
                    field.style.border = "1px solid #ddd"; // Reset to normal
                    field.style.backgroundColor = "#fff";
                }
            } else {
                console.warn(`Input with ID '${id}' was not found in HTML.`);
            }
        });

        // 2. Stop if validation fails
        if (!allValid) {
            // alert("Please fill in all shipping details.");
            return;
        }

        // 3. Cart check
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // 4. Save price and Redirect
        const grandTotalEl = document.getElementById("grand-total");
        if (grandTotalEl) {
            const finalPrice = grandTotalEl.innerText.replace('₹', '').trim();
            localStorage.setItem('finalOrderTotal', finalPrice);
            console.log("Price saved: " + finalPrice);
            window.location.href = "mobile-banking.html";
        } else {
            console.error("Grand total element not found!");
        }
    });
});

// Run the function when the page loads
window.onload = loadCheckoutItems;

function updatePriceDisplays(totalAmount, itemCount) {
    // Check if a discounted price was saved by the coupon logic
    const savedDiscountedPrice = localStorage.getItem('finalOrderTotal');
    
    // If a discounted price exists, use it for the grand total; otherwise use totalAmount
    const displayTotal = savedDiscountedPrice ? savedDiscountedPrice : totalAmount;

    const itemSumEl = document.getElementById("items-sum");
    const subTotalEl = document.getElementById("sub-total");
    const grandTotalEl = document.getElementById("grand-total");
    const countEl = document.getElementById("count-items");

    if (itemSumEl) itemSumEl.innerText = "₹" + totalAmount; // Subtotal stays same
    if (subTotalEl) subTotalEl.innerText = "₹" + totalAmount;
    if (grandTotalEl) grandTotalEl.innerText = "₹" + displayTotal; // Final price changes
    if (countEl) countEl.innerText = itemCount;
}