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

function TechloginValidation(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Retrieve the values from the form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if the email and password match the predefined credentials
    if (email === "technician@gmail.com" && password === "DLSU123") {
        // Redirect to the home page if the credentials are correct
        window.location.href = "tech-home-page.html";
        return true;
    } else {
        // Display an error message if the credentials are incorrect
        document.getElementById("result-login").innerHTML = "Invalid email or password.";
        return false;
    }
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

const studentProfiles = [
    {
        // replace with dynamic data
        name: 'Juan Dela Cruz',
        description: 'probinsyano',
        chosenSlots: ['G304 0700 - 0730', 'G304 1300 - 1330'],
        chosenSeats: ['Seat 2', 'Seat 30']
    },
];

document.addEventListener('DOMContentLoaded', function () {
    const timeSlotButtons = document.querySelectorAll('.timeslot-button');
    const availableSeatsList = document.getElementById('availableSeats');
    const chosenSlotsList = document.querySelector('.slots-box ul');

    document.querySelector('.search-button').addEventListener('click', function () {
        const searchInput = document.getElementById('search-input').value.trim();
        const studentProfile = searchStudentProfile(searchInput);
        displayStudentChosenSlots(studentProfile);
    });

    function searchStudentProfile(studentName) {
        return studentProfiles.find(profile => profile.name.toLowerCase() === studentName.toLowerCase());
    }

    function displayStudentChosenSlots(studentProfile) {
        const chosenSlotsList = document.querySelector('.slots-box ul');
        const availableSeatsList = document.getElementById('availableSeats');
        chosenSlotsList.innerHTML = '';
    
        if (studentProfile) {
            document.querySelector('.description-box p').innerText = studentProfile.description;
    
            studentProfile.chosenSlots.forEach((slot, index) => {
                const seat = studentProfile.chosenSeats[index];
    
                const slotItem = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = `${slot} ${seat}`;
                checkbox.checked = false;
    
                slotItem.appendChild(checkbox);
                slotItem.appendChild(document.createTextNode(`${slot} ${seat}`));
                chosenSlotsList.appendChild(slotItem);
    
            });
        } else {
            alert('Student not found!');
        }
    }                

    // replace with dynamic data
    const availableSeatsData = {
        'G304 0700 - 0730': ['Seat 1', 'Seat 4', 'Seat 15', 'Seat 29', 'Seat 30'],
        'G304 0730 - 0800': ['Seat 4'],
        'G304 1300 - 1330': []
    };

    let selectedTimeSlot = null;

    timeSlotButtons.forEach(button => {
        button.addEventListener('click', function () {
            availableSeatsList.innerHTML = '';

            timeSlotButtons.forEach(btn => btn.classList.remove('clicked'));

            button.classList.add('clicked');
            selectedTimeSlot = button.querySelector('span').innerText;

            const availableSeats = availableSeatsData[selectedTimeSlot] || [];

            availableSeats.forEach(seat => {
                const seatItem = document.createElement('li');
                seatItem.innerHTML = `
                    <input type="checkbox" value="${seat}">
                    ${seat}</span>`;
                availableSeatsList.appendChild(seatItem);
            });
        });
    });

    document.getElementById('add').addEventListener('click', function () {
        if (selectedTimeSlot) {
            const checkedSeats = Array.from(availableSeatsList.querySelectorAll('input:checked'));

            checkedSeats.forEach(seat => {
                const seatItem = document.createElement('li');
                const seatInfo = seat.value.split(' ');
                if (seatInfo[5] == undefined) { // for when seat being added is a seat from availableSeatsData
                    seatItem.innerHTML = `
                    <input type="checkbox" value="${seat.value}" unchecked>
                    <span>${selectedTimeSlot} ${seat.value}</span>`;
                } else {                        // for when seat being added is a seat from studentProfiles
                    seatItem.innerHTML = `
                    <input type="checkbox" value="${seat.value}" unchecked>
                    <span>${selectedTimeSlot} Seat ${seatInfo[5]}</span>`;
                }
                chosenSlotsList.appendChild(seatItem);

                seat.parentNode.remove();

                availableSeatsData[selectedTimeSlot] = availableSeatsData[selectedTimeSlot].filter(availableSeat => availableSeat !== seat.value);
            });
        }
    });

    document.getElementById('delete').addEventListener('click', function () {
        if (selectedTimeSlot) {
            const checkedSeats = Array.from(chosenSlotsList.querySelectorAll('input:checked'));
    
            checkedSeats.forEach(seat => {
                const seatItem = document.createElement('li');
                const seatInfo = seat.value.split(' ');
                if (seatInfo[5] == undefined) { // for when seat being added is a seat from availableSeatsData
                    seatItem.innerHTML = `
                    <input type="checkbox" value="${seat.value}" unchecked>
                    ${seat.value}</span>`;
                } else {                        // for when seat being added is a seat from studentProfiles
                    seatItem.innerHTML = `
                    <input type="checkbox" value="${seat.value}" unchecked>
                    Seat ${seatInfo[5]}</span>`;
                }
                availableSeatsList.appendChild(seatItem);
    
                seat.parentNode.remove();
    
                availableSeatsData[selectedTimeSlot].push(seat.value);
            });
        }
    });           
    sidebar_toggle_animation()
    updateUserName()                   
});

