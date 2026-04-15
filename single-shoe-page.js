// const params = new URLSearchParams(window.location.search);
// const productId = parseInt(params.get("id"));
// let loadedProductData = null;

// async function initializeProductPage() {
//     try {
//         const response = await fetch('shoes.json');
//         if (!response.ok) throw new Error("shoes.json not found");

//         const dataList = await response.json();
//         loadedProductData = dataList.find(p => p.id === productId);

//         if (loadedProductData) {
//             // Update Main Info
//             document.getElementById("main-img").src = loadedProductData.mainImage;
//             document.getElementById("product-name").innerText = loadedProductData.name;
//             document.getElementById("product-price").innerText = "₹" + loadedProductData.price;
//             document.getElementById("product-desc").innerText = loadedProductData.description;

//             // Update Gallery
//             const gallery = document.querySelector(".small-image-group");
//             gallery.innerHTML = "";
//             loadedProductData.gallery.forEach(img => {
//                 gallery.innerHTML += `
//                     <div class="small-img-col">
//                         <img src="${img}" class="small-img" width="100%">
//                     </div>`;
//             });

//             // Gallery click logic
//             document.querySelectorAll(".small-img").forEach(img => {
//                 img.onclick = () => document.getElementById("main-img").src = img.src;
//             });

//             // Update Details Table
//             const detailsUl = document.querySelector(".product-details ul");
//             detailsUl.innerHTML = `
//                 <li><strong>Upper Material:</strong> ${loadedProductData.details.upperMaterial}</li>
//                 <li><strong>Footbed:</strong> ${loadedProductData.details.footbed}</li>
//                 <li><strong>Outsole:</strong> ${loadedProductData.details.outsole}</li>
//                 <li><strong>Heel:</strong> ${loadedProductData.details.heel}</li>
//                 <li><strong>Heel Height:</strong> ${loadedProductData.details.heelHeight}</li>
//                 <li><span>Material:</span> ${loadedProductData.details.material}</li>
//                 <li><span>Fit:</span> ${loadedProductData.details.fit}</li>
//                 <li><span>Closure:</span> ${loadedProductData.details.closure}</li>
//             `;
            

//             // Update Related Products
//             renderRelated(dataList);

//         } else {
//             console.error("No product found with ID:", productId);
//         }
//     } catch (err) {
//         console.error("Load Error:", err);
//     }
// }

// function renderRelated(allData) {
//     const container = document.getElementById("shoe-related-products-container");
//     if (!container) return;
//     container.innerHTML = "";
    
//     // Show 4 products that aren't the current one
//     const related = allData.filter(p => p.id !== productId).slice(0, 15);
    
//     related.forEach(item => {
//         const div = document.createElement("div");
//         div.className = "pro";
//         div.onclick = () => window.location.href = `single-shoe-page.html?id=${item.id}`;
//         div.innerHTML = `
//             <img src="${item.mainImage}">
//             <div class="des">
//                 <span>Shoes</span>
//                 <h5>${item.name}</h5>
//                 <h4>₹${item.price}</h4>
//             </div>`;
//         container.appendChild(div);
//     });
// }

// initializeProductPage();


// // size selection//
// // 3. Size Selection
// document.addEventListener("click", (e) => {
//     const sizeBox = e.target.closest(".size");
//     if (sizeBox) {
//         document.querySelectorAll(".sizes-con .size").forEach(s => s.classList.remove("active"));
//         sizeBox.classList.add("active");
//     }
// });

// // 4. Add to Cart
// const finalCartBtn = document.querySelector(".cart-btn");
// if (finalCartBtn) {
//     finalCartBtn.addEventListener("click", (e) => {
//         const selectedSize = document.querySelector(".size.active");

//         if (!loadedProductData) {
//             alert("Product data is still loading...");
//             return;
//         }

//         if (!selectedSize) {
//             alert("Please select a size first!");
//             return;
//         }

//         // --- NEW COLOR CHANGE LOGIC ---
//         finalCartBtn.style.backgroundColor = "black";
//         finalCartBtn.style.color = "white";
//         finalCartBtn.innerHTML = "ADDED TO BAG"; // Optional: changes text too
//         // ------------------------------

