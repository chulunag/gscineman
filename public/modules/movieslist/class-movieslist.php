<?php

class MoviesList {

    private $post, $connect, $db;

    public function __construct() {
        include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/common/class-nosql-database.php';
        try {
            $this->connect = new NoSqlDatabase();
            $this->db = $this->connect->nosql->selectDB('gsdb');
        } catch (Exception $e) {
            exit(json_encode(['error' => true]));
        }
    }

    public function set_post($post) {
        $this->post = $post;
    }

    public function set_mark() {
        $this->db->movies->update(
                array('_id' => new MongoId($this->post['_id'])), array('$set' => ['addition.mark' => $this->post['mark']]), array('upsert' => false));
    }

    public function set_disabled() {
        $this->db->movies->update(
                array('_id' => new MongoId($this->post['_id'])), array('$set' => ['addition.disabled' => $this->post['disabled']]), array('upsert' => false));
    }

    public function get_addition() {
        $doc = $this->db->movies->findOne(array('_id' => new MongoId($this->post['_id'])));

        if (isset($doc['addition']))
            echo json_encode($doc['addition']);
    }

}
