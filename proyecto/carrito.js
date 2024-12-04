document.addEventListener("DOMContentLoaded", () => {
    const cartBadge = document.getElementById("cart-badge");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmountElement = document.getElementById("total-amount");

    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; 
        let totalAmount = 0;

        cart.forEach((product, index) => {
            totalAmount += product.price * product.quantity;

            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <div>
                        <h6>${product.name}</h6>
                        <small>Precio: $${product.price.toFixed(2)} x ${product.quantity}</small>
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });

        totalAmountElement.textContent = totalAmount.toFixed(2); 
        cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); 

        
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    
    function clearCart() {
        cart = []; 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        updateCartDisplay(); 
    }

    
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const image = button.closest(".card").querySelector("img").src;

            const existingProduct = cart.find((item) => item.name === name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            updateCartDisplay();
            alert(`${name} se añadió al carrito.`);
        });
    });

    
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const index = parseInt(e.target.getAttribute("data-index"), 10);
            cart.splice(index, 1); 
            localStorage.setItem("cart", JSON.stringify(cart)); 
            updateCartDisplay(); 
        }
    });


    const clearCartButton = document.getElementById("clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
                clearCart();
            }
        });
    }

    
    updateCartDisplay();
});
