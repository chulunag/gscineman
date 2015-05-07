<?php
$post = $_POST ['post'];

include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/common/class-database.php';

$db = new Database ();

$stmt = $db->pdo->prepare ( 'INSERT INTO movies_list(title) VALUES(:title)' );
$stmt->execute ( [ 
		':title' => $post ['movie_title'] 
] );