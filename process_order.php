<?php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$dbname = 'cristian_store';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

// Get the posted data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate data
if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || 
    empty($data['address']) || empty($data['paymentMethod']) || empty($data['cart'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid order data']);
    exit();
}

try {
    // Start transaction
    $conn->beginTransaction();

    // Insert customer
    $stmt = $conn->prepare("INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['address']
    ]);
    $customer_id = $conn->lastInsertId();

    // Calculate total
    $total = 0;
    foreach ($data['cart'] as $item) {
        $total += $item['price'];
    }

    // Insert order
    $stmt = $conn->prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)");
    $stmt->execute([
        $customer_id,
        $total,
        $data['paymentMethod']
    ]);
    $order_id = $conn->lastInsertId();

    // Insert order items
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, price) VALUES (?, ?, ?)");
    foreach ($data['cart'] as $item) {
        // First, get or insert product
        $product_stmt = $conn->prepare("SELECT product_id FROM products WHERE name = ?");
        $product_stmt->execute([$item['name']]);
        $product = $product_stmt->fetch();
        
        if (!$product) {
            // Insert new product if not exists
            $insert_product = $conn->prepare("INSERT INTO products (name, price) VALUES (?, ?)");
            $insert_product->execute([$item['name'], $item['price']]);
            $product_id = $conn->lastInsertId();
        } else {
            $product_id = $product['product_id'];
        }

        $stmt->execute([$order_id, $product_id, $item['price']]);
    }

    // Commit transaction
    $conn->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Comanda a fost procesată cu succes! Numărul comenzii: ' . $order_id,
        'order_id' => $order_id
    ]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode([
        'status' => 'error',
        'message' => 'Eroare la procesarea comenzii: ' . $e->getMessage()
    ]);
}
?>