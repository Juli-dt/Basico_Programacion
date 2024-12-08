document.addEventListener('DOMContentLoaded', () => {
    
    const database = JSON.parse(localStorage.getItem('database'));
    const productContainer = document.querySelector('.products-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destacado = document.querySelector('.destacados')
    console.log(productContainer)
    function createProductHTML(product) {
        return `
            <div class="product" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}" class="product__image">
                <h3 class="product__title">${product.name}</h3>
                <p class="product__price">$${product.price.toFixed(3)}</p>
                <button class="product__add-to-cart" data-name="${product.name}" data-price="${product.price}">Agregar al carrito</button>
            </div>
        `;
    }

    function renderProducts(category = 'Todos') {
        productContainer.innerHTML = '';

        let productsToRender = database;

        if (category !== 'Todos') {
            productsToRender = productsToRender.filter(product => product.category === category);
        }

        if (destacado) {
            productsToRender = productsToRender.filter(product => product.destacado);
        }

        productsToRender.forEach(product => {
            productContainer.innerHTML += createProductHTML(product);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            renderProducts(category);
        });
    });

    if (window.location.pathname === '../../index.html') {
        renderProducts('Todos', true);
    } else {
        renderProducts();
    }
});
