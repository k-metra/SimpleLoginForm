const $ = (selector) => document.querySelector(selector);
const loginButton = $("#loginBtn");
const loginForm = $("#loginForm");

const invalid_warning = $("#invalid");

const valid_user = "test_user213";
const valid_pass = "goated";

function confirmSignIn() {
    alert("Login successful. Demo only.");
}

loginForm?.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(loginForm);
    const u = data.get("username");
    const p = data.get("password");

    console.log(u);
    console.log(p)
    if (u !== valid_user || p !== valid_pass) {
        invalid_warning.hidden = false;
    } else {
        invalid_warning.hidden = true;
        loginButton.disabled = true;
        loginButton.innerHTML = "Signing in...";

        setTimeout(confirmSignIn, (5 * 1000));
    }

    console.log("Submitted");
})