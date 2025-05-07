<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

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

switch ($_SERVER['REQUEST_METHOD']) 
{
    case 'GET':
        // Get all users or a specific user
        if (isset($_GET['id'])) 
        {
            $id = $db->real_escape_string($_GET['id']);
            $query = "SELECT * FROM users WHERE id = ?";
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
                echo json_encode(['error' => 'User not found']);
            }
        } 
        else 
        {
            $query = "SELECT * FROM users ORDER BY role, username";
            $result = $db->query($query);
            $users = [];
            
            while ($row = $result->fetch_assoc()) 
            {
                $users[] = $row;
            }
            
            echo json_encode($users);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $query = "INSERT INTO users (username, password, pfp, role, age, email, phone) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ssssiss',
            $data['username'],
            $data['password'],
            $data['pfp'],
            $data['role'],
            $data['age'],
            $data['email'],
            $data['phone']
        );
        
        if ($stmt->execute()) 
        {
            echo json_encode(['success' => true, 'id' => $db->insert_id]);
        } 
        else 
        {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create user']);
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $query = "UPDATE users SET 
            username = ?,
            password = ?,
            pfp = ?,
            role = ?,
            age = ?,
            email = ?,
            phone = ?
            WHERE id = ?";
            
        $stmt = $db->prepare($query);
        $stmt->bind_param('ssssissi',
            $data['username'],
            $data['password'],
            $data['pfp'],
            $data['role'],
            $data['age'],
            $data['email'],
            $data['phone'],
            $data['id']
        );
        
        if ($stmt->execute()) 
        {
            echo json_encode(['success' => true]);
        } 
        else 
        {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update user']);
        }
        break;
        
    case 'DELETE':
        if (isset($_GET['id'])) 
        {
            $id = $db->real_escape_string($_GET['id']);
            $query = "DELETE FROM users WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param('i', $id);
            
            if ($stmt->execute()) 
            {
                echo json_encode(['success' => true]);
            } 
            else 
            {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete user']);
            }
        } 
        else 
        {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$db->close(); 