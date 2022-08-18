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
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const birthDate = document.getElementById("birthdate")
const locations = document.getElementsByName("location")
const checkbox1 = document.getElementById("checkbox1")
const formData = document.querySelectorAll(".formData");
const form = document.getElementsByName("reserve")
const inputs = document.getElementsByTagName("input")

let validationArray = []

// storing form validation data
function updateValidationArray() {
    // array of arrays [input id or name, validation rule, error message]
     validationArray = [
         [
             'first',
             /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/.test(inputs[0].value),
             'Prénom incorrect ou manquant. Veuillez entrer au moins 2 caractères.'
         ],
         [
             'last',
             /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/.test(inputs[1].value),
             'Nom incorrect ou manquant. Veuillez entrer au moins 2 caractères.'
         ],
         [
             'email',
             /^([\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]([.]?[\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]+)+)@[\dA-Za-z]([\-]?[\dA-Za-z]+)+.[A-Za-z]*$/.test(inputs[2].value),
             'Email incorrect ou manquant.'
         ],
         [
             'birthdate',
             Date.parse(birthDate.value) < Date.now(),
             /* alternative date validation with regex :
                regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
                return (regex.test(input.value)) */
             'Date de naissance incorrecte ou manquante.'

         ],
         [
             'quantity',
             /^(0|([1-9]\d?))$/.test(inputs[4].value),
             /* alternative quantity validation without regex :
                (Number.isInteger(parseFloat(quantity.value))) && 0<=parseFloat(quantity.value) && parseFloat(quantity.value)<=99) */
             'Quantité incorrecte ou manquante.'
         ],
         [
             'location',
             isLocationChecked(),
             'Veuillez choisir une localisation.'
         ],
         [
             'checkbox1',
             checkbox1.checked,
             'Veuillez accepter les conditions d\'utilisation.'
         ]
    ]
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// launch modal confirmation
function launchModal2() {
    modalbg2.style.display = "block";
}

// close modal event
closeBtn.forEach(btn => btn.addEventListener("click", closeModal))

// close modal form
function closeModal() {
    modalbg.style.display = "none";
    modalbg2.style.display = "none";
}

// check if at least one location is checked
function isLocationChecked() {
    let locChecked = []
    for (let loc of locations) {
        locChecked.push(loc.checked)
    }
    return !!locChecked.includes(true);
}

// hide error messages
function hideMessages () {
    formData.forEach(div => {
        div.removeAttribute('data-error-visible')
    })
}

// form validation
function validate() {
    updateValidationArray()
    hideMessages()
    for (let i = 0; i < 7; i++) {
        if (!validationArray[i][1]) {
            errorMsg(validationArray[i][0])
        }
    }
    if (validationArray.every(inputArray => inputArray[1] === true)) {
        closeModal()
        launchModal2()
        form[0].reset()
    }
    return false;
}

function errorMsg(input) {
    let errorMsg = validationArray.find( e => e[0] === input)[2]
    if (input === 'location') {
        document.getElementsByName(input)[0].parentElement.setAttribute('data-error', errorMsg)
        document.getElementsByName(input)[0].parentElement.setAttribute("data-error-visible", "true")
    } else {
        document.getElementById(input).parentElement.setAttribute('data-error', errorMsg)
        document.getElementById(input).parentElement.setAttribute("data-error-visible", "true")
    }
}