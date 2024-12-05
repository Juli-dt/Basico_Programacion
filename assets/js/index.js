document.addEventListener('DOMContentLoaded', () => {
    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('overlay');

    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.style.display = 'none';
    });

    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('cart');
    const cartOverlay = document.getElementById('overlay-cart');

    cartIcon.addEventListener('click', () => {
        cart.classList.toggle('open');
        cartOverlay.style.display = cart.classList.contains('open') ? 'block' : 'none';
    });

    cartOverlay.addEventListener('click', () => {
        cart.classList.remove('open');
        cartOverlay.style.display = 'none';
    });

    const addToCartButtons = document.querySelectorAll('.product__add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    let cart_items = {};
    let totalPrice = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.closest('.product').querySelector('.product__image').src;

            if (cart_items[productName]) {
                cart_items[productName].quantity++;
                updateCartItemQuantity(productName);
            } else {
                cart_items[productName] = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
                addNewCartItem(cart_items[productName]);
            }

            totalPrice += productPrice;
            cartCount.textContent = Object.values(cart_items).reduce((total, item) => total + item.quantity, 0);
            cartTotalPrice.textContent = totalPrice.toFixed(2);
        });
    });

    function addNewCartItem(item) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
        cartItem.setAttribute('data-name', item.name);
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart__item-image">
            <div class="cart__item-details">
                <p class="cart__item-description">${item.name}</p>
                <p class="cart__item-price">$${item.price.toFixed(2)}</p>
                <p class="cart__item-quantity">Cantidad: <span>${item.quantity}</span></p>
            </div>
            <div class="cart__item-delete">
                <img src="../assets/img/close.png" alt="eliminar" width="20px" class="cart__item-delete-icon">
            </div>
        `;

        cartItems.appendChild(cartItem);

        const deleteButton = cartItem.querySelector('.cart__item-delete-icon');
        deleteButton.addEventListener('click', () => {
            const itemName = cartItem.getAttribute('data-name');
            
            // Reducir cantidad o eliminar completamente
            if (cart_items[itemName].quantity > 1) {
                cart_items[itemName].quantity--;
                totalPrice -= cart_items[itemName].price;
                updateCartItemQuantity(itemName);
            } else {
                totalPrice -= cart_items[itemName].price;
                cartItem.remove();
                delete cart_items[itemName];
            }

            // Actualizar contador y total
            cartCount.textContent = Object.values(cart_items).reduce((total, item) => total + item.quantity, 0);
            cartTotalPrice.textContent = totalPrice.toFixed(2);
        });
    }

    function updateCartItemQuantity(productName) {
        const cartItem = document.querySelector(`.cart__item[data-name="${productName}"]`);
        if (cartItem) {
            const quantitySpan = cartItem.querySelector('.cart__item-quantity span');
            const currentQuantity = cart_items[productName].quantity;
            
            if (currentQuantity > 0) {
                quantitySpan.textContent = currentQuantity;
            } else {
                cartItem.remove();
                delete cart_items[productName];
            }
        }
    }
});