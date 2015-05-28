<?php

include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/moviesscheduler/class-moviesscheduler.php';

$post = $_POST['post'];
$moviesscheduler = new MoviesScheduler();

$moviesscheduler->set_post($post);

if (isset($post['__action'])) {
    if (method_exists($moviesscheduler, $post['__action']))
        $moviesscheduler->{$post['__action']}();
}

