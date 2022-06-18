<?php

$path = __DIR__.'/media/';
$files = scandir($path, SCANDIR_SORT_ASCENDING);
$images = array_filter($files, fn($element) => preg_match('/.(png|jpeg|jpg|gif)/', $element));
$images = array_map(fn($element) => '/media/'.$element, $images);

 ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>My images</title>
        <base href="/">
        <link rel="stylesheet" href="assets/normalize.css">
        <link rel="stylesheet" href="assets/skeleton.css">
    </head>
    <body>
        <div class="container">
            <div class="dashboard">
                <?php foreach ($images as $img): ?>
                    <div class="grid-item <?php echo rand(0,3) == 0 ? 'grid-item-width' : '' ?>">
                        <img src="<?= $img ?>">
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
        <script src="assets/script.js"></script>
    </body>
</html>
