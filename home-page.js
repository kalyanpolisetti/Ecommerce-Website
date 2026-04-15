fetch("home-products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-list");

    container.innerHTML = "";

    data.forEach(product => {
      const wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
    // Always use Number() to ensure 100% accuracy
    const isFav = wishlist.map(Number).includes(Number(product.id));

    const iconClass = isFav ? "bi-heart-fill" : "bi-heart";
    const iconColor = isFav ? "red" : "#050505";
      container.innerHTML += `
        <div class="pro" onclick="openProduct(${product.id})">
          <img src="${product.mainImage}" alt="">
          <div class="cart-wishlist">
               <i class="bi ${iconClass}" 
                   style="color: ${iconColor}; font-size: 20px; cursor: pointer;" 
                   onclick="toggleShoeWishlist(event, ${product.id})"></i>
          </div>
          <div class="des">
            <span class="product-details">${product.name}</span> 
            <h4 class="price">₹ ${product.price}</h4>
          </div>
        </div> 
      `;
    });
  });

function openProduct(id) {
  window.location.href = `single-pro-page.html?id=${id}`;

}

// summer products 

fetch("summer-products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-list-summer");

    container.innerHTML = "";

    data.forEach(product => {
      const wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
    // Always use Number() to ensure 100% accuracy
    const isFav = wishlist.map(Number).includes(Number(product.id));

    const iconClass = isFav ? "bi-heart-fill" : "bi-heart";
    const iconColor = isFav ? "red" : "#050505";
      container.innerHTML += `
        <div class="pro" onclick="openProduct(${product.id})">
          <img src="${product.mainImage}" alt="">
          <div class="cart-wishlist">
               <i class="bi ${iconClass}" 
                   style="color: ${iconColor}; font-size: 20px; cursor: pointer;" 
                   onclick="toggleShoeWishlist(event, ${product.id})"></i>
          </div>
          <div class="des">
            <span class="product-details">${product.name}</span> 
            <h4 class="price">₹ ${product.price}</h4>
          </div>
        </div> 
      `;
    });
  });

function openProduct(id) {
  window.location.href = `single-pro-page.html?id=${id}`;

}

// wishlist //

