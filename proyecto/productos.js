document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cart-button");
    const cartModal = new bootstrap.Modal(document.getElementById("shopping-cart"));
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmountElement = document.getElementById("total-amount");
    const cartBadge = document.getElementById("cart-badge");

    // Variables globale
    let cart = [];
    let totalAmount = 0;

    // Función para actualizar el carrito
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        totalAmount = 0;

        cart.forEach((item, index) => {
            totalAmount += item.price * item.quantity;

            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            listItem.innerHTML = `
                ${item.name} (x${item.quantity})
                <div>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger ms-2" data-index="${index}">Eliminar</button>
                </div>
            `;

            cartItemsContainer.appendChild(listItem);
        });

        totalAmountElement.textContent = totalAmount.toFixed(2);
        cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Agregar al carrito
    // document.querySelectorAll(".add-to-cart").forEach((button) => {
    //     button.addEventListener("click", () => {
    //         const name = button.getAttribute("data-name");
    //         const price = parseFloat(button.getAttribute("data-price"));

    //         // Verificar si el producto ya está en el carrito
    //         const existingItem = cart.find((item) => item.name === name);
    //         if (existingItem) {
    //             existingItem.quantity += 1;
    //         } else {
    //             cart.push({ name, price, quantity: 1 });
    //         }

    //         // Actualizar el total y el carrito
    //         totalAmount += price;
    //         updateCart();
    //     });
    // });

    // Eliminar producto del carrito
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const index = parseInt(event.target.dataset.index, 10);
            const item = cart[index];

            // Actualizar total y eliminar el producto
            totalAmount -= item.price * item.quantity;
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Mostrar carrito
    cartButton.addEventListener("click", () => {
        cartModal.show();
    });
});








document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartBadge();
        alert(`${name} se añadió al carrito.`);
    });
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-badge").textContent = cart.length;
}

// Actualizar el badge al cargar la página
document.addEventListener("DOMContentLoaded", updateCartBadge);
