document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', (event) => {
        // Cerrar el sidebar solo si se hace clic fuera de él
        if (event.target === overlay) {
            sidebar.classList.remove('open');
            overlay.style.display = 'none';
        }
    });
});

var addToCartButtons = document.querySelectorAll('.product__add-to-cart');
var cart = document.querySelector('.cart');
var cartCount = document.getElementById('cart-count');
var productCount = 0; // Contador de productos en el carrito

addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var productName = this.getAttribute('data-name');
        var productPrice = this.getAttribute('data-price');
        var productImage = this.closest('.product').querySelector('.product__image').src; // Obtener la imagen del producto

        // Crear el elemento para el producto en el carrito
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');

        cartItem.innerHTML = `
          <img src="${productImage}" alt="${productName}" class="cart__image" width="300">
          <p class="cart__description">${productName}</p>
          <p class="cart__price">$${productPrice}</p>
          <i class="cart__delete"><img src="./assets/img/close.png" alt="Icono Quitar" class="cart__delete-icon" width ="20px"></i>
        `;

        // Agregar el nuevo producto al carrito
        cart.appendChild(cartItem);

        // Incrementar el contador de productos
        productCount++;
        cartCount.textContent = productCount;

        // Funcionalidad para borrar el producto
        var deleteButton = cartItem.querySelector('.cart__delete-icon');
        deleteButton.addEventListener('click', function () {
            cartItem.remove();
            productCount--; // Decrementar el contador de productos
            cartCount.textContent = productCount;
        });
    });
});
