

let navbar = document.querySelector('.header .navbar');

window.onscroll=()=>{
    navbar.classList.remove('active');
    if(window.scrollY>0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};



const slider = document.querySelector('.slider');
let autoSlideInterval;

// Function to move the first item to the end
function nextSlide() {
    const items = document.querySelectorAll('.item');
    slider.append(items[0]);
}

// Function to move the last item to the beginning
function prevSlide() {
    const items = document.querySelectorAll('.item');
    slider.prepend(items[items.length - 1]);
}

// Function to handle button clicks
function activate(e) {
    if (e.target.matches('.next')) {
        nextSlide();
        resetAutoSlide(); // Reset auto-slide timer
    }
    if (e.target.matches('.prev')) {
        prevSlide();
        resetAutoSlide(); // Reset auto-slide timer
    }
}

// Function to start auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Change every 3 seconds
}

// Function to reset auto-slide timer on manual action
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start everything
document.addEventListener('click', activate, false);
startAutoSlide();

