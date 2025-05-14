$(document).ready(function () {
    const checkoutForm = $('#checkout-form');

    // Load cart items and display them
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = $('#cart-summary tbody');
    const cartTotal = $('#cart-total');

    // Display cart items
    let total = 0;
    cartTable.empty();
    cart.forEach(item => {
        const row = `<tr>
            <td>${item.name} ${item.quantity > 1 ? `(x${item.quantity})` : ''}</td>
            <td>${(item.price * item.quantity).toFixed(2)} RON</td>
        </tr>`;
        cartTable.append(row);
        total += item.price * item.quantity;
    });
    cartTotal.text(`${total.toFixed(2)} RON`);

    if (checkoutForm.length === 0) {
        console.error('Formularul nu a fost găsit!');
        return;
    }

    checkoutForm.on('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            address: $('#address').val().trim(),
            paymentMethod: $('input[name="payment"]:checked').val(),
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

        // Phone validation (accept any non-empty value)
        if (!formData.phone) {
            alert('Te rog introdu un număr de telefon!');
            return;
        }

        // Disable submit button to prevent multiple submissions
        const submitBtn = checkoutForm.find('button[type="submit"]');
        submitBtn.prop('disabled', true).text('Se procesează...');

        // Send data to server using jQuery AJAX
        $.ajax({
            url: 'process_order.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                if (data.status === 'success') {
                    localStorage.removeItem('cart');
                    window.location.href = `pagina-confirmare.html?order_id=${data.order_id}`;
                } else {
                    alert(`Eroare: ${data.message}`);
                    submitBtn.prop('disabled', false).text('Trimite Comanda');
                }
            },
            error: function () {
                alert('A apărut o eroare la procesarea comenzii. Te rugăm să încerci din nou.');
                submitBtn.prop('disabled', false).text('Trimite Comanda');
            }
        });
    });

    // Auto-format phone number
    const phoneInput = $('#phone');
    if (phoneInput.length) {
        phoneInput.on('input', function (e) {
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