<?php
$ip = gethostbyname(gethostname());
$socket = socket_create(AF_INET, SOCK_STREAM, 0);
socket_bind($socket, $ip, 8000);
socket_listen($socket, 5);
echo "Socket listening... \n";

$clients = [
    $socket
];

while (true) {
    $changed = $clients;
    socket_select($changed, $null, $null, 0, 10);
    
    if (in_array($socket, $changed)) {
        
        $new_client = socket_accept($socket);
        $clients [] = $new_client;
        
        $header = socket_read($new_client, 1024);
        handshake($header, $new_client);
        
        unset($changed [array_search($socket, $changed)]);
    }
    
    foreach ($changed as $client) {
        while (@socket_recv($client, $buf, 1024, 0) >= 1) {
            echo $buf;
            break 2;
        }
    }
}

socket_close($socket);

// functions
function send_message($clients, $msg) {
    foreach ($clients as $changed_socket) {
        @socket_write($changed_socket, $msg, strlen($msg));
    }
    return true;
}

function mask($text) {
    $b1 = 0x80 | (0x1 & 0x0f);
    $length = strlen($text);
    
    if ($length <= 125)
        $header = pack('CC', $b1, $length);
    elseif ($length > 125 && $length < 65536)
        $header = pack('CCn', $b1, 126, $length);
    elseif ($length >= 65536)
        $header = pack('CCNN', $b1, 127, $length);
    return $header . $text;
}

function unmask($text) {
    $length = ord($text [1]) & 127;
    if ($length == 126) {
        $masks = substr($text, 4, 4);
        $data = substr($text, 8);
    } elseif ($length == 127) {
        $masks = substr($text, 10, 4);
        $data = substr($text, 14);
    } else {
        $masks = substr($text, 2, 4);
        $data = substr($text, 6);
    }
    
    $text = '';
    for ($i = 0; $i < strlen($data); ++ $i) {
        $text .= $data [$i] ^ $masks [$i % 4];
    }
    
    return $text;
}

function handshake($_header, $_sock) {
    $headers = array();
    $lines = preg_split("/\r\n/", $_header);
    
    foreach ($lines as $line) {
        $line = chop($line);
        if (preg_match('/\A(\S+): (.*)\z/', $line, $matches)) {
            $headers [$matches [1]] = $matches [2];
        }
    }
    
    $sec_key = $headers ['Sec-WebSocket-Key'];
    $sec_accept = base64_encode(pack('H*', sha1($sec_key . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
    
    $response = [
        'HTTP/1.1 101 MyMessage',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept:' . $sec_accept . PHP_EOL . PHP_EOL
    ];
    
    $upgrade = implode(PHP_EOL, $response);
    
    socket_write($_sock, $upgrade, strlen($upgrade));
}