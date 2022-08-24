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
let closeBtn = document.querySelectorAll(".close,.close-btn");
const birthDate = document.getElementById("birthdate")
const locations = document.getElementsByName("location")
const checkbox1 = document.getElementById("checkbox1")
const formData = document.querySelectorAll(".formData");
const form = document.getElementsByName("reserve")
const inputs = document.getElementsByTagName("input")

// variables declarations
let validationDatas = {}
let confirmationMsg

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
    closeModalEvent()
}

// form validation
function validate() {
    updateValidationDatas()
    hideMessages()
    // browses the object of inputs and display error messages if invalid
    for (let input in validationDatas) {
        if (!validationDatas[input].validationTest) {
            errorMsg(input)
        }
    }
    // close modal if everything's right and launch confirmation  message
    if (Object.values(validationDatas).every(data => data.validationTest === true)) {
        closeModal()
        launchConfirmation()
        // update closeBtn list
        closeBtn = document.querySelectorAll(".close,.close-btn");
        // update close modal event with the new buttons
        closeModalEvent()
        // reset form
        form[0].reset()
    }
    // overrides the default form submission behavior
    return false;
}

// store and update form validation datas
function updateValidationDatas() {
    // 2 levels object {input id or name : { validation test, error message}}
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

// close modal event
function closeModalEvent() {
    closeBtn.forEach(btn => btn.addEventListener("click", closeModal))
}

// close modal form
function closeModal() {
    modalbg.style.display = "none";
    if (!!confirmationMsg) {
        confirmationMsg.remove();
    }
}

// create and position DOM elements. Launch modal confirmation
function launchConfirmation() {
    // create DOM elements
    confirmationMsg = createDiv("bground")
    let content = createDiv("content")
    let closeSpan = createSpan("close")
    let modalBody = createDiv("modal-body")
    let merci = createP("Merci! Votre réservation a été reçue.")
    let closeBtn = createInput("btn-submit button close-btn")
    // position DOM elements*/
    modalbg.parentElement.appendChild(confirmationMsg)
    confirmationMsg.appendChild(content)
    content.append(closeSpan, modalBody)
    modalBody.append(merci, closeBtn)
    // add some attributes
    closeBtn.setAttribute("type", "submit")
    closeBtn.setAttribute("value", "Fermer")
    // add a class for style only
    merci.className = "message"
    confirmationMsg.style.display = "block"
    closeModalEvent()
}

// create new DOM element div with the class 'className'
function createDiv(className) {
    let newDiv
    newDiv = document.createElement("div")
    newDiv.className = `${className}`
    return newDiv
}

// create new DOM element span with the class 'className'
function createSpan(className) {
    let newSpan
    newSpan = document.createElement("span")
    newSpan.className = `${className}`
    return newSpan
}

// create new DOM element p with the text 'text'
function createP(text) {
    let newP = document.createElement("p")
    newP.textContent = text
    return newP
}

// create new DOM element input with the class 'className'
function createInput(className) {
    let newInput
    newInput = document.createElement("input")
    newInput.className = `${className}`
    return newInput
}