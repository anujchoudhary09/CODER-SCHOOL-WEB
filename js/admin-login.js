"use strict";

/* ===================================
   Imports
=================================== */

import{

    adminLogin

}

from "./firebase.js";

/* ===================================
   DOM Elements
=================================== */

const loginForm =

document.getElementById(

"adminLoginForm"

);

const emailInput =

document.getElementById(

"email"

);

const passwordInput =

document.getElementById(

"password"

);

const rememberMe =

document.getElementById(

"rememberMe"

);

const loginMessage =

document.getElementById(

"loginMessage"

);

const loginSpinner =

document.getElementById(

"loginSpinner"

);

const loginButton =

document.querySelector(

".admin-login-btn"

);

/* ===================================
   Remember Me
=================================== */

const savedEmail =

localStorage.getItem(

"adminEmail"

);

if(savedEmail){

    emailInput.value = savedEmail;

    rememberMe.checked = true;

}

/* ===================================
   Message Function
=================================== */

function showMessage(

text,

type

){

    loginMessage.textContent = text;

    loginMessage.className =

    "login-message " + type;

}

/* ===================================
   Loading State
=================================== */

function setLoading(

loading

){

    loginButton.disabled = loading;

    loginSpinner.hidden = !loading;

}
/* ===================================
   Login Submit
=================================== */

loginForm.addEventListener(

"submit",

async(event)=>{

    event.preventDefault();

    const email =

    emailInput.value.trim();

    const password =

    passwordInput.value.trim();

    if(email==="" || password===""){

        showMessage(

            "Please fill in all fields.",

            "error"

        );

        return;

    }

    setLoading(true);

    const success =

    await adminLogin(

        email,

        password

    );

    setLoading(false);

    if(success){

        showMessage(

            "Login successful. Redirecting...",

            "success"

        );

        if(rememberMe.checked){

            localStorage.setItem(

                "adminEmail",

                email

            );

        }

        else{

            localStorage.removeItem(

                "adminEmail"

            );

        }

        setTimeout(()=>{

            window.location.href =

            "admin-dashboard.html";

        },1000);

    }

    else{

        showMessage(

            "Invalid email or password.",

            "error"

        );

    }

});

/* ===================================
   Enter Key Support
=================================== */

passwordInput.addEventListener(

"keydown",

(event)=>{

    if(event.key==="Enter"){

        loginForm.requestSubmit();

    }

});

/* ===================================
   Auto Focus
=================================== */

window.addEventListener(

"load",

()=>{

    emailInput.focus();

});