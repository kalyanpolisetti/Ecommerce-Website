  // ================= GET PRODUCT ID =================
let loadedProductData=null;
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// If no product selected
if (!productId) {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>No product selected</h2>";
}

// ================= FETCH BOTH JSON FILES =================
Promise.all([
  fetch("youmaylike.json").then(res => res.json()),
  fetch("products.json").then(res => res.json()),
  fetch("home-products.json").then(res => res.json()),
  fetch("summer-products.json").then(res => res.json()),
])
.then(([related ,products,homepro, summerpro]) => {

  // Merge both data
  const data = [...products, ...related, ...homepro, ...summerpro];

  // Find current product
  const product = data.find(p => p.id === productId);

  // if (!product) {
  //   document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Product not found</h2>";
  //   return;
  // }
  if(product){
    loadedProductData=product;
  }

  // ================= MAIN ELEMENTS =================
  const mainImg = document.getElementById("main-img");
  const gallery = document.querySelector(".small-image-group");

  // ================= SET MAIN IMAGE =================
  mainImg.src = product.mainImage;

  // ================= TEXT DATA =================
  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-price").innerText = "₹ " + product.price;

  if (product.description) {
    document.getElementById("product-desc").innerText = product.description;
    
  }

  // ================= GALLERY =================
  gallery.innerHTML = "";

  if (product.gallery) {
    product.gallery.forEach(img => {
      gallery.innerHTML += `
        <div class="small-img-col">
          <img src="${img}" class="small-img" width="100%">
        </div>
      `;
    });

    // Click → change main image
    document.querySelectorAll(".small-img").forEach(img => {
      img.addEventListener("click", function () {
        mainImg.src = this.src;
      });
    });
  }

  // ================= DETAILS =================
  if (product.details) {
    document.querySelector(".product-details ul").innerHTML = `
      <li><span>Fabric:</span> ${product.details.fabric}</li>
      <li><span>Pattern:</span> ${product.details.pattern}</li>
      <li><span>Fit:</span> ${product.details.fit}</li>
      <li><span>Sleeve:</span> ${product.details.sleeve}</li>
      <li><span>Collar:</span> ${product.details.collar}</li>
      <li><span>Closure:</span> ${product.details.closure}</li>
      <li><span>Occasion:</span> ${product.details.occasion}</li>
    `;
  }

  // ================= WASH CARE =================
  if (product.washCare) {
    const wash = document.querySelector(".washCare ul");
    wash.innerHTML = "";

    product.washCare.forEach(item => {
        wash.innerHTML += `<li>${item}</li>`;
    });
}
  // ================= YOU MAY ALSO LIKE =================
  const relatedProducts = data.filter(p => p.id !== product.id );
  

  const container = document.getElementById("related-products");

  if (container) {
    container.innerHTML = "";

    relatedProducts.forEach(item => {

      const div = document.createElement("div");
      div.classList.add("pro");

      div.innerHTML = `
        <img src="${item.mainImage}" alt="${item.name}" >
        <i class="bi bi-heart wishheart" data-id="${item.id}" style="cursor:pointer;" onclick="toggleWishlist(event, ${item.id})"></i>
        <div class="des">
          <span>${item.name}</span>
          <h4>₹ ${item.price}</h4>
        </div>
      `;

      // Click → open product
      div.onclick = () => {
        window.location.href = "single-pro-page.html?id=" + item.id;
      };

      container.appendChild(div);
    });
  }

})
.catch(err => {
  console.error("Error loading product:", err);
});

// // 1. Unique variable names
// const activeUrlId = new URLSearchParams(window.location.search).get('id');
// let loadedProductData = null; 

// // 2. Fetch using the CORRECT filename from your explorer
// async function initializeProductPage() {
//     try {
//         // Changed to 'products.json' to match your VS Code sidebar
//         const response = await fetch('products.json'); 
        
//         if (!response.ok) {
//             throw new Error(`File not found. Ensure 'products.json' is in your main folder.`);
//         }

//         const dataList = await response.json();
//         loadedProductData = dataList.find(p => p.id == activeUrlId);

//         if (loadedProductData) {
//             document.querySelector("#MainImg").src = loadedProductData.mainImage;
//             document.querySelector(".product-name").innerText = loadedProductData.name;
//             document.querySelector(".product-price").innerText = "₹" + loadedProductData.price;
//         } else {
//             console.error("No product found with ID:", activeUrlId);
//         }
//     } catch (err) {
//         console.error("Load Error:", err.message);
//     }
// }

// initializeProductPage();




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