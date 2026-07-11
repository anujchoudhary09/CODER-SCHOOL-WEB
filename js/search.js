"use strict";

/* ===========================
   Search Elements
=========================== */

const searchInput = document.getElementById("searchInput");

const searchableItems = document.querySelectorAll(

".academic-card, .facility-card, .notification-card, .event-card, .testimonial-card, .gallery-item, .faculty-card"

);

/* ===========================
   Search Function
=========================== */

function filterContent(){

    if(!searchInput){

        return;

    }

    const keyword = searchInput.value

        .toLowerCase()

        .trim();

    searchableItems.forEach(item=>{

        const text = item.textContent

            .toLowerCase();

        if(text.includes(keyword)){

            item.style.display="";

        }else{

            item.style.display="none";

        }

    });

}

/* ===========================
   Input Event
=========================== */

if(searchInput){

    searchInput.addEventListener(

        "input",

        filterContent

    );

}

/* ===========================
   Clear Search
=========================== */

function clearSearch(){

    if(!searchInput){

        return;

    }

    searchInput.value="";

    filterContent();

}
/* ===========================
   Search Counter
=========================== */

const searchResult = document.getElementById("searchResult");

function updateResultCount(){

    if(!searchResult){

        return;

    }

    const visibleItems = [

        ...searchableItems

    ].filter(item=>

        item.style.display!=="none"

    );

    searchResult.textContent =

        `${visibleItems.length} result(s) found`;

}

if(searchInput){

    searchInput.addEventListener("input",()=>{

        filterContent();

        updateResultCount();

    });

}

/* ===========================
   Keyboard Shortcut
=========================== */

document.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key.toLowerCase()==="f"){

        event.preventDefault();

        if(searchInput){

            searchInput.focus();

        }

    }

});

/* ===========================
   Initialize Search
=========================== */

document.addEventListener("DOMContentLoaded",()=>{

    updateResultCount();

});