<?php

include_once $_SERVER ['DOCUMENT_ROOT'] . '/modules/movieslist/class-movieslist.php';

$post = $_POST['post'];
$movieslist = new MoviesList();

$movieslist->get_post($post);

if (isset($post['__action'])) {
    if (method_exists($movieslist, $post['__action']))
        $movieslist->{$post['__action']}();
}
