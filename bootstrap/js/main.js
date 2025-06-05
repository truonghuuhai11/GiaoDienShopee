const swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    slidesPerGroup: 1,
    speed: 400,
    loop: false,
    allowTouchMove: true,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 5,
        },
        480: {
            slidesPerView: 3,
            spaceBetween: 8,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 6,
            spaceBetween: 10,
        },
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    // Simulate fetching cart count from an API
    const updateCartCount = (count) => {
        cartCount.textContent = count;
    };
    updateCartCount(3); // Replace with API call
});  