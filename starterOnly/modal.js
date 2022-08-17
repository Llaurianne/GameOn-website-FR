function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const first = document.getElementById("first")
const last = document.getElementById("last")
const email = document.getElementById("email")
const birthDate = document.getElementById("birthdate")
const quantity = document.getElementById("quantity")
const locations = document.getElementsByName("location")
const checkbox1 = document.getElementById("checkbox1")
const formData = document.querySelectorAll(".formData");
const form= document.getElementsByName("reserve")
const inputs = document.getElementsByTagName("input")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// hide error messages
function hideMessages () {
    formData.forEach(div => {
        div.removeAttribute('data-error-visible')
    })
}


// form validation
function validate() {
    hideMessages()
    let isFormValidated
    for (let i = 0; i < 12; i++) {
        if (!isValidated(inputs[i])) {
            errorMsg(inputs[i]);
            isFormValidated = false;
        }
    }
    if (isFormValidated) {
        //open next modal;
    }
    return false;
}

function isValidated(input) {
    let regex
    switch (input.id) {
        case 'first' :
        case 'last' :
            regex = /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/;
            return (regex.test(input.value));
            break
        case 'email' :
            regex = /^([\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]([.]?[\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]+)+)@[\dA-Za-z]([\-]?[\dA-Za-z]+)+.[A-Za-z]*$/
            return (regex.test(input.value))
            break
        case 'birthdate' :
            return (Date.parse(birthDate.value) < Date.now())
            /* alternative date validation with regex :
            regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
            return (regex.test(input.value)) */
            break
        case 'quantity' :
            regex = /^(0|([1-9]\d?))$/
            return (regex.test(input.value))
            /* alternative quantity validation without regex :
            (Number.isInteger(parseFloat(quantity.value))) && 0<=parseFloat(quantity.value) && parseFloat(quantity.value)<=99) */
            break
        case 'location1' :
        case 'location2' :
        case 'location3' :
        case 'location4' :
        case 'location5' :
        case 'location6' :
            let isLocationChecked = false
            // check if at least one location is checked
            for (let loc of locations) {
                if (loc.checked === true) {
                    isLocationChecked = true
                }
            }
            return isLocationChecked
            break
        case 'checkbox1' :
            return checkbox1.checked;
            break
    }
}

function errorMsg(input) {
    let errorMsg
    switch (input.id) {
        case 'first' :
            errorMsg = "Prénom incorrect ou manquant. Veuillez entrer au moins 2 caractères.";
            break
        case 'last' :
            errorMsg = "Nom incorrect ou manquant. Veuillez entrer au moins 2 caractères.";
            break
        case 'email' :
            errorMsg = "Email incorrect ou manquant.";
            break
        case 'birthdate' :
            errorMsg = "Date de naissance incorrecte ou manquante.";
            break
        case 'quantity' :
            errorMsg = "Quantité incorrecte ou manquante.";
            break
        case 'location1' :
        case 'location2' :
        case 'location3' :
        case 'location4' :
        case 'location5' :
        case 'location6' :
            errorMsg = "Veuillez choisir une localisation.";
            break
        case 'checkbox1' :
            errorMsg = "Veuillez accepter les conditions d\'utilisation.";
            break
    }
    input.parentElement.setAttribute('data-error', errorMsg)
    input.parentElement.setAttribute("data-error-visible", "true")
}