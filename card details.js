// // On Load: Show the price on the 'Pay' button

window.onload = function() {
    // Retrieve the discounted total
    const finalAmount = localStorage.getItem('finalOrderTotal') || "0.00";
    const btnSpan = document.getElementById('cd-final-amount');
    
    if (btnSpan) {
        btnSpan.innerText = "₹" + finalAmount;
    }
};

// This function is called by your onclick="cdHandlePayment()"
function cdHandlePayment() {
    const amountToPass = localStorage.getItem('finalOrderTotal') || "0.00";
    // Pass the price to the success page via URL
    window.location.href = `order-success.html?amount=${amountToPass}`;
}