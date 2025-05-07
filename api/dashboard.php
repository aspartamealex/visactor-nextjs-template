<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') 
{
    // TODO: Replace with your actual database credentials
    $db = new mysqli(
        getenv('DB_HOST'),
        getenv('DB_USER'),
        getenv('DB_PASS'),
        getenv('DB_NAME')
    );
    
    if ($db->connect_error) 
    {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
    
    // Get total owners count
    $query = "SELECT COUNT(*) as total_owners FROM owners";
    $result = $db->query($query);
    $total_owners = $result->fetch_assoc()['total_owners'];
    
    // Get owners with valid insurance
    $query = "SELECT COUNT(*) as insured_owners FROM owners WHERE insurance_status = 'valid'";
    $result = $db->query($query);
    $insured_owners = $result->fetch_assoc()['insured_owners'];
    
    // Get total requests count
    $query = "SELECT COUNT(*) as total_requests FROM requests";
    $result = $db->query($query);
    $total_requests = $result->fetch_assoc()['total_requests'];
    
    // Get pending requests count
    $query = "SELECT COUNT(*) as pending_requests FROM requests WHERE status = 'pending'";
    $result = $db->query($query);
    $pending_requests = $result->fetch_assoc()['pending_requests'];
    
    // Get recent announcements
    $query = "SELECT * FROM announcements ORDER BY created_at DESC LIMIT 5";
    $result = $db->query($query);
    $recent_announcements = [];
    while ($row = $result->fetch_assoc()) 
    {
        $recent_announcements[] = $row;
    }
    
    echo json_encode([
        'stats' => [
            'total_owners' => $total_owners,
            'insured_owners' => $insured_owners,
            'total_requests' => $total_requests,
            'pending_requests' => $pending_requests
        ],
        'recent_announcements' => $recent_announcements
    ]);
    
    $db->close();
} 
else 
{
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
} 