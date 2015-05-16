<?php

include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/common/class-nosql-database.php';
$db = new NoSqlDatabase();

$post = $_POST ['post'];
$_id = $post['_id'];
unset($post['_id']);

$db->nosql->gsdb->movies->update(
        ['_id' => new MongoId($_id)], ['$set' => ['addition.disabled' => $post['disabled']]], ['upsert' => false]);
