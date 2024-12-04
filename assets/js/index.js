
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
    let productCount = 0;
    let totalPrice = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.closest('.product').querySelector('.product__image').src;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart__item');
            cartItem.innerHTML = `
                <img src="${productImage}" alt="${productName}" class="cart__item-image">
                <div class="cart__item-details">
                    <p class="cart__item-description">${productName}</p>
                    <p class="cart__item-price">$${productPrice.toFixed(2)}</p>
                </div>
                <div class="cart__item-delete">
                    <img src="./img/close.png" alt="Eliminar" class="cart__item-delete-icon">
                </div>
            `;

            cartItems.appendChild(cartItem);

            productCount++;
            totalPrice += productPrice;
            cartCount.textContent = productCount;
            cartTotalPrice.textContent = totalPrice.toFixed(2);

            const deleteButton = cartItem.querySelector('.cart__item-delete-icon');
            deleteButton.addEventListener('click', () => {
                cartItem.remove();
                productCount--;
                totalPrice -= productPrice;
                cartCount.textContent = productCount;
                cartTotalPrice.textContent = totalPrice.toFixed(2);
            });
        });
    });
});
