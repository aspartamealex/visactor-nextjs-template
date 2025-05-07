<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Parse DATABASE_URL
$db_url = getenv('DATABASE_URL') ?: 'mysql://root:kyXWJswlAqXfarmmmhmkDuqDpJEuGoRx@interchange.proxy.rlwy.net:15918/railway';
if (!$db_url) 
{
    http_response_code(500);
    echo json_encode(['error' => 'DATABASE_URL not set']);
    exit;
}

// Parse the URL
$url = parse_url($db_url);
if (!$url || !isset($url['host'], $url['user'], $url['pass'], $url['path'])) 
{
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

// Get total count and insured count
$totalQuery = "SELECT COUNT(*) as total FROM owners";
$totalResult = $db->query($totalQuery);
$totalCount = $totalResult->fetch_assoc()['total'];

$insuredQuery = "SELECT COUNT(*) as insured FROM owners WHERE insured = 1";
$insuredResult = $db->query($insuredQuery);
$insuredCount = $insuredResult->fetch_assoc()['insured'];

$leviesQuery = "SELECT COUNT(*) as paid FROM owners WHERE levies = 1";
$leviesResult = $db->query($leviesQuery);
$leviesPaidCount = $leviesResult->fetch_assoc()['paid'];

// Get uninsured owners
$uninsuredQuery = "SELECT id, name, building, room FROM owners WHERE insured = 0 ORDER BY building, room";
$uninsuredResult = $db->query($uninsuredQuery);
$uninsuredOwners = [];
while ($row = $uninsuredResult->fetch_assoc()) 
{
    $uninsuredOwners[] = $row;
}

// Get unpaid levies
$unpaidQuery = "SELECT id, name, building, room FROM owners WHERE levies = 0 ORDER BY building, room";
$unpaidResult = $db->query($unpaidQuery);
$unpaidOwners = [];
while ($row = $unpaidResult->fetch_assoc()) 
{
    $unpaidOwners[] = $row;
}

echo json_encode([
    'total' => $totalCount,
    'insured' => $insuredCount,
    'leviesPaid' => $leviesPaidCount,
    'uninsuredOwners' => $uninsuredOwners,
    'unpaidOwners' => $unpaidOwners
]);

$db->close();