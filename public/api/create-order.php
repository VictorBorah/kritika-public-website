<?php
/**
 * Kritika Micro Foundation - Cashfree Order Creation API (Server-Side)
 * Handles payment session generation server-to-server to prevent CORS and protect API secrets.
 */

// Allow cross-origin access (for localhost development and external previews)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, x-api-version");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed. Only POST requests are accepted."]);
    exit();
}

// Read raw JSON body
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON payload provided."]);
    exit();
}

$orderAmount = isset($input['orderAmount']) ? floatval($input['orderAmount']) : 0;
$customerId = !empty($input['customerId']) ? preg_replace('/[^a-zA-Z0-9_-]/', '_', $input['customerId']) : 'cust_' . time();
$customerName = !empty($input['customerName']) ? trim($input['customerName']) : 'Kritika Customer';
$customerEmail = !empty($input['customerEmail']) ? trim($input['customerEmail']) : 'sales@kritikafoundation.com';

// Sanitize 10-digit phone
$phone = !empty($input['customerPhone']) ? preg_replace('/\D/', '', $input['customerPhone']) : '';
if (strlen($phone) > 10) {
    $phone = substr($phone, -10);
}
if (strlen($phone) < 10) {
    $phone = '9954367393'; // Fallback to verified showroom phone
}

if ($orderAmount <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "Order amount must be greater than zero."]);
    exit();
}

$orderId = 'KMF_ORD_' . time() . '_' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 4));

// Load credentials from local secure config (gitignored) or server environment
$config = [];
if (file_exists(__DIR__ . '/cashfree-config.php')) {
    $config = include __DIR__ . '/cashfree-config.php';
}

$envMode = !empty($config['env']) ? $config['env'] : (getenv('CASHFREE_ENV') ?: 'sandbox');
$apiUrl = ($envMode === 'production') ? 'https://api.cashfree.com/pg/orders' : 'https://sandbox.cashfree.com/pg/orders';
$appId = !empty($config['app_id']) ? $config['app_id'] : getenv('CASHFREE_APP_ID');
$secretKey = !empty($config['secret_key']) ? $config['secret_key'] : getenv('CASHFREE_SECRET_KEY');
$apiVersion = '2026-01-01';

$payload = [
    'order_id' => $orderId,
    'order_amount' => round($orderAmount, 2),
    'order_currency' => 'INR',
    'customer_details' => [
        'customer_id' => $customerId,
        'customer_name' => $customerName,
        'customer_email' => $customerEmail,
        'customer_phone' => $phone
    ],
    'order_meta' => [
        'return_url' => isset($input['returnUrl']) ? $input['returnUrl'] : null,
        'notify_url' => null
    ],
    'order_note' => !empty($input['orderNote']) ? $input['orderNote'] : 'Kritika Micro Foundation E-Commerce Checkout'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-version: ' . $apiVersion,
    'x-client-id: ' . $appId,
    'x-client-secret: ' . $secretKey
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(["message" => "Gateway communication error: " . $curlError]);
    exit();
}

http_response_code($httpCode);
echo $response;

