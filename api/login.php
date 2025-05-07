<?php
// Set CORS headers to allow requests from the frontend
header("Access-Control-Allow-Origin: https://stratabuildingmanager-alexs-projects-4a823196.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    http_response_code(200);
    exit();
}

// Handle HEAD request for server check
if ($_SERVER['REQUEST_METHOD'] === 'HEAD') 
{
    http_response_code(200);
    exit();
}

// Only allow POST requests for actual login
if ($_SERVER['REQUEST_METHOD'] !== 'POST') 
{
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get JSON data from request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate login credentials
if (!isset($data['username']) || !isset($data['password'])) 
{
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing username or password']);
    exit();
}

// Database connection
$db_url = getenv('DATABASE_URL') ?: 'mysql://root:kyXWJswlAqXfarmmmhmkDuqDpJEuGoRx@interchange.proxy.rlwy.net:15918/railway';
$url = parse_url($db_url);

if (!$url || !isset($url['host'], $url['user'], $url['pass'], $url['path'])) 
{
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database configuration error']);
    exit();
}

$host = $url['host'];
$port = $url['port'] ?? 3306;
$user = $url['user'];
$pass = $url['pass'];
$dbname = ltrim($url['path'], '/');

try 
{
    // Create connection
    $db = new mysqli($host, $user, $pass, $dbname, $port);
    
    if ($db->connect_error) 
    {
        throw new Exception($db->connect_error);
    }

    // Authentication check
    $stmt = $db->prepare("SELECT id, username, pfp, role, age, email, phone FROM users WHERE username = ? AND password = ?");
    if (!$stmt) 
    {
        throw new Exception("Database error");
    }

    $stmt->bind_param("ss", $data['username'], $data['password']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) 
    {
        $user = $result->fetch_assoc();
        
        // Add forward slash to pfp if it doesn't start with one
        if ($user['pfp'] && !str_starts_with($user['pfp'], '/')) 
        {
            $user['pfp'] = '/' . $user['pfp'];
        }

        // Start session and store user data
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Set session cookie
        setcookie('PHPSESSID', session_id(), [
            'expires' => time() + 86400, // 24 hours
            'path' => '/',
            'secure' => true,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        echo json_encode(['success' => true, 'user' => $user]);
    } 
    else 
    {
        echo json_encode(['success' => false, 'error' => 'Incorrect username or password']);
    }

    $stmt->close();
    $db->close();
} 
catch (Exception $e) 
{
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
?> 