$(document).ready(() => {
    const dashboard = $('.dashboard').masonry({
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
    });
    
    dashboard.on('click', '.grid-item', function() {
        $(this).toggleClass('grid-item-width');
        dashboard.masonry('layout');
    });

    const apiUrl = 'https://ponyweb.ml/v1/image/all';

    let limit = 10;
    let offset = 0;

    const loadImages = async () => {
        const response = await axios.get(apiUrl);
        const images = response.data.data;
        images.forEach((image, index) => {
            /*
            <div class="grid-item grid-item-width">
                <img src="" title="" id="">
            </div>
            */

            const gridItem = document.createElement('div');
            const img = document.createElement('img');
            img.src = image.url;
            img.title = `${image.name} | ${image.comment}`;
            img.id = image.id;

            // Not sure about the perfomance
            $(img).on('load readystatechange', (event) => {
                if(this.complete || (this.readyState == 'complete' && event.type == 'readystatechange')) 
                    dashboard.masonry('layout')
            });

            gridItem.classList.add('grid-item');
            index % 5 === 0
                ? gridItem.classList.add('grid-item-width')
                : null;

            gridItem.appendChild(img);

            dashboard
                .append(gridItem)
                .masonry('appended', gridItem);
        });

        //In order if masonry messed up while loading
        setTimeout(() => {
            dashboard.masonry('layout')
        }, 1500);
    };
    loadImages();
});
