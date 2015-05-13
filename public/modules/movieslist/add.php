<?php
include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/common/class-nosql-database.php';

try {
    $db = new NoSqlDatabase();
} catch (Exception $e) {
    exit(json_encode(['error' => true, 'error_msg' => $e->getMessage()]));
}

$post = $_POST ['post'];

$db->nosql->gsdb->movies->insert($post);
