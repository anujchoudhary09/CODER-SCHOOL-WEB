"use strict";

/* ===========================
   Dark Mode Elements
=========================== */

const themeToggle = document.getElementById("themeToggle");

const body = document.body;

const STORAGE_KEY = "school-theme";

/* ===========================
   Apply Theme
=========================== */

function applyTheme(theme){

    if(theme === "dark"){

        body.classList.add("dark-mode");

        if(themeToggle){

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to Light Mode"
            );

        }

    }else{

        body.classList.remove("dark-mode");

        if(themeToggle){

            themeToggle.textContent = "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to Dark Mode"
            );

        }

    }

}

/* ===========================
   Load Saved Theme
=========================== */

const savedTheme = localStorage.getItem(STORAGE_KEY);

if(savedTheme){

    applyTheme(savedTheme);

}else{

    applyTheme("light");

}

/* ===========================
   Theme Toggle
=========================== */

if(themeToggle){

    themeToggle.addEventListener("click",()=>{

        const isDark =
            body.classList.contains("dark-mode");

        const newTheme =
            isDark ? "light" : "dark";

        applyTheme(newTheme);

        localStorage.setItem(
            STORAGE_KEY,
            newTheme
        );

    });

}
/* ===========================
   System Theme Detection
=========================== */

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

if(!savedTheme){

    applyTheme(

        systemTheme.matches ? "dark" : "light"

    );

}

/* ===========================
   Listen For System Changes
=========================== */

systemTheme.addEventListener("change",(event)=>{

    if(localStorage.getItem(STORAGE_KEY)){

        return;

    }

    applyTheme(

        event.matches ? "dark" : "light"

    );

});

/* ===========================
   Reset Theme
=========================== */

function resetTheme(){

    localStorage.removeItem(STORAGE_KEY);

    applyTheme(

        systemTheme.matches ? "dark" : "light"

    );

}

/* ===========================
   Keyboard Shortcut
   Ctrl + D
=========================== */

document.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key.toLowerCase()==="d"){

        event.preventDefault();

        themeToggle.click();

    }

});

/* ===========================
   Error Handling
=========================== */

window.addEventListener("error",(error)=>{

    console.error(

        "Dark Mode Error:",

        error.message

    );

});

/* ===========================
   Initialize
=========================== */

document.addEventListener("DOMContentLoaded",()=>{

    console.log("Dark Mode Initialized");

});