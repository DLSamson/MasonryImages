$(document).ready(() => {
    const masonry = new Masonry('.dashboard', {
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
    });

    $('.grid-item').on('click', function() {
        $(this).toggleClass('grid-item-width');
        masonry.layout();
    });

    setTimeout(() => {
        masonry.layout();
    }, 2000);
});
