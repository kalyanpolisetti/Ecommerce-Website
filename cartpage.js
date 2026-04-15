// 1. SELECT THE ELEMENTS (Matching your HTML Source 15)
const cartContainer = document.querySelector(".cart"); 
const subtotalEl = document.getElementById("productTotal");
const finalTotalEl = document.getElementById("finalTotal");

function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Clear the container except for the <h2> tag
    if (cartContainer) {
        cartContainer.innerHTML = "<h2>YOUR BAG (" + cart.length + " ITEM)</h2>";
    }

    if (cart.length === 0) {
        cartContainer.innerHTML += "<p style='padding:20px;'>Your bag is empty.</p>";
        updatePrices(0);
        return;
    }

    // Loop through items and create the "cart-item" divs
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="product">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                <p>Color:${item.color}</p>
                
                <div class="price-qty">
                    <span>Qty: </span>
                    <input style=" width:54px " type="number" value="${item.quantity}" min="1" 
                           onchange="updateQty(${index}, this.value)" 
                           style="width:40px; margin-right:15px;">
                    <span class="cart-price">₹${item.price * item.quantity}</span>
                </div>
                <button onclick="removeItem(${index})" 
                        style="color:red; background:none; border:none; cursor:pointer; margin-top:10px;">
                        Remove Item
                </button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    calculateTotal(cart);
}

// 2. LOGIC TO REMOVE ITEM
window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};

// 3. LOGIC TO UPDATE QUANTITY
window.updateQty = function(index, newQty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (newQty < 1) return;
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};

// 4. CALCULATE TOTALS
function calculateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updatePrices(total);
}

function updatePrices(amount) {
    if (subtotalEl) subtotalEl.innerText = "₹" + amount;
    if (finalTotalEl) finalTotalEl.innerText = "₹" + amount;
}

// Initial Run
renderCart();

document.getElementById('applyCouponBtn').addEventListener('click', function() {
    const input = document.getElementById('couponInput');
    const msg = document.getElementById('couponStatusMsg');
    const totalDisplay = document.getElementById('finalTotal');
    const code = input.value.trim().toUpperCase();

    // Get the subtotal from your existing productTotal element
    // We use parseFloat to handle numbers correctly
    let currentTotal = parseFloat(document.getElementById('productTotal').innerText.replace('₹', '').replace('$', ''));

    if (code === 'ELVIOR10') {
        let discount = currentTotal * 0.10;
        let finalPrice = currentTotal - discount;

        totalDisplay.innerText = "₹" + Math.round(finalPrice);
        localStorage.setItem('finalOrderTotal',Math.round(finalPrice));
        msg.innerText = "Code ELVIOR10 applied! You saved ₹" + Math.round(discount);
        msg.style.color = "green";
        
        // Disable after success
        this.disabled = true;
        this.style.opacity = "0.5";
        input.disabled = true;
    } else {
        msg.innerText = "Invalid code. Try ELVIOR10";
        msg.style.color = "red";
    }
});