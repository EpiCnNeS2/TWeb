document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.querySelector('#cart-table tbody');
    const totalElement = document.querySelector('.total');
    const checkoutForm = document.getElementById('checkout-form');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // --- ADD TO CART BUTTONS (on produse.php) ---
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.id;
                const productName = this.getAttribute('data-product');
                const productPrice = parseFloat(this.getAttribute('data-price'));
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification(`${productName} a fost adăugat în coș!`);
            });
        });
    }

    // --- CART TABLE LOGIC (on cos.php) ---
    if (cartTable && totalElement) {
        function updateCart() {
            cartTable.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = '<td colspan="3" style="text-align: center;">Coșul tău este gol</td>';
                cartTable.appendChild(emptyRow);
                totalElement.textContent = 'Total: 0 RON';
                return;
            }

            cart.forEach((product, index) => {
                const row = document.createElement('tr');
                const itemTotal = product.price * product.quantity;

                row.innerHTML = `
                    <td>
                        ${product.name}
                        ${product.quantity > 1 ? `(x${product.quantity})` : ''}
                    </td>
                    <td>${itemTotal.toFixed(2)} RON</td>
                    <td>
                        <div class="quantity-controls">
                            <button class="btn quantity-btn minus" data-index="${index}">-</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="btn quantity-btn plus" data-index="${index}">+</button>
                            <button class="btn remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                cartTable.appendChild(row);
                total += itemTotal;
            });

            totalElement.textContent = `Total: ${total.toFixed(2)} RON`;
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        cartTable.addEventListener('click', function(e) {
            const index = e.target.closest('button')?.getAttribute('data-index');
            if (index === null || index === undefined) return;

            if (e.target.closest('.minus')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
            } else if (e.target.closest('.plus')) {
                cart[index].quantity++;
            } else if (e.target.closest('.remove-item')) {
                cart.splice(index, 1);
            }

            updateCart();
        });

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (cart.length === 0) {
                    alert('Coșul tău este gol. Adaugă produse înainte de checkout.');
                    return;
                }
                window.location.href = 'checkout.php';
            });
        }

        updateCart();
    }

    // --- NOTIFICATION FUNCTION ---
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
});
