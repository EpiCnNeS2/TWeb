document.addEventListener("DOMContentLoaded", function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.querySelector('#cart-table tbody');
    const totalElement = document.querySelector('.total');
    const checkoutForm = document.getElementById('checkout-form');

    // Add to cart functionality (if on product page)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.id;
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            // Check if product already exists in cart
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

            updateCart();
            showNotification(`${productName} a fost adăugat în coș!`);
        });
    });

    // Update cart display
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

    // Handle quantity changes and removal
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

    // Handle checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Coșul tău este gol. Adaugă produse înainte de checkout.');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    // Show notification function
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

    // Initialize cart display
    updateCart();

    // Add some basic styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeIn 0.3s;
        }
        .fade-out {
            animation: fadeOut 0.5s forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .quantity-btn {
            width: 25px;
            height: 25px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
});
