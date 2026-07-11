"use strict";

/* ===================================
   Imports
=================================== */

import{

    notificationsRef,

    getCollection,

    addDocument,

    updateDocument,

    deleteDocument

}

from "./firebase.js";

/* ===================================
   DOM Elements
=================================== */

const notificationForm =

document.getElementById(

"notificationForm"

);

const titleInput =

document.getElementById(

"notificationTitle"

);

const dateInput =

document.getElementById(

"notificationDate"

);

const descriptionInput =

document.getElementById(

"notificationDescription"

);

const notificationTable =

document.getElementById(

"notificationTable"

);

/* ===================================
   Edit State
=================================== */

let editingId = null;

/* ===================================
   Render Notifications
=================================== */

async function loadNotifications(){

    const notifications =

    await getCollection(

        notificationsRef

    );

    if(notifications.length===0){

        notificationTable.innerHTML=`

        <tr>

        <td colspan="3">

        No notifications available.

        </td>

        </tr>

        `;

        return;

    }

    notificationTable.innerHTML="";

    notifications.forEach(item=>{

        notificationTable.innerHTML+=`

        <tr>

        <td>${item.title}</td>

        <td>${item.date}</td>

        <td>

        <button

        class="btn-edit"

        onclick="editNotification('${item.id}')">

        Edit

        </button>

        <button

        class="btn-delete"

        onclick="removeNotification('${item.id}')">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}
/* ===================================
   Save Notification
=================================== */

notificationForm.addEventListener(

"submit",

async(event)=>{

    event.preventDefault();

    const data={

        title:titleInput.value.trim(),

        date:dateInput.value,

        description:descriptionInput.value.trim()

    };

    if(editingId){

        await updateDocument(

            notificationsRef,

            editingId,

            data

        );

        editingId=null;

    }

    else{

        await addDocument(

            notificationsRef,

            data

        );

    }

    notificationForm.reset();

    loadNotifications();

});

/* ===================================
   Edit Notification
=================================== */

window.editNotification=

async function(id){

    const notifications=

    await getCollection(

        notificationsRef

    );

    const notification=

    notifications.find(

        item=>item.id===id

    );

    if(!notification){

        return;

    }

    editingId=id;

    titleInput.value=

    notification.title;

    dateInput.value=

    notification.date;

    descriptionInput.value=

    notification.description;

};

/* ===================================
   Delete Notification
=================================== */

window.removeNotification=

async function(id){

    if(!confirm(

        "Delete this notification?"

    )){

        return;

    }

    await deleteDocument(

        notificationsRef,

        id

    );

    loadNotifications();

};

/* ===================================
   Initialize
=================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

    loadNotifications();

});