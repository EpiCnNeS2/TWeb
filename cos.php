<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cristian Store</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/cos.css">
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
        <h2>Produsele tale</h2>
        <table id="cart-table">
            <thead>
                <tr>
                    <th>Produs</th>
                    <th>Pret (RON)</th>
                    <th>Actiune</th>
                </tr>
            </thead>
            <tbody>
                <!-- Produsele vor fi adăugate din JavaScript -->
            </tbody>
        </table>
        <p class="total">Total: 0 RON</p>
        <form id="checkout-form">
            <!-- Câmpuri formular -->
            <button type="submit" class="btn">Checkout -></button>
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

<script src="js/cos.js"></script>
</body>
</html>
