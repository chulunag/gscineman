<?php

class MoviesScheduler {

    private $post, $db;

    public function __construct() {

        include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/common/class-nosql-database.php';
        try {
            $connect = new NoSqlDatabase();
            $this->db = $connect->nosql->selectDB('gsdb');
        } catch (Exception $e) {
            exit(json_encode(['error' => true, 'error_msg' => $e->getMessage()]));
        }
    }

    public function set_post($p) {
        $this->post = $p;
    }

    public function apply() {
        $exists = $this->db->schedules->findOne(array('date' => $this->post['date']), ['date' => 1]);

        $data = ['date' => $this->post['date'], 'schedules' => $this->post['schedules']];

        if (!$exists)
            $this->db->schedules->insert($data);
        else
            $this->db->schedules->update(['date' => $this->post['date']], $data);
    }

    public function get_schedule() {

        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $data = $this->db->schedules->findOne(array('date' => date('Y-m-d')));

        if (!$data) {

            $schedules = [
                array("room" => 1, "schedule" => [array("type" => "open", "time" => "07:00")]),
                array("room" => 2, "schedule" => [array("type" => "open", "time" => "07:00")]),
                array("room" => 3, "schedule" => [array("type" => "open", "time" => "07:00")])];

            echo json_encode(array('schedules' => $schedules, 'moviesIndex' => NULL));
        } else {

            $moviesDistinct = [];
            foreach ($data['schedules'] as $item) {
                foreach ($item['schedule'] as $m) {
                    if ($m['type'] == 'movie')
                        $moviesDistinct[$m['_id']] = true;
                }
            }

            $objIds = array_map(function($k) {
                return new MongoId($k);
            }, array_keys($moviesDistinct));

            $movies = $this->db->movies->find(array('_id' => array('$in' => $objIds)), ['IntTitle' => 1, 'Runtime' => 1, 'Format' => 1]);

            $moviesIndex = [];
            foreach ($movies as $item) {
                $moviesIndex[(string) $item['_id']] = $item;
            }

            echo json_encode(array('schedules' => $data['schedules'], 'moviesIndex' => $moviesIndex));
        }
    }

}
