"use strict";

/* ===================================
   Imports
=================================== */

import{

    auth,

    facultyRef,

    eventsRef,

    galleryRef,

    notificationsRef,

    getCollection,

    adminLogout

}

from "./firebase.js";

import{

    onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

/* ===================================
   DOM Elements
=================================== */

const adminEmail =

document.getElementById(

"adminEmail"

);

const facultyCount =

document.getElementById(

"facultyCount"

);

const notificationCount =

document.getElementById(

"notificationCount"

);

const eventCount =

document.getElementById(

"eventCount"

);

const logoutBtn =

document.getElementById(

"logoutBtn"

);

const notificationTable =

document.getElementById(

"notificationTable"

);

/* ===================================
   Authentication Check
=================================== */

onAuthStateChanged(

auth,

(user)=>{

    if(!user){

        window.location.href =

        "admin-login.html";

        return;

    }

    adminEmail.textContent =

    user.email;

}

/* ===================================
   Logout
=================================== */

);

logoutBtn.addEventListener(

"click",

async(event)=>{

    event.preventDefault();

    await adminLogout();

    window.location.href =

    "admin-login.html";

});
/* ===================================
   Dashboard Statistics
=================================== */

async function loadDashboardStats(){

    try{

        const faculty =

        await getCollection(

            facultyRef

        );

        const notifications =

        await getCollection(

            notificationsRef

        );

        const events =

        await getCollection(

            eventsRef

        );

        const gallery =

        await getCollection(

            galleryRef

        );

        facultyCount.textContent =

        faculty.length;

        notificationCount.textContent =

        notifications.length;

        eventCount.textContent =

        events.length;

        const galleryCount =

        document.getElementById(

            "galleryCount"

        );

        if(galleryCount){

            galleryCount.textContent =

            gallery.length;

        }

        loadNotificationTable(

            notifications

        );

    }

    catch(error){

        console.error(

            error

        );

    }

}

/* ===================================
   Notification Table
=================================== */

function loadNotificationTable(

notifications

){

    if(!notificationTable){

        return;

    }

    if(notifications.length===0){

        notificationTable.innerHTML=`

        <tr>

        <td colspan="3">

        No Notifications Found

        </td>

        </tr>

        `;

        return;

    }

    notificationTable.innerHTML="";

    notifications

    .slice(0,5)

    .forEach(item=>{

        notificationTable.innerHTML += `

        <tr>

        <td>${item.title || "-"}</td>

        <td>${item.date || "-"}</td>

        <td>${item.status || "Published"}</td>

        </tr>

        `;

    });

}
/* ===================================
   Loading State
=================================== */

function setLoadingState(

loading

){

    document.body.classList.toggle(

        "loading",

        loading

    );

}

/* ===================================
   Refresh Dashboard
=================================== */

async function refreshDashboard(){

    setLoadingState(true);

    await loadDashboardStats();

    setLoadingState(false);

}

/* ===================================
   Auto Refresh
=================================== */

setInterval(

()=>{

    refreshDashboard();

},

60000

);

/* ===================================
   Global Error Handler
=================================== */

window.addEventListener(

"error",

(event)=>{

    console.error(

        "Dashboard Error:",

        event.message

    );

}

/* ===================================
   Initialize Dashboard
=================================== */

);

document.addEventListener(

"DOMContentLoaded",

async()=>{

    await refreshDashboard();

    console.log(

        "Admin Dashboard Ready"

    );

});