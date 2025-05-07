<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    http_response_code(200);
    exit;
}

// Parse DATABASE_URL
$db_url = getenv('DATABASE_URL') ?: 'mysql://root:kyXWJswlAqXfarmmmhmkDuqDpJEuGoRx@interchange.proxy.rlwy.net:15918/railway';
if (!$db_url) {
    http_response_code(500);
    echo json_encode(['error' => 'DATABASE_URL not set']);
    exit;
}

// Parse the URL
$url = parse_url($db_url);
if (!$url || !isset($url['host'], $url['user'], $url['pass'], $url['path'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid DATABASE_URL format']);
    exit;
}

// Extract components
$host = $url['host'];
$port = $url['port'] ?? 3306;
$user = $url['user'];
$pass = $url['pass'];
$dbname = ltrim($url['path'], '/');

// Create connection
$db = new mysqli($host, $user, $pass, $dbname, $port);

if ($db->connect_error) 
{
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $db->connect_error]);
    exit;
}

// Only handle GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') 
{
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get all owners or a specific owner
if (isset($_GET['id'])) 
{
    $id = $db->real_escape_string($_GET['id']);
    $query = "SELECT id, name, building, room, email, phone, levies, insured FROM owners WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) 
    {
        echo json_encode($result->fetch_assoc());
    } 
    else 
    {
        http_response_code(404);
        echo json_encode(['error' => 'Owner not found']);
    }
} 
else 
{
    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM owners";
    $countResult = $db->query($countQuery);
    $totalCount = $countResult->fetch_assoc()['total'];

    // Get owners list
    $query = "SELECT id, name, building, room, email, phone, levies, insured FROM owners ORDER BY building, room";
    $result = $db->query($query);
    $owners = [];
    
    while ($row = $result->fetch_assoc()) 
    {
        $owners[] = $row;
    }
    
    echo json_encode([
        'total' => $totalCount,
        'owners' => $owners
    ]);
}

$db->close(); 