//         const cartEntry = {
//             id: loadedProductData.id,
//             name: loadedProductData.name,
//             price: loadedProductData.price,
//             image: loadedProductData.mainImage,
//             size: selectedSize.innerText.trim(),
//             quantity: parseInt(document.querySelector("#single-pro-details input")?.value || 1)
//         };

//         let tempCart = JSON.parse(localStorage.getItem("cart")) || [];
//         // tempCart.push(cartEntry);
//         // localStorage.setItem("cart", JSON.stringify(tempCart));

//         // // alert("Added to bag!");
//         // // window.location.href="cartpage.html";
//         const existingItem = tempCart.find(item => 
//     item.id === cartEntry.id && item.size === cartEntry.size
// );

// if (existingItem) {
//     // If it exists, just add to the quantity
//     existingItem.quantity += cartEntry.quantity;
// } else {
//     // If it's a new item or a different size, add it to the list
//     tempCart.push(cartEntry);
// }

// // Save the updated cart back to localStorage
// localStorage.setItem("cart", JSON.stringify(tempCart));

// // Change button color to show success
// finalCartBtn.style.backgroundColor = "black";
// finalCartBtn.style.color = "white";
// finalCartBtn.innerHTML = "ADDED TO BAG";
//    });
// }

// //wishlist logic //

// const wishlistBtn = document.querySelector(".wishlist-btn-cart");

// if (wishlistBtn) {
//     wishlistBtn.onclick = function() {
//         if (!loadedProductData) return;

//         let wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
//         const idToAdd = Number(loadedProductData.id);

//         if (!wishlist.includes(idToAdd)) {
//             wishlist.push(idToAdd);
//             localStorage.setItem("myWishlist", JSON.stringify(wishlist));
//             alert("Added to Wishlist!");
//             this.innerHTML = "Added to Wishlist";
//         } else {
//             alert("This shoe is already in your wishlist.");
//         }
//     };
// }

// Wrap in brackets to prevent "Identifier already declared" errors
{
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));
    let loadedProductData = null;

    async function initializeProductPage() {
        try {
            const response = await fetch('shoes.json');
            if (!response.ok) throw new Error("shoes.json not found");

            const dataList = await response.json();
            
            // Find the shoe using the 201+ ID logic
            loadedProductData = dataList.find(p => Number(p.id) === productId);

            if (loadedProductData) {
                renderProductDetails(loadedProductData);
                renderRelatedProducts(dataList);
            } else {
                console.error("No shoe found with ID:", productId);
            }
        } catch (err) {
            console.error("Load Error:", err);
        }
    }

    function renderProductDetails(product) {
        // Elements check to prevent "Cannot set properties of null"
        const mainImg = document.getElementById("main-img");
        const pName = document.getElementById("product-name");
        const pPrice = document.getElementById("product-price");
        const pDesc = document.getElementById("product-desc");

        if (mainImg) mainImg.src = product.mainImage;
        if (pName) pName.innerText = product.name;
        if (pPrice) pPrice.innerText = "₹" + product.price;
        if (pDesc) pDesc.innerText = product.description;

        // Update Gallery
        const gallery = document.querySelector(".small-image-group");
        if (gallery) {
            gallery.innerHTML = "";
            product.gallery.forEach(img => {
                const div = document.createElement("div");
                div.className = "small-img-col";
                div.innerHTML = `<img src="${img}" class="small-img" width="100%">`;
                div.onclick = () => { if(mainImg) mainImg.src = img; };
                gallery.appendChild(div);
            });
        }

        // Update Details Table (The PU/TPR/Heel Height list)
        const detailsUl = document.querySelector(".product-details ul");
        if (detailsUl) {
            detailsUl.innerHTML = `
                <li><strong>Upper Material:</strong> ${product.details.upperMaterial}</li>
                <li><strong>Footbed:</strong> ${product.details.footbed}</li>
                <li><strong>Outsole:</strong> ${product.details.outsole}</li>
                <li><strong>Heel Height:</strong> ${product.details.heelHeight}</li>
                <li><strong>Fit:</strong> ${product.details.fit}</li>
                <li><strong>Closure:</strong> ${product.details.closure}</li>
            `;
        }

        // Update Wash Care
        const washUl = document.querySelector(".washCare ul");
        if (washUl) {
            washUl.innerHTML = "";
            product.washCare.forEach(item => {
                washUl.innerHTML += `<li>${item}</li>`;
            });
        }
    }

    function renderRelatedProducts(allData) {
        const container = document.getElementById("shoe-related-products-container");
        if (!container) return;
        container.innerHTML = "";

        const related = allData.filter(p => Number(p.id) !== productId).slice(0,15);

        related.forEach(item => {
            
            const div = document.createElement("div");
            div.className = "pro";
            div.onclick = () => window.location.href = `single-shoe-page.html?id=${item.id}`;
            div.innerHTML = `
                <img src="${item.mainImage}">
                <i class="bi bi-heart wishheart" data-id="${item.id}" onclick="toggleWishlist(event, ${item.id})"></i>
                <div class="des">
                    <span>Shoes</span>
                    <h5>${item.name}</h5>
                    <h4>₹${item.price}</h4>
                </div>`;
            container.appendChild(div);
        });
    }

    // Initialize Page
    initializeProductPage();

    // size selection//
// 3. Size Selection
document.addEventListener("click", (e) => {
    const sizeBox = e.target.closest(".size");
    if (sizeBox) {
        document.querySelectorAll(".sizes-con .size").forEach(s => s.classList.remove("active"));
        sizeBox.classList.add("active");
    }
});

// 4. Add to Cart
const finalCartBtn = document.querySelector(".cart-btn");
if (finalCartBtn) {
    finalCartBtn.addEventListener("click", (e) => {
        const selectedSize = document.querySelector(".size.active");

        if (!loadedProductData) {
            alert("Product data is still loading...");
            return;
        }

        if (!selectedSize) {
            alert("Please select a size first!");
            return;
        }

        // --- NEW COLOR CHANGE LOGIC ---
        finalCartBtn.style.backgroundColor = "black";
        finalCartBtn.style.color = "white";
        finalCartBtn.innerHTML = "ADDED TO BAG"; // Optional: changes text too
        // ------------------------------

        const cartEntry = {
            id: loadedProductData.id,
            name: loadedProductData.name,
            price: loadedProductData.price,
            image: loadedProductData.mainImage,
            size: selectedSize.innerText.trim(),
            quantity: parseInt(document.querySelector("#single-pro-details input")?.value || 1)
        };

        let tempCart = JSON.parse(localStorage.getItem("cart")) || [];
        // tempCart.push(cartEntry);
        // localStorage.setItem("cart", JSON.stringify(tempCart));

        // // alert("Added to bag!");
        // // window.location.href="cartpage.html";
        const existingItem = tempCart.find(item => 
    item.id === cartEntry.id && item.size === cartEntry.size
);

if (existingItem) {
    // If it exists, just add to the quantity
    existingItem.quantity += cartEntry.quantity;
} else {
    // If it's a new item or a different size, add it to the list
    tempCart.push(cartEntry);
}

// Save the updated cart back to localStorage
localStorage.setItem("cart", JSON.stringify(tempCart));

// Change button color to show success
finalCartBtn.style.backgroundColor = "black";
finalCartBtn.style.color = "white";
finalCartBtn.innerHTML = "ADDED TO BAG";
   });
}


    // WISHLIST LOGIC (Fixed variable naming conflict)
    const shoeWishlistBtn = document.querySelector(".wishlist-btn-cart");
    if (shoeWishlistBtn) {
        shoeWishlistBtn.onclick = function() {
            if (!loadedProductData) return;

            let wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
            const idToAdd = Number(loadedProductData.id);

            if (!wishlist.includes(idToAdd)) {
                wishlist.push(idToAdd);
                localStorage.setItem("myWishlist", JSON.stringify(wishlist));
                // alert("Added to Wishlist!");
                shoeWishlistBtn.innerHTML = "ADDED TO WISHLIST";
            } else {
                alert("Already in Wishlist!");
            }
        };
    }
}