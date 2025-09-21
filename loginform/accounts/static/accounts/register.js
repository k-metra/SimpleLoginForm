import { getCookie } from "./utils/get_cookie.js";

const $ = (s) => document.querySelector(s);

const registerForm = $("#registerForm");
const registerButton = $("#registerBtn");
const warning = $("#invalid");

registerForm?.addEventListener("submit", async e => {
    e.preventDefault(); 
    registerButton.innerHTML = "Creating account..."
    registerButton.disabled = true;

    const formData = new FormData(registerForm);
    const token = getCookie("csrftoken");

    const response = await fetch("/accounts/register-api/", {
        method: "POST",
        body: formData,
        headers: { "X-CSRFToken": token}
    });

    const data = await response.json();
    
    if (data.success) {
        alert("Registration successful!");
        warning.hidden = true;

        window.location.replace("/accounts/login/")
    } else {

        // username taken
        if (data.status === 400) {
            warning.innerHTML = "* That username is already taken.";
            warning.hidden = false;
        } else {
            alert("Something went wrong (Internal Server Error)")
            console.log("Error: " + data.error);
        }
    }

    registerButton.disabled = false;

})