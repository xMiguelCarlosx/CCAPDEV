function validation() {
    var firstName = document.getElementById("FirstName").value;
    var lastName = document.getElementById("LastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userDataArray = JSON.parse(localStorage.getItem('userData')) || [];

    var userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    userDataArray.push(userData);
    localStorage.setItem('userData', JSON.stringify(userDataArray));

    if (password !== document.getElementById("Cpassword").value) {
        document.getElementById("result").innerHTML = "Password doesn't match";
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

function loginValidation(event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userDataArray = JSON.parse(localStorage.getItem('userData')) || [];

    var existingUser = userDataArray.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (!existingUser) {
        document.getElementById("result-login").innerHTML = "Incorrect password/email.";
        return false; // Prevent form submission
    }

    // Store email and password in session storage
    sessionStorage.setItem('loggedInUserEmail', email);
    sessionStorage.setItem('loggedInUserPassword', password);

    // Redirect to homepage
    window.location.href = "home-page.html";
}

function updateUserName() {
    var email = sessionStorage.getItem('loggedInUserEmail');
    var userDataArray = JSON.parse(localStorage.getItem('userData')) || [];
    var user = userDataArray.find(function(user) {
        return user.email === email;
    });

    if (user) {
        document.getElementById("user-name").innerText = user.firstName + " " + user.lastName;
    }
}

function sidebar_toggle_animation() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

document.getElementById('email').addEventListener('input', sidebar_toggle_animation);

function update_profile_pic() {
    let profile_pic = document.getElementById("profile-pic");
    let input_file = document.getElementById("input-file");

    input_file.onchange = function () {
        profile_pic.src = URL.createObjectURL(input_file.files[0]);
    }
}

function toggle_button_animation() {
    const sidebar = document.querySelector('.modify');
    const toggleBtn = document.querySelector('.modify-item');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

function edit_profile_description() {
    var description = document.getElementById('profile-description');
    description.contentEditable = 'true';
    document.getElementById('edit-function').style.display = 'none';
    document.getElementById('save-function').style.display = 'inline-block';
}

function save_profile_description() {
    var description = document.getElementById('profile-description');
    description.contentEditable = 'false';
    document.getElementById('edit-function').style.display = 'inline-block';
    document.getElementById('save-function').style.display = 'none';
}

function clear_profile_description() {
    var description = document.getElementById('profile-description');
    description.textContent = "";
}

