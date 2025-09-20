const $ = (selector) => document.querySelector(selector);
const loginButton = $("#loginBtn");
const loginForm = $("#loginForm");

const invalid_warning = $("#invalid");

loginForm?.addEventListener("submit", async e => {
    loginButton.disabled = true;
    loginButton.innerHTML = "Signing in...";
    e.preventDefault();

    const formData = new FormData(loginForm);

    try {
        const resp = await fetch("/accounts/login-api/", {
            method: "POST",
            body: formData,
        });

        const data = await resp.json();

        if (resp.ok && data.success) {
            alert("Welcome, you are logged in.");
            invalid_warning.hidden = true;
        } else {
            invalid_warning.hidden = false;
        }

    } catch (err) {
        console.error("Error: " + err);
    }

    loginButton.disabled = false;
    loginButton.innerHTML = "Sign In";
})