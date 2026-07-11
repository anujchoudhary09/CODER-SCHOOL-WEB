"use strict";

/* ===================================
   Firebase Imports
=================================== */

import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {

    getFirestore,

    collection,

    getDocs,

    addDoc,

    updateDoc,

    deleteDoc,

    doc,

    getDoc

}

from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {

    getAuth,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

/* ===================================
   Firebase Configuration
=================================== */

const firebaseConfig = {

    apiKey:"",

    authDomain:"",

    projectId:"",

    storageBucket:"",

    messagingSenderId:"",

    appId:""

};

/* ===================================
   Initialize Firebase
=================================== */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

/* ===================================
   Collections
=================================== */

const notificationsRef =

collection(db,"notifications");

const eventsRef =

collection(db,"events");

const facultyRef =

collection(db,"faculty");

const galleryRef =

collection(db,"gallery");

const homepageRef =

collection(db,"homepage");
/* ===================================
   Read Collection
=================================== */

async function getCollection(ref){

    try{

        const snapshot =

        await getDocs(ref);

        return snapshot.docs.map(doc=>({

            id:doc.id,

            ...doc.data()

        }));

    }

    catch(error){

        console.error(error);

        return [];

    }

}

/* ===================================
   Add Document
=================================== */

async function addDocument(ref,data){

    try{

        await addDoc(ref,data);

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}

/* ===================================
   Get Single Document
=================================== */

async function getDocument(ref,id){

    try{

        const snapshot=

        await getDoc(doc(ref,id));

        return snapshot.exists()

            ? snapshot.data()

            : null;

    }

    catch(error){

        console.error(error);

        return null;

    }

}
/* ===================================
   Update Document
=================================== */

async function updateDocument(ref,id,data){

    try{

        const documentRef = doc(ref,id);

        await updateDoc(documentRef,data);

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}

/* ===================================
   Delete Document
=================================== */

async function deleteDocument(ref,id){

    try{

        const documentRef = doc(ref,id);

        await deleteDoc(documentRef);

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}

/* ===================================
   Admin Login
=================================== */

async function adminLogin(email,password){

    try{

        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );

        return true;

    }

    catch(error){

        console.error(error);

        alert("Invalid email or password.");

        return false;

    }

}

/* ===================================
   Admin Logout
=================================== */

async function adminLogout(){

    try{

        await signOut(auth);

    }

    catch(error){

        console.error(error);

    }

}

/* ===================================
   Authentication Listener
=================================== */

onAuthStateChanged(auth,(user)=>{

    if(user){

        console.log(

            "Admin Logged In:",

            user.email

        );

    }

    else{

        console.log(

            "No Admin Logged In"

        );

    }

});

/* ===================================
   Export
=================================== */

export{

    db,

    auth,

    notificationsRef,

    eventsRef,

    facultyRef,

    galleryRef,

    homepageRef,

    getCollection,

    getDocument,

    addDocument,

    updateDocument,

    deleteDocument,

    adminLogin,

    adminLogout

};