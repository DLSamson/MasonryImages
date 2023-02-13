$(document).ready(() => {
    /**
     * 
     * @param getImages function(limit:int, offset:int)  
     */
    const initImages = (getImages) => {
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

        const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        updateImages();
                    }  
                });
            },
            {rootMargin: '300px 0px 0px'}
        );

        /**
         * 
         * @param images {url, name, comment, id}[]
         */
        const addImages = async (images) => {
            try {
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

        let limit = 30;
        let offset = 0;
        const updateImages = () => {
            try {
                const images = getImages(limit, offset);
                addImages(images);
                offset += limit;
            }
            catch (error) {
                alert('Something went wrong, cannot load more images');
                console.error(error);
            }
        }
        updateImages();
    };

    initImages((limit, offset) => {
        const cards = [
            "white-valentine-card",
            "teddy-bear-valentine-card",
            "happy-valentine-red-card",
            "couple-sitting-on-bench",
            "golden-heart-love",
            "heart-shape-Gifts-for-valentine",
            "calender-for-valentine",
            "wed-couple-in-valentine",
            "couple-at-coffee-table",
            "love-mobile-app-card",
            "fun-on-valentine-day",
            "glitter-heart-propose",
            "couple-valentine-calender",
            "gift-exchange-valentine-card",
            "heart-gift-valentine-card",
            "valentine-propose-card",
            "couple-valentine-date",
            "happy-valentine-card",
            "pink-rose-valentine-s-day",
            "flower-pot-with-red-rose",
            "red-heart-shape-tree",
            "dog-with-rose-for-valentine",
            "beared-guy-love-propose",
            "teddybear-for-you",
            "lock-love-propose",
            "heart-in-crystal-bowl",
            "love-birds-enjoying-moment",
            "green-garden-grass-cutting",
            "propose-leaf-of-wind-chill",
            "i-love-you-with-pink-sketch"
        ];
        const words = [
            "Daniel",
            "Honey",
            "Cutie",
            "Sunshine",
            "I'm_under_your_spell",
            "Darling",
            "Sweetie",
            "You're_my_angel",
            "You're_perfect",
        ];
        
        const images = [];

        for (let index = 0; index < limit; index++) {
            const card = cards[getRandomInt(cards.length)];
            const word = words[getRandomInt(words.length)];

            images.push({
                url: `https://wishiy.com/i/${card}/for/${word}.jpg`,
                name: '', 
                comment: '', 
                id: `${card}-${word}`
            });
        }
        
        log('Images', images);
        return images;
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function log(...data) {
    const DEBUG = true;
    if(DEBUG) console.log(...data);
}

/* 
    Anyways this code can be laggy 
    when there are many images loaded already
    since masonry recalculates dashboard many times

    It still works on my phone, but gonna be bad on
    low-level segment
*/