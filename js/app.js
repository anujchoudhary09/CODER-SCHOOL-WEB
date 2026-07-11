"use strict";

/* ===========================
   DOM Elements
=========================== */

const header = document.querySelector(".header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-menu a");

const hero = document.querySelector(".hero");

/* ===========================
   Mobile Menu
=========================== */

if(menuToggle && navMenu){

    menuToggle.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

        menuToggle.textContent =
            navMenu.classList.contains("active")
            ? "✕"
            : "☰";

    });

}

/* ===========================
   Close Menu After Click
=========================== */

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navMenu.classList.remove("active");

        if(menuToggle){

            menuToggle.textContent="☰";

        }

    });

});

/* ===========================
   Sticky Header
=========================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

        header.style.background="rgba(255,255,255,.98)";

    }

    else{

        header.style.boxShadow="0 2px 8px rgba(0,0,0,.08)";

        header.style.background="rgba(255,255,255,.95)";

    }

});

/* ===========================
   Active Navigation
=========================== */

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-140;

        const height=section.offsetHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});
/* ===========================
   Scroll Reveal Animation
=========================== */

const revealElements = document.querySelectorAll(

".highlight-card, .academic-card, .facility-card, .notification-card, .event-card, .testimonial-card, .gallery-grid img, .stat-card, .about-preview, .principal"

);

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < trigger){

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* ===========================
   Statistics Counter
=========================== */

const counters = document.querySelectorAll("[data-count]");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    const statsSection = document.querySelector(".statistics");

    if(!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;

    if(sectionTop > window.innerHeight) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target = Number(counter.dataset.count);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 100));

        const timer = setInterval(() => {

            current += increment;

            if(current >= target){

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current + "+";

        },20);

    });

}

window.addEventListener("scroll", startCounters);

window.addEventListener("load", startCounters);

/* ===========================
   Scroll To Top Button
=========================== */

const scrollTopBtn = document.createElement("button");

scrollTopBtn.className = "scroll-top";

scrollTopBtn.innerHTML = "↑";

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        scrollTopBtn.classList.add("show");

    }else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
/* ===========================
   Lazy Image Loading
=========================== */

const lazyImages = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries, observer)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting){

            return;

        }

        const image = entry.target;

        image.classList.add("loaded");

        observer.unobserve(image);

    });

},{
    threshold:0.1
});

lazyImages.forEach(image=>{

    imageObserver.observe(image);

});

/* ===========================
   Image Error Handler
=========================== */

lazyImages.forEach(image=>{

    image.addEventListener("error",()=>{

        image.src="assets/images/placeholder.jpg";

        image.alt="Image Not Available";

    });

});

/* ===========================
   Smooth Scroll
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(event){

        event.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/* ===========================
   Keyboard Accessibility
=========================== */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        navMenu.classList.remove("active");

        if(menuToggle){

            menuToggle.textContent="☰";

        }

    }

});

/* ===========================
   Window Resize
=========================== */

window.addEventListener("resize",()=>{

    if(window.innerWidth>768){

        navMenu.classList.remove("active");

        menuToggle.textContent="☰";

    }

});

/* ===========================
   Page Loaded
=========================== */

window.addEventListener("load",()=>{

    document.body.classList.add("page-loaded");

    console.log("School Management Website Loaded Successfully");

});