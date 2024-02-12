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

    // If user exists, you can proceed with form submission
    document.forms["Formfill"].submit();
}


function sidebar_toggle_animation() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Retrieve user data from localStorage and update user name
    const userDataArray = JSON.parse(localStorage.getItem('userData')) || [];
    if (userDataArray.length > 0) {
        const firstName = userDataArray[0].firstName;
        const lastName = userDataArray[0].lastName;
        document.getElementById('user-name').innerHTML = `${firstName} ${lastName}`;
    }
}

 
 
 function update_profile_pic() {
 
     let profile_pic = document.getElementById("profile-pic");
     let input_file = document.getElementById("input-file");
 
     input_file.onchange = function () {
         profile_pic.src = URL.createObjectURL(input_file.files[0]);
     }
 }
 