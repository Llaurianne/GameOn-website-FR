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
const closeBtn = document.querySelectorAll(".close,.close-btn");
const birthDate = document.getElementById("birthdate")
const locations = document.getElementsByName("location")
const checkbox1 = document.getElementById("checkbox1")
const formData = document.querySelectorAll(".formData");
const form = document.getElementsByName("reserve")
const inputs = document.getElementsByTagName("input")

// variables declarations
let validationDatas = {}
console.log(validationDatas)
// storing form validation data
function updateValidationDatas() {
    // array of arrays [input id or name, validation rule, error message]
     validationDatas = {
         first : {
             validationTest : /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/.test(inputs[0].value),
             error : 'Prénom incorrect ou manquant. Veuillez entrer au moins 2 caractères.'
         },
         last : {
             validationTest : /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/.test(inputs[1].value),
             error : 'Nom incorrect ou manquant. Veuillez entrer au moins 2 caractères.'
         },
         email : {
             validationTest : /^([\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]([.]?[\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]+)+)@[\dA-Za-z]([\-]?[\dA-Za-z]+)+\.[A-Za-z]{2,}$/.test(inputs[2].value),
             error : 'Email incorrect ou manquant.'
         },
         birthdate : {
             validationTest : Date.parse(birthDate.value) < Date.now(),
             /* alternative date validation with regex :
             regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
             return (regex.test(input.value)) */
             error : 'Date de naissance incorrecte ou manquante.'
         },
         quantity : {
             validationTest : /^(0|([1-9]\d?))$/.test(inputs[4].value),
             /* alternative quantity validation without regex :
             (Number.isInteger(parseFloat(quantity.value))) && 0<=parseFloat(quantity.value) && parseFloat(quantity.value)<=99) */
             error : 'Quantité incorrecte ou manquante.'
         },
         location : {
             validationTest : isLocationChecked(),
             error : 'Veuillez choisir une localisation.'
         },
         checkbox1 : {
             validationTest : checkbox1.checked,
             error : 'Veuillez accepter les conditions d\'utilisation.'
         }
    }
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

// close modal form & confirmation message
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
    updateValidationDatas()
    console.log(validationDatas)
    hideMessages()
    // browses the array of inputs and display error messages if invalid
    for (let input in validationDatas) {
        console.log(validationDatas[input].validationTest)
        if (!validationDatas[input].validationTest) {
            errorMsg(input)
        }
    }
    // close modal if everything's right
    if (Object.values(validationDatas).every(data => data.validationTest === true)) {
        closeModal()
        launchModal2()
        form[0].reset()
    }
    // overrides the default form submission behavior
    return false;
}

// add specific error message as attribute to the input's parent if invalid
function errorMsg(input) {
    let errorMsg = validationDatas[input].error
    if (input === 'location') {
        document.getElementsByName(input)[0].parentElement.setAttribute('data-error', errorMsg)
        document.getElementsByName(input)[0].parentElement.setAttribute("data-error-visible", "true")
    } else {
        document.getElementById(input).parentElement.setAttribute('data-error', errorMsg)
        document.getElementById(input).parentElement.setAttribute("data-error-visible", "true")
    }
}