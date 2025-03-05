document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.querySelector('#checkout-form');

    // Verifică dacă formularul există
    if (!checkoutForm) {
        console.error('Formularul nu a fost găsit!');
        return;
    }

    // Ascultător pentru evenimentul submit
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne trimiterea automată a formularului

        // Adaugă logica pentru procesarea comenzii (de exemplu, validare date, afișare alertă, etc.)
        const name = checkoutForm.querySelector('#name').value;
        const email = checkoutForm.querySelector('#email').value;
        const phone = checkoutForm.querySelector('#phone').value;
        const address = checkoutForm.querySelector('#address').value;
        const paymentMethod = checkoutForm.querySelector('input[name="payment"]:checked');

        // Verifică dacă toate câmpurile sunt completate corect
        if (!name || !email || !phone || !address || !paymentMethod) {
            alert('Te rog să completezi toate câmpurile!');
            return;
        }

        // Afișează datele în consolă (sau le poți salva/trimite)
        console.log('Comanda a fost procesată:', {
            name,
            email,
            phone,
            address,
            paymentMethod: paymentMethod.value
        });

        // Afișează un mesaj de succes
        alert(`Comanda a fost trimisă cu succes!\n\nDetalii comandă:\nNume: ${name}\nEmail: ${email}\nTelefon: ${phone}\nAdresă: ${address}\nMetoda de plată: ${paymentMethod.value}`);

        // Redirecționare (optional, dacă vrei să duci utilizatorul undeva după procesare)
        // window.location.href = 'pagina-confirmare.html'; // de exemplu, redirecționezi către o pagină de confirmare

        // Sau poți curăța coșul de cumpărături (opțional)
        localStorage.removeItem('cart');
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obținem coșul din localStorage sau un coș gol
    const cartTable = document.querySelector('#cart-summary tbody');
    const totalElement = document.querySelector('#cart-total');

    // Funcție pentru a actualiza sumarul comenzii
    function updateCartSummary() {
        cartTable.innerHTML = ''; // Resetăm tabelul
        let total = 0;

        // Adăugăm fiecare produs din coș în tabel
        cart.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} RON</td>
            `;
            cartTable.appendChild(row);
            total += product.price;
        });

        // Actualizăm totalul
        totalElement.textContent = `${total} RON`;
    }

    // Actualizăm sumarul comenzii
    updateCartSummary();
});

