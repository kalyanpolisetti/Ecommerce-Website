const bar=document.getElementById('bar')
const nav=document.getElementById('navbar')
const close =document.getElementById('close')

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
// log in page hamburger menu style script//

const openMenu = document.getElementById('bar1');
const closeMenu = document.getElementById('login-close');
const navbarLinks = document.querySelector('.nav-links');

if (openMenu) {
    openMenu.addEventListener('click', () => {
        navbarLinks.classList.add('active');
    })
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
    })
}

/** mobile banking page js */

let selected = "";

function selectOption(option) {
  selected = option;

  document.querySelectorAll(".option").forEach(el => {
    el.classList.remove("active");
  });

  event.currentTarget.classList.add("active");
}

/* card-details-page js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Pull the price from localStorage
    const orderData = JSON.parse(localStorage.getItem('userOrder'));
    const priceDisplay = document.getElementById('display-final-price');

    if (orderData && orderData.finalPrice) {
        priceDisplay.innerText = orderData.finalPrice;
    }
});

// 2. Animated Redirect for Top Icons
function goToPay(element, method) {
    // Remove 'selected' from all icons
    const icons = document.querySelectorAll('.pay-icon');
    icons.forEach(i => i.classList.remove('selected'));

    // Add animation class to clicked icon
    element.classList.add('selected');

    // Pop animation using JS
    element.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1.15)' }
    ], { duration: 300 });

    // Wait for animation to finish before redirecting
    setTimeout(() => {
        const urls = {
            'google': 'https://pay.google.com',
            'phonepe': 'https://www.phonepe.com',
            'apple': 'https://www.apple.com/apple-pay/',
            'airpay': 'https://www.airpay.co.in'
        };
        
        if (urls[method]) {
            window.location.href = urls[method];
        }
    }, 400);
}

// 3. Pay Button Click Animation
function cdHandlePayment() {
    const btn = document.querySelector('.cd-pay-btn');
    
    // Add "Pressed" animation
    btn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(0.96)' },
        { transform: 'scale(1)' }
    ], { duration: 150 });

    btn.classList.add('loading');
    btn.innerHTML = 'Processing Payment...';

    // Simulate Payment and go to Success Video
    setTimeout(() => {
        window.location.href = "order-success.html";
    }, 2000);
}

/* wishlist symbol js shop page */

function toggleWishlist(event, id) {
    event.stopPropagation();
    const heartIcon = event.currentTarget;
    let wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];

    // Force the incoming ID to be a Number
    const productId = Number(id);

    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        heartIcon.style.color = "red";
        heartIcon.classList.replace("bi-heart", "bi-heart-fill");
    } else {
        wishlist.splice(index, 1);
        heartIcon.style.color = "black";
        heartIcon.classList.replace("bi-heart-fill", "bi-heart");
    }

    localStorage.setItem("myWishlist", JSON.stringify(wishlist));
}

function toggleShoeWishlist(event, id) {
    event.stopPropagation();
    
    // 1. Get the icon element (the heart)
    const icon = event.target;
    let wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
    const productId = Number(id);

    if (!wishlist.includes(productId)) {
        // --- ADDING TO WISHLIST ---
        wishlist.push(productId);
        
        // Change to SOLID RED heart
        icon.classList.remove("bi-heart");      // Remove Outline
        icon.classList.add("bi-heart-fill");    // Add Solid Fill
        icon.style.color = "red";               // Set color to Red
    } else {
        // --- REMOVING FROM WISHLIST ---
        wishlist = wishlist.filter(item => Number(item) !== productId);
        
        // Change back to OUTLINE (Cream/Grey)
        icon.classList.remove("bi-heart-fill"); // Remove Solid Fill
        icon.classList.add("bi-heart");         // Add Outline back
        
        // Set your "Cream" or "Original" color here
        icon.style.color = "#070707";           // Your original color
    }

    // 2. Save to LocalStorage
    localStorage.setItem("myWishlist", JSON.stringify(wishlist));
}


    //** shoes wishlist js  */

async function loadWishlist() {
    try {
        const container = document.getElementById("wishlist-container");
        if (!container) return;

        // 1. Fetch ALL FOUR data sources (This is the fix!)
        const [resHome, resSummer, resProducts, resShoes] = await Promise.all([
            fetch("home-products.json").then(res => res.json()),
            fetch("summer-products.json").then(res => res.json()),
            fetch("products.json").then(res => res.json()),
            fetch("shoes.json").then(res => res.json())
        ]);

        // 2. Combine all data into one master list
        const allData = [...resHome, ...resSummer, ...resProducts, ...resShoes];

        // 3. Get saved IDs from localStorage
        const savedIds = JSON.parse(localStorage.getItem("myWishlist")) || [];
        console.log("IDs found in LocalStorage:", savedIds);

        // 4. Filter the big list
        const favorites = allData.filter(item => 
            savedIds.map(Number).includes(Number(item.id))
        );

        // 5. Display logic
        if (favorites.length === 0) {
            container.innerHTML = "<h3>Your wishlist is empty!</h3>";
            return;
        }

        container.innerHTML = "";
        favorites.forEach(product => {
            container.innerHTML += `
                <div class="pro">
                    <img src="${product.mainImage}" alt="">
                    <div class="des">
                        <h5>${product.name}</h5>
                        <h4>₹${product.price}</h4>
                    </div>
                    <button class="remove-btn" onclick="removeFromWishlist(${product.id})">Remove</button>
                    <button class="move-btn" onclick="moveToBag(${product.id})">Move to Bag</button>
                </div>`;
        });
    } catch (err) {
        console.error("Wishlist Page Error:", err);
    }
}

