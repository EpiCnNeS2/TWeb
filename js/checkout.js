document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.querySelector('#checkout-form');

    // Load cart items and display them
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.querySelector('#cart-summary tbody');
    const cartTotal = document.querySelector('#cart-total');
    
    // Display cart items
    let total = 0;
    cartTable.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} RON</td>
        `;
        cartTable.appendChild(row);
        total += item.price;
    });
    cartTotal.textContent = `${total} RON`;

    if (!checkoutForm) {
        console.error('Formularul nu a fost găsit!');
        return;
    }

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            address: document.getElementById('address').value.trim(),
            paymentMethod: document.querySelector('input[name="payment"]:checked')?.value,
            cart: cart
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.paymentMethod) {
            alert('Te rog completează toate câmpurile obligatorii!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Te rog introdu o adresă de email validă!');
            return;
        }

        // Phone validation (simple check for at least 6 digits)
        const phoneRegex = /[0-9]{6,}/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Te rog introdu un număr de telefon valid!');
            return;
        }

        // Disable submit button to prevent multiple submissions
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Se procesează...';

        // Send data to server
        fetch('process_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                // Clear cart on success
                localStorage.removeItem('cart');
                // Redirect to confirmation page with order ID
                window.location.href = `pagina-confirmare.html?order_id=${data.order_id}`;
            } else {
                alert(`Eroare: ${data.message}`);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Trimite Comanda';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('A apărut o eroare la procesarea comenzii. Te rugăm să încerci din nou.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Trimite Comanda';
        });
    });

    // Auto-format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) {
                value = value.substring(0, 3) + ' ' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + ' ' + value.substring(7);
            }
            e.target.value = value;
        });
    }
});