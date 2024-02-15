//LOGIN & REGISTER PAGE
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

    var existingUser = userDataArray.find(function (user) {
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
    window.location.href = "4-home-page.html";
}

function updateUserName() {
    var email = sessionStorage.getItem('loggedInUserEmail');
    var userDataArray = JSON.parse(localStorage.getItem('userData')) || [];
    var user = userDataArray.find(function (user) {
        return user.email === email;
    });

    if (user) {
        document.getElementById("user-name").innerText = user.firstName + " " + user.lastName;
    }
}



//HOMEPAGE
function sidebar_toggle_animation() {

    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    })
}

function toggle_button_animation() {

    const sidebar = document.querySelector('.modify');
    const toggleBtn = document.querySelector('.modify-item');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    })
}


//DASHBOARD------------------------------------------------
function update_dashboard_status() {
    const isAnonymous = localStorage.getItem('isAnonymous') === 'true';
    const elements = document.querySelectorAll('.anonymous-status');
    elements.forEach(element => {
        element.innerText = isAnonymous ? 'Currently reserving as anonymous' : 'Not reserving as anonymous';
    });
}




/*SETTINGS-------------------------- */
function update_profile_pic() {
    let profile_pics = document.querySelectorAll(".user-picture img, .settings-picture img");
    let input_file = document.getElementById("input-file");

    input_file.onchange = function () {
        let file = input_file.files[0];
        let url = URL.createObjectURL(file);
        profile_pics.forEach(pic => {
            pic.src = url;
        });
    };
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


function check_anonymous_status() {
    document.querySelector('.check-button').addEventListener('click', function () {
        localStorage.setItem('isAnonymous', false);
        // Update the display on the settings page
        document.querySelector('.anonymous-status').innerText = "Currently reserving as anonymous";
    });

    document.querySelector('.x-button').addEventListener('click', function () {
        localStorage.setItem('isAnonymous', true);
        // Update the display on the settings page
        document.querySelector('.anonymous-status').innerText = "Not reserving as anonymous";
    });
}

(function () {
    function delete_account() {
        var modal = document.querySelector(".popup-container");
        var btn = document.querySelector(".check-delete-account-button");
        var span = document.querySelector(".close-popup");
        var confirmDeleteBtn = document.querySelector(".confirm-delete-button");
        var cancelDeleteBtn = document.querySelector(".cancel-delete-button");
        var pageContent = document.querySelector(".page-content");

        btn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        confirmDeleteBtn.addEventListener("click", function () {
            pageContent.innerHTML = "<p>Account deleted.</p>";
            modal.style.display = "none";
        });

        cancelDeleteBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    window.addEventListener("load", delete_account);
})();
