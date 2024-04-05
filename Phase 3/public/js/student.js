// FRONT-END JS For Registration Form

//* 2-OPTION PAGE
const registrationForm = document.forms.Formfill;
const submitBtn = document.querySelector("input[type='submit']");
const resultMsg = document.getElementById("result");

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (validation()) {
        const formData = new FormData(registrationForm);
        const myObj = { 
            FirstName: formData.get("FirstName"),
            LastName: formData.get("LastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            Cpassword: formData.get("Cpassword")
        };
        try {
            const response = await fetch("/register", {
                method: 'POST',
                body: JSON.stringify(myObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // Redirect to the option page upon successful registration
                window.location.href = "/option";
            } else {
                // Error handling
                console.log("Status code received: " + response.status);
                resultMsg.textContent = "Registration failed. The user already exists.";
                resultMsg.style.color = "red";
            }
        } catch (err) {
            console.error(err);
        }
    }
});

function validation() {
    const FirstName = registrationForm.FirstName.value.trim();
    const LastName = registrationForm.LastName.value.trim();
    const email = registrationForm.email.value.trim();
    const password = registrationForm.password.value.trim();
    const CPassword = registrationForm.Cpassword.value.trim();
    
    if (FirstName === "" || LastName === "" || email === "" || password === "" || CPassword === "") {
        resultMsg.textContent = "Please fill in all fields.";
        resultMsg.style.color = "red";
        return false;
    } else if (password !== CPassword) {
        resultMsg.textContent = "Passwords do not match.";
        resultMsg.style.color = "red";
        return false;
    } else {
        return true;
    }
}



async function loginValidation(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const myObj = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("/Slogin", {
            method: 'POST',
            body: JSON.stringify(myObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            // Redirect to homepage upon successful login
            window.location.href = "/homepage";
        } else if (response.status === 401) {
            // Incorrect email or password
            document.getElementById("result-login").innerHTML = "Incorrect password/email.";
        } else {
            // Other error occurred
            console.error("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


