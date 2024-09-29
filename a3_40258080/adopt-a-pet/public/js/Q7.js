//----------------- Date and Time -----------------------//
function updateTime() {
  const now = new Date();
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  document.getElementById(
    "date-time"
  ).textContent = `${dateString} ${timeString}`;
}

setInterval(updateTime, 1000);
// The Time would automatically refresh and show the updated time every second.
updateTime();

//----------------- Find a dog/cat page -----------------------//
function checkFindPetForm() {
  let dropdowns = document.querySelectorAll("#find-pet-form select");
  let dom = document.getElementById("find-pet-form");

  // Check for dropdowns
  for (let i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i].selectedIndex === 0) {
      alert("Please choose an option from all dropdowns.");
      dropdowns[i].focus();
      return false;
    }
  }
  // Check for checkedBox
  let numCheckedBox = 0;
  for (let i = 0; i < dom.compatibility.length; i++) {
    if (dom.compatibility[i].checked) {
      numCheckedBox++;
    }
  }
  if (numCheckedBox == 0) {
    alert("Please check at least one check box.");
    return false;
  }

  // If all fields are filled out, return true
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("find-pet-form").onsubmit = checkFindPetForm;
});

//----------------- Have a pet to give away page -----------------------//
function checkGiveAwayPetForm() {
  let dropdowns = document.querySelectorAll("#giveaway-pet-form select");
  let textInputs = document.querySelectorAll(
    '#giveaway-pet-form input[type="text"]'
  );
  let dom = document.getElementById("giveaway-pet-form");
  let textarea = document.querySelectorAll("#giveaway-pet-form textarea");
  let email = document.querySelectorAll(
    '#giveaway-pet-form input[type="email"]'
  );

  // Check if dropdowns have been selected
  for (let i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i].selectedIndex === 0) {
      alert("Please choose an option from all dropdowns.");
      dropdowns[i].focus();
      return false;
    }
  }

  // Check if text inputs are filled
  for (let i = 0; i < textInputs.length; i++) {
    /* valid breed name should be string without any numbers or special characters
     outside of hyphens and apostrophes.*/
    const validateBreed = /^[A-Za-z\s'-]+$/;
    if (textInputs[0].value.trim() === "") {
      alert("Please fill out the Breed field.");
      textInputs[0].focus();
      return false;
    } else if (!validateBreed.test(textInputs[0].value)) {
      alert("Please fill out the Breed field correctly.");
      textInputs[0].focus();
      return false;
    }

    const validateName = /^[A-Za-z]+, ?[A-Za-z]+$/;
    if (textInputs[1].value.trim() === "") {
      alert("Please fill out the Name field.");
      textInputs[1].focus();
      return false;
    } else if (!validateName.test(textInputs[1].value.trim())) {
      alert(
        "Please fill out field in correct format: Family name, Given name "
      );
      textInputs[1].focus();
      return false;
    }
  }

  // Check if at least one of the checkbox is checked
  let numCheckedBox = 0;
  for (let i = 0; i < dom.compatibility.length; i++) {
    if (dom.compatibility[i].checked) {
      numCheckedBox++;
    }
  }
  if (numCheckedBox == 0) {
    alert("Please check at least one check box.");
    return false;
  }

  // Check if textarea inputs are filled
  for (let i = 0; i < textarea.length; i++) {
    if (textarea[i].value.trim() === "") {
      alert("Please fill out the comments field.");
      textarea[i].focus();
      return false;
    }
  }

  // Check if email input are filled
  const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  for (let i = 0; i < email.length; i++) {
    if (email[i].value.trim() === "") {
      alert("Please fill out the email field.");
      email[i].focus();
      return false;
    } else if (!validateEmail.test(email[i].value.trim())) {
      alert("Please fill out the email in correct form: email@example.com.");
      email[i].focus();
      return false;
    }
  }
  // If all fields are filled out, return true
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("giveaway-pet-form").onsubmit = checkGiveAwayPetForm;
});

//----------------- Create an account page -----------------------//
function validateUsername(username) {
  //A username can contain letters (both upper and lower case) and digits only
  return /^[a-zA-Z0-9]+$/.test(username);
}

function validatePassword(password) {
  // Check the length of the password
  if (password.length < 4) {return false;}
  
  // Check if the password contains only letters and digits
  if (!/^[a-zA-Z0-9]+$/.test(password)) {return false;}

  // Check if the password contains at least one letter
  if (!/[a-zA-Z]/.test(password)) {return false;}

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {return false;}

  return true; 
}

function checkSignUpForm(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!validateUsername(username)) {
      alert("Invalid username.");
      event.preventDefault(); 
      return false;
  }
  if (!validatePassword(password)) {
    alert("Invalid password format.");
    event.preventDefault(); 
    return false;
}
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sign-up-form").addEventListener('submit', checkSignUpForm);
});