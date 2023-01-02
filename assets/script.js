$(document).ready(() => {
    const dashboard = $('.dashboard').masonry({
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        transitionDuration: '0.5s',
    });

    dashboard.on('click', '.grid-item', function () {
        $(this).toggleClass('grid-item-width');
        dashboard.masonry('layout');
    });

    const imageObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    loadImages();
                }  
            });
        },
        {
            rootMargin: '300px 0px 0px'
        }
    );

    const apiUrl = 'https://ponyweb.ml/v1/image/all';
    let limit = 30;
    let offset = 0;

    const loadImages = async () => {
        try {
            const response = await axios.get(
                apiUrl,
                {
                    params: {
                        limit: limit,
                        offset: limit * offset++,
                    }
                }
            );
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
                $(img).on('load', () => {
                    dashboard.masonry('layout');
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

            setTimeout(() => {
                //In case if masonry messed up while loading
                dashboard.masonry('layout');

                const lastGridItem = $('.dashboard .grid-item:last-child')[0];
                imageObserver.observe(lastGridItem);
            }, 1500);

        } catch (error) {
            alert('Something went wrong, cannot load more images');
            console.error(error);
        }

    };
    loadImages();
});

/* 
    Anyways this code can be laggy 
    when there are many images loaded already
    since masonry recalculates dashboard many times

    It still works on my phone, but gonna be bad on
    low-level segment
*/