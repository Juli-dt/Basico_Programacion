document.addEventListener('DOMContentLoaded', () => {
    // const toggleSidebarButton = document.getElementById('toggleSidebar');
    // const sidebar = document.getElementById('sidebar');
    // const sidebarOverlay = document.getElementById('overlay');

    // toggleSidebarButton.addEventListener('click', () => {
    //     sidebar.classList.toggle('open');
    //     sidebarOverlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    // });

    // sidebarOverlay.addEventListener('click', () => {
    //     sidebar.classList.remove('open');
    //     sidebarOverlay.style.display = 'none';
    // });

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
                <img src="img/close.png" alt="eliminar" width="20px" class="cart__item-delete-icon">
            </div>
        `;

        cartItems.appendChild(cartItem);

        const deleteButton = cartItem.querySelector('.cart__item-delete-icon');
        deleteButton.addEventListener('click', () => {
            const itemName = cartItem.getAttribute('data-name');
            
            if (cart_items[itemName].quantity > 1) {
                cart_items[itemName].quantity--;
                totalPrice -= cart_items[itemName].price;
                updateCartItemQuantity(itemName);
            } else {
                totalPrice -= cart_items[itemName].price;
                cartItem.remove();
                delete cart_items[itemName];
            }

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


const database = [
    {
        id: 1,
        name: 'Básica blanca',
        price: 50.000,
        image: "./basica blanca.jpg",
        category: 'Casual',
        destacado: true
    },
    {
        id: 2,
        name: 'Buso Gris',
        price: 55.000,
        image: "img/Casual/buso gris.jpg",
        category: 'Casual',
        destacado: false
    },
    {
        id: 3,
        name: 'Buso Terracota',
        price: 55.000,
        image: "img/Casual/buso terracota.jpg",
        category: 'Casual',
        destacado: false
    },
    {
        id: 4,
        name: 'Camibuso Salmón',
        price: 60.000,
        image: "img/Casual/camibuso salmon.jpg",
        category: 'Casual',
        destacado: false
    },
    {
        id: 5,
        name: 'Cargo Beige',
        price: 120.000,
        image: "img/Casual/cargo beige.jpg",
        category: 'Casual',
        destacado: false
    },
    {
        id: 6,
        name: 'Flexible Gray',
        price: 100.000,
        image: "img/Casual/flexible gray.jpg",
        category: 'Casual',
        destacado: true
    },
    {
        id: 7,
        name: 'Jean Claro',
        price: 100.000,
        image: "img/Casual/jean claro.jpg",
        category: 'Casual',
        destacado: false
    },
    {
        id: 8,
        name: 'Camiseta Azul',
        price: 60.000,
        image: "img/Deportiva/azul.jpg",
        category: 'Deportivo',
        destacado: false
    },
    {
        id: 9,
        name: 'Camiseta Negra',
        price: 60.00,
        image: "img/Deportiva/black.jpg",
        category: 'Deportivo',
        destacado: true
    },
    {
        id: 10,
        name: 'Camuflado Gris',
        price: 110.000,
        image: "img/Deportiva/camuflado gris.jpg",
        category: 'Deportivo',
        destacado: false
    },
    {
        id: 11,
        name: 'Conjunto b-b',
        price: 180.000,
        image: "img/Deportiva/conjunto b-b.jpg",
        category: 'Deportivo',
        destacado: false
    },
    {
        id: 12,
        name: 'Conjunto Olivo',
        price: 190.000,
        image: "img/Deportiva/conjunto olivo.jpg",
        category: 'Deportivo',
        destacado: false
    },
    {
        id: 13,
        name: 'Trusa Negra',
        price: 100.000,
        image: "img/Deportiva/trusa negra deportiva.jpg",
        category: 'Deportivo',
        destacado: false
    },
    {
        id: 14,
        name: 'Camisa a cuadros azul',
        price: 70.000,
        image: "img/Elegante/camisa a cuadros azul.jpg",
        category: 'Elegante',
        destacado: false
    },
    {
        id: 15,
        name: 'Camisa Gris',
        price: 70.000,
        image: "img/Elegante/gray.jpg",
        category: 'Elegante',
        destacado: true
    },
    {
        id: 16,
        name: 'Camisa Manga Corta',
        price: 65.000,
        image: "img/Elegante/gris manga corta.jpg",
        category: 'Elegante',
        destacado: false
    },
    {
        id: 17,
        name: 'Camisa Rosada',
        price: 70.000,
        image: "img/Elegante/lila.jpg",
        category: 'Elegante',
        destacado: false
    },
    {
        id: 18,
        name: 'Pantalón Café',
        price: 125.000,
        image: "img/Elegante/pantalon brown.jpg",
        category: 'Elegante',
        destacado: false
    },
    {
        id: 19,
        name: 'Pantalón Azul Oscuro',
        price: 125.000,
        image: "img/Elegante/pantalon dark blue.jpg",
        category: 'Elegante',
        destacado: false
    },
    {
        id: 20,
        name: 'Pantalón Negro',
        price: 125.000,
        image: "img/Elegante/pantalon negro.jpg",
        category: 'Elegante',
        destacado: false
    },
    {
        id: 21,
        name: 'Pantalón Azul',
        price: 125.000,
        image: "img/Elegante/pantalon sky blue.jpg",
        category: 'Elegante',
        destacado: false
    }
];
window.onload = function () {
    localStorage.setItem('database', JSON.stringify(database));
    localStorage.setItem('cart', JSON.stringify(cart))
}});