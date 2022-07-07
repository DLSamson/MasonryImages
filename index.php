<?php

$path = __DIR__.'/media/';
$files = scandir($path, SCANDIR_SORT_ASCENDING);
$images = array_filter($files, fn($element) => preg_match('/.(png|jpeg|jpg|gif)/', $element));

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <base href="/">
        <title>My images</title>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="assets/normalize.css">
        <link rel="stylesheet" href="assets/skeleton.css">
    </head>
    <body>
        <div class="container">
            <h1>Masonry images</h1>
            <hr>
            <div class="dashboard">
                <div class="grid-sizer"></div>
                <?php foreach ($images as $img): ?>
                    <div class="grid-item <?php echo rand(0,3) == 0 ? 'grid-item-width' : '' ?>">
                        <img src="/media/<?= $img ?>">
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
        <script src="assets/script.js"></script>
    </body>
</html>
