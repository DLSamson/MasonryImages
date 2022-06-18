$(document).ready(() => {
    const masonry = new Masonry('.dashboard', {
        itemSelector: '.grid-item',
        columnWidth: 24,
        gutter: 10,
        percentPosition: true,
    });

    $('.grid-item').on('click', function() {
        $(this).toggleClass('grid-item-width');
        masonry.layout();
    });
});