// Global remove function
function removeFromWishlist(id) {
    let savedIds = JSON.parse(localStorage.getItem("myWishlist")) || [];
    savedIds = savedIds.filter(itemId => Number(itemId) !== Number(id));
    localStorage.setItem("myWishlist", JSON.stringify(savedIds));
    loadWishlist(); // Reload the list
}

loadWishlist();


/** Remove button whishlist logic  */

function removeFromWishlist(id) {
    // 1. Get the current list of IDs from LocalStorage
    let wishlistIds = JSON.parse(localStorage.getItem("myWishlist")) || [];

    // 2. Convert the ID to a Number to ensure an exact match (Crucial for 201+ IDs)
    const idToRemove = Number(id);

    // 3. Filter the array: Keep everything EXCEPT the ID we want to remove
    wishlistIds = wishlistIds.filter(itemId => Number(itemId) !== idToRemove);

    // 4. Save the updated, smaller list back to LocalStorage
    localStorage.setItem("myWishlist", JSON.stringify(wishlistIds));

    // 5. Refresh the page or the list to show the change
    // You can call your display function again, or simply reload the page:
    location.reload(); 
    
    // Optional: Alert for user feedback
    console.log("Removed ID:", idToRemove);
}

/** Move to bag whishlist logic */


function moveToBag(id) {
    // 1. Fetch ALL 5 JSON files simultaneously
    Promise.all([
        fetch("products.json").then(res => res.json()),
        fetch("shoes.json").then(res => res.json()),
        fetch("home-products.json").then(res => res.json()),
        fetch("summer-products.json").then(res => res.json()),
        fetch("youmaylike.json").then(res => res.json())
    ])
    .then((dataArrays) => {
        // 2. Flatten all arrays into one master catalog for searching
        const allItems = dataArrays.flat();

        // 3. Find the specific item by ID (String conversion prevents type errors)
        const itemToMove = allItems.find(p => String(p.id) === String(id));

        if (itemToMove) {
            // 4. Retrieve and Update Cart
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const isAlreadyInCart = cart.some(item => String(item.id) === String(id));

            if (!isAlreadyInCart) {
                const cartItem = {
                    id: itemToMove.id,
                    name: itemToMove.name,
                    price: itemToMove.price,
                    // Dynamic image selection based on JSON key names
                    image: itemToMove.image || itemToMove.mainImage || itemToMove.img,
                    quantity: 1,
                    size: "M", 
                    color: "Default"
                };

                cart.push(cartItem);
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            // 5. Clean up Wishlist (Remove the moved item)
            let wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
            wishlist = wishlist.filter(wishId => String(wishId) !== String(id));
            localStorage.setItem("myWishlist", JSON.stringify(wishlist));

            // 6. Provide user feedback and refresh UI
            // alert(`${itemToMove.name} moved to Bag! 🛍️`);
            window.location.reload(); 
        } else {
            console.error(`Product ID ${id} not found in any JSON source.`);
        }
    })
    .catch(err => {
        console.error("Error fetching product data:", err);
        alert("System error: Could not access the product catalog.");
    });
}

// 1. Select the Wishlist Button
// 1. Target the Wishlist button on the Single Shoe Page
const wishlistBtn = document.querySelector(".wishlist-btn-cart");

if (wishlistBtn) {
    wishlistBtn.onclick = function() {
        // 2. Safety Check: Ensure the shoe data has finished loading from shoes.json
        if (!loadedProductData) {
            alert("Product data is still loading, please wait...");
            return;
        }

        // 3. Get the current wishlist from LocalStorage (or an empty array if it's the first time)
        let wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
        
        // 4. Force the ID to a Number (Crucial for your 201, 202 type IDs)
        const idToAdd = Number(loadedProductData.id);

        // 5. Check if the shoe is already in the wishlist to prevent duplicates
        if (!wishlist.includes(idToAdd)) {
            // Add the ID to the array
            wishlist.push(idToAdd);
            
            // Save the updated array back to LocalStorage
            localStorage.setItem("myWishlist", JSON.stringify(wishlist));
            
            // 6. Provide Visual Feedback
            // alert(" added to your Wishlist!");
            wishlistBtn.innerHTML = "ADDED TO WISHLIST";
            wishlistBtn.style.backgroundColor = "#010202";
            wishlistBtn.style.color = "white";
        } else {
            alert("This product is already in your wishlist!");
        }
    };
}

/** order sucess page js code  */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    // This catches the 'amount' we sent from cdHandlePayment()
    const amount = params.get('amount') || "3,998"; 
    
    const displayElement = document.getElementById('final-paid-amount');
    if (displayElement) {
        displayElement.innerText = "₹ " + amount;
    }
    
    // Optional: Clear storage so the next order starts fresh
    // localStorage.removeItem('finalOrderTotal');
});


// LOG IN PAGE SCRIPT //

document.getElementById('getStartedBtn').addEventListener('click', function() {
    const user = document.getElementById('username').value;
    
    if(user === "") {
        alert("Please enter a username");
        return;
    }

    // 1. Show the success message
    // alert("You registered or signed in successfully!");

    // 2. Redirect to home page after clicking OK
    // Change 'home.html' to your actual home page file
    window.location.href = "index.html"; 
});

// log in page logo movements java script code //
