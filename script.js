document.addEventListener('DOMContentLoaded', () => {
    //so the nav bar knows what page it is on
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav_link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));

                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav_link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));
    // this is for the carousel for the prtoject cards
    const track = document.querySelector('.project_wrap');
    const btns = document.querySelectorAll('.display_buttons');
    const totalCards = document.querySelectorAll('.project').length;
    let currentIndex = 0;
    function getVisibleCards() {
        if (window.innerWidth >= 1100) return 3;
        if (window.innerWidth >= 600) return 2;
        return 1;
    }
    function updateCarousel() {
        const cardWidth = track.children[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    // prev button
    btns[0].addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    // next button
    btns[1].addEventListener('click', () => {
        const maxIndex = totalCards - getVisibleCards();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    window.addEventListener('resize', () => {
        currentIndex = 0;
        track.style.transition = 'none';
        updateCarousel();
        setTimeout(() => track.style.transition = 'transform 0.4s ease', 50);
    });
    //for the education block
    var coll = document.getElementsByClassName("collapsible_button");
    var i;
    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
    }
});