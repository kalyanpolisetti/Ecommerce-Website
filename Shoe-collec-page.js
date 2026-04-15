
fetch("shoes.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("product-list");
        
        // 1. Get the current wishlist to check for existing favorites
        const wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];

        container.innerHTML = "";

        data.forEach(product => {

            const wishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
            // 2. Check if this product's ID is in the wishlist
            const isFav = wishlist.map(Number).includes(Number(product.id));
            
            // 3. Set the initial color based on the wishlist status
            const iconClass = isFav ? "bi-heart-fill" : "bi-heart";
            const iconColor = isFav ? "red" : "#030303";

            container.innerHTML += `
            <div class="pro">
                <img src="${product.mainImage}" onclick="window.location.href='single-shoe-page.html?id=${product.id}'">
                <div class="des">
                    <span>${product.details.upperMaterial}</span>
                    <h5>${product.name}</h5>
                    <h4>₹ ${product.price}</h4>
                </div>
                <div class="cart-wishlist">
               <i class="bi ${iconClass}" 
                   style="color: ${iconColor}; font-size: 20px; cursor: pointer;" 
                   onclick="toggleShoeWishlist(event, ${product.id})"></i>
                </div>
            </div>`;
        });
    });
