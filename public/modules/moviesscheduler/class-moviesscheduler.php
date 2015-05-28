<?php

class MoviesScheduler {

    private $post, $connect, $db;

    public function __construct() {

        include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/common/class-nosql-database.php';
        try {
            $this->connect = new NoSqlDatabase();
            $this->db = $this->connect->nosql->selectDB('gsdb');
        } catch (Exception $e) {
            exit(json_encode(['error' => true, 'error_msg' => $e->getMessage()]));
        }
    }

    public function set_post($p) {
        $this->post = $p;
    }

    public function apply() {
        $data = ['date' => $this->post['date'], 'schedule' => $this->post['schedule']];
        $this->db->schedules->insert($data);
    }

    public function get_schedule() {
        //1
        $doc = $this->db->schedules->findOne(array('date' => date('Y-m-d')));

        //2
        $moviesId = [];
        foreach ($doc['schedule'] as $schedule) {
            foreach ($schedule as $m) {
                $moviesId[$m['_id']] = true;
            }
        }

        $objIds = array_map(function($k) {
            return new MongoId($k);
        }, array_keys($moviesId));

        //3
        $docs = $this->db->movies->find(array('_id' => array('$in' => $objIds)), ['IntTitle' => 1, 'Runtime' => 1, 'Format' => 1]);

        $movies = [];
        foreach ($docs as $item) {
            $movies[(string) $item['_id']] = $item;
        }

        echo json_encode(['movies' => $movies, 'schedule' => $doc['schedule']]);
    }

}
