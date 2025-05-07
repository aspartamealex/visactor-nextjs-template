<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers to allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    http_response_code(200);
    exit();
}

// Only allow GET requests for actual database test
if ($_SERVER['REQUEST_METHOD'] !== 'GET') 
{
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed',
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD'],
            'allowed' => 'GET'
        ]
    ]);
    exit();
}

// Default database URL for local environment
$db_url = getenv('DATABASE_URL') ?: 'mysql://root:kyXWJswlAqXfarmmmhmkDuqDpJEuGoRx@interchange.proxy.rlwy.net:15918/railway';

// Parse the URL
$url = parse_url($db_url);
if (!$url || !isset($url['host'], $url['user'], $url['pass'], $url['path'])) 
{
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid DATABASE_URL format',
        'debug' => [
            'url' => preg_replace('/\/\/[^:]+:[^@]+@/', '//***:***@', $db_url),
            'parsed' => $url
        ]
    ]);
    exit;
}

// Extract components
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

    // Get server version
    $version = $db->server_info;
    
    // Get list of tables
    $tables = [];
    $result = $db->query("SHOW TABLES");
    if ($result) 
    {
        while ($row = $result->fetch_array()) 
        {
            $tables[] = $row[0];
        }
    }

    // Return success response
    echo json_encode([
        'status' => 'success',
        'message' => 'Database connection successful',
        'server_version' => $version,
        'tables' => $tables,
        'connection_info' => [
            'host' => $host,
            'port' => $port,
            'database' => $dbname
        ]
    ]);
} 
catch (Exception $e) 
{
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed',
        'debug' => [
            'error' => $e->getMessage(),
            'host' => $host,
            'port' => $port,
            'database' => $dbname
        ]
    ]);
}

// Close connection if it exists
if (isset($db)) 
{
    $db->close();
} 