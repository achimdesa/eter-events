// ===============================
// WELCOME MESSAGE
// ===============================

console.log("Welcome to Eter Events Website!");


// ===============================
// BUTTON HOVER EFFECT
// ===============================

const button = document.querySelector(".btn");

button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.05)";
});

button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)";
});


// ===============================
// SIMPLE SCROLL ANIMATION
// ===============================

window.addEventListener("scroll", () => {

    const cards = document.querySelectorAll(".service-card");

    cards.forEach((card) => {

        const cardPosition = card.getBoundingClientRect().top;

        const screenPosition = window.innerHeight / 1.2;

        if(cardPosition < screenPosition){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }

    });

});


// ===============================
// INITIAL CARD STYLE
// ===============================

const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease";
});

// ===============================
// MOBILE MENU TOGGLE
// ===============================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".service-item, .gallery-item, .camp-card, .why-card, .mv-card, .contact-form, .why-us h2"
);

function revealOnScroll(){

    revealElements.forEach((element) => {

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint){

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ===============================
// LIGHTBOX GALLERY
// ===============================

const galleryImages = document.querySelectorAll(".gallery-image");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeLightbox = document.querySelector(".close-lightbox");

if(galleryImages.length > 0 && lightbox){

    galleryImages.forEach((image) => {

        image.addEventListener("click", () => {

            lightbox.style.display = "flex";

            lightboxImage.src = image.src;

        });

    });

    closeLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}

// ===============================
// ANIMATED COUNTERS
// ===============================

const counters = document.querySelectorAll(".counter");

const speed = 200;

counters.forEach((counter) => {

    const updateCount = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / speed;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCount, 15);

        }else{

            counter.innerText = target + "+";

        }

    };

    updateCount();

});

// ===============================
// EMAILJS CONTACT FORM
// ===============================

// INITIALIZE EMAILJS

emailjs.init("ePML25QZ4cO6glnY9");

// FORM SUBMIT

const contactForm = document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", function(event){

        event.preventDefault();

        emailjs.sendForm(
            "service_xxo6a7p",
            "template_hc3dv2v",
            this
        )

        .then(() => {

            alert("Message sent successfully!");

            contactForm.reset();

        })

        .catch((error) => {

            alert("Failed to send message.");

            console.log(error);

        });

    });

}

// ===============================
// STICKY NAVBAR EFFECT
// ===============================

const navbar = document.querySelector(".sticky-navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
