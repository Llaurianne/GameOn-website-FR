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

// form validation
function validate() {
    if (
            isValidated(first)
            && isValidated(last)
            && isValidated(email)
            && isValidated(birthDate) && (Date.parse(birthDate.value) < Date.now())
            // Date.parse also check the validity of the date (no need of  regex)
            && isValidated(quantity)
            /* alternative quantity validation without regex :
            (Number.isInteger(parseFloat(quantity.value))) && 0<=parseFloat(quantity.value) && parseFloat(quantity.value)<=99)
            */
            && isLocationValidated()
            && checkbox1.checked
    ) {
    // open new modal @todo
    }
    return false
}

function isValidated (input) {
  let regex
  switch (input) {
    case first :
    case last :
      // [list of accepted characters]{2 or more}
      regex = /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/
          break
    case email :
      // ([one character from the first list](one time or more[a point without obligation][one or more characters from the first list])@[one character from the first list](one time or more[a - without obligation][one or more characters from the first list]).[2 or 3 characters from this list]
      regex = /^([\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]([.]?[\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]+)+)@[\dA-Za-z]([\-]?[\dA-Za-z]+)+.[A-Za-z]{2,3}$/
          break
      case birthDate :
      // (0[one number between 1 and 9] OR [1 or 2][one number] OR 3[0 or 1]//0[one number between 1 and 9] OR 1[0, 1 or 2]//19 OR 20 [two numbers]
      regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
          break
      case quantity :
      // 0 OR ([one number between 1 and 9][one number without obligation])
      regex = /^(0|([1-9]\d?))$/
          break
  }
  return (regex.test(input.value))
}

// check if at least one location is checked
function isLocationValidated () {
    for (let loc of locations) {
        if (loc.checked === true) {
            return true
        }
    }
}