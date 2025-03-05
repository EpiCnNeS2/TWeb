document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obținem coșul din localStorage sau un coș gol
    const addToCartButtons = document.querySelectorAll('.add-to-cart'); // Selectăm toate butoanele "Adaugă în coș"

    // Adaugă produsul în coș
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            // Creăm obiectul produsului
            const product = { name: productName, price: productPrice };

            // Adăugăm produsul în coș
            cart.push(product);

            // Salvăm coșul actualizat în localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Arătăm un mesaj de confirmare
            alert(`${productName} a fost adăugat în coș!`);
        });
    });

    // Funcția pentru a actualiza coșul la încărcarea paginii
    function updateCart() {
        const cartTable = document.querySelector('#cart-table tbody');
        const totalElement = document.querySelector('.total');
        cartTable.innerHTML = ''; // Resetăm tabelul
        let total = 0;

        // Adăugăm fiecare produs din coș în tabel
        cart.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} RON</td>
                <td><button class="btn remove-item" data-index="${index}">Sterge</button></td>
            `;
            cartTable.appendChild(row);
            total += product.price;
        });

        // Actualizăm totalul coșului
        totalElement.textContent = `Total: ${total} RON`;
    }

    // Ștergere produs din coș
    document.querySelector('#cart-table').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Îndepărtăm produsul din coș
            localStorage.setItem('cart', JSON.stringify(cart)); // Actualizăm coșul în localStorage
            updateCart(); // Reactualizăm coșul
        }
    });

    // Redirecționare către pagina de checkout
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenim comportamentul implicit al formularului
        window.location.href = 'checkout.html'; // Redirecționăm utilizatorul către pagina de checkout
    });

    // Actualizăm coșul la încărcarea paginii
    updateCart();
});
