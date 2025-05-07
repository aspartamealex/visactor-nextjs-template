<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://stratabuildingmanager-alexs-projects-4a823196.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    http_response_code(200);
    exit;
}

// Debug log
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
error_log("Request headers: " . print_r(getallheaders(), true));

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

// Only handle GET and POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'POST') 
{
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') 
{
    // Get all announcements or a specific announcement
    if (isset($_GET['id'])) 
    {
        $id = $db->real_escape_string($_GET['id']);
        $query = "SELECT * FROM announcements WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) 
        {
            echo json_encode(['announcements' => [$result->fetch_assoc()]]);
        } 
        else 
        {
            http_response_code(404);
            echo json_encode(['error' => 'Announcement not found']);
        }
    } 
    else 
    {
        $query = "SELECT id, title, content, date, people FROM announcements ORDER BY date DESC";
        $stmt = $db->prepare($query);
        if (!$stmt) 
        {
            error_log("Prepare failed: " . $db->error);
            http_response_code(500);
            echo json_encode(['error' => 'Failed to prepare statement']);
            exit;
        }
        
        if (!$stmt->execute()) 
        {
            error_log("Execute failed: " . $stmt->error);
            http_response_code(500);
            echo json_encode(['error' => 'Failed to execute statement']);
            exit;
        }
        
        $result = $stmt->get_result();
        $announcements = [];
        
        while ($row = $result->fetch_assoc()) 
        {
            $announcements[] = $row;
        }
        
        echo json_encode(['announcements' => $announcements]);
    }
} 
else if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    // Get the raw POST data
    $raw_data = file_get_contents('php://input');
    if (!$raw_data) 
    {
        http_response_code(400);
        echo json_encode(['error' => 'No data received']);
        exit;
    }

    // Decode the JSON data
    $data = json_decode($raw_data, true);
    if (json_last_error() !== JSON_ERROR_NONE) 
    {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data: ' . json_last_error_msg()]);
        exit;
    }

    // Validate required fields
    $required_fields = ['title', 'content', 'date', 'people'];
    foreach ($required_fields as $field) 
    {
        if (!isset($data[$field]) || empty($data[$field])) 
        {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            exit;
        }
    }
    
    try 
    {
        $query = "INSERT INTO announcements (title, content, date, people) 
                 VALUES (?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        if (!$stmt) 
        {
            throw new Exception("Failed to prepare statement: " . $db->error);
        }

        $stmt->bind_param('ssss',
            $data['title'],
            $data['content'],
            $data['date'],
            $data['people']
        );
        
        if (!$stmt->execute()) 
        {
            throw new Exception("Failed to execute statement: " . $stmt->error);
        }

        echo json_encode([
            'success' => true, 
            'id' => $db->insert_id,
            'message' => 'Announcement created successfully'
        ]);
    } 
    catch (Exception $e) 
    {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to create announcement: ' . $e->getMessage()
        ]);
    }
}

$db->close(); 