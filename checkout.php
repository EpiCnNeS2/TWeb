<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Cristian Store</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/checkout.css">
</head>
<body>

<header>
    <h1>Cristian Store</h1>
</header>

<nav>
    <a href="index.php">Acasa</a>
    <a href="produse.php">Produse</a>
    <a href="cos.php">Cos de Cumparaturi</a>
</nav>

<main>
    <div class="container">
        <h2>Finalizați Comanda</h2>
        <form id="checkout-form" class="checkout-form">
            <h3>Informații de livrare</h3>
            <label for="name">Nume complet</label>
            <input type="text" id="name" name="name" required placeholder="Numele complet">

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Emailul tau">

            <label for="phone">Numar de telefon</label>
            <input type="tel" id="phone" name="phone" required placeholder="Numarul tau de telefon">

            <label for="address">Adresa de livrare</label>
            <input type="text" id="address" name="address" required placeholder="Adresa completa">

            <h3>Metoda de plată</h3>
            <div class="payment-methods">
                <label>
                    <input type="radio" name="payment" value="card" required>
                    Plata cu cardul
                </label>
                <label>
                    <input type="radio" name="payment" value="cash" required>
                    Plata ramburs
                </label>
            </div>

            <h3>Produsele tale</h3>
            <table id="cart-summary">
                <thead>
                    <tr>
                        <th>Produs</th>
                        <th>Pret (RON)</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <p class="total">Total: <span id="cart-total">0</span></p>

            <button type="submit" class="btn">Trimite Comanda</button>
        </form>
    </div>
</main>

<footer>
    <div class="footer-container">
        <div class="footer-links">
            <a href="termeni.php">Termeni și Condiții</a>
            <a href="despre-noi.php">Despre Noi</a>
        </div>
        <div class="social-icons">
            <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
        </div>
        <div class="contact-info">
            <p>Email: contact@cristianstore.ro</p>
            <p>Telefon: +40 123 456 789</p>
            <p>Adresa: Str. Exemplu 12, Chisinau, Moldova</p>
        </div>
    </div>
    <p>&copy; 2025 Cristian Store. Toate drepturile rezervate.</p>
</footer>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="js/checkout.js"></script>
</body>
</html>
