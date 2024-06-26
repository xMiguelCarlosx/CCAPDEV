


var firstName, lastName, email, password, chosenSlot, chosenSeat;

//// sessionStorage.clear(); 
var sampleStudents = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password1',
        chosenSlots: ['G304 0700 - 0730', 'G304 0730 - 0800'],
        chosenSeats: ['Seat 1', 'Seat 2']
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password2',
        chosenSlots: ['G304 0730 - 0800', 'G304 1300 - 1330'],
        chosenSeats: ['Seat 3', 'Seat 4']
    },
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password3',
        chosenSlots: [],
        chosenSeats: []
    },
    {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        password: 'password4',
        chosenSlots: ['G304 0700 - 0730'],
        chosenSeats: ['Seat 5']
    },
    {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        password: 'password5',
        chosenSlots: ['G304 0730 - 0800', 'G304 1300 - 1330'],
        chosenSeats: ['Seat 6', 'Seat 7']
    }
];

// Retrieve existing user data from session storage
var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];

// Check if each sample student already exists in the stored user data
sampleStudents.forEach(function(sampleStudent) {
    var exists = userDataArray.some(function(user) {
        return user.email === sampleStudent.email;
    });
    
    // If the sample student does not already exist, add it to the user data array
    if (!exists) {
        userDataArray.push(sampleStudent);
    }
});

// Save the updated user data array back to session storage
sessionStorage.setItem('userData', JSON.stringify(userDataArray));



function validation() {
    var firstName = document.getElementById("FirstName").value;
    var lastName = document.getElementById("LastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("Cpassword").value;

    // Check if the password matches the confirm password
    if (password !== confirmPassword) {
        document.getElementById("result").innerHTML = "Passwords don't match";
        return false; // Prevent form submission
    }

    // Retrieve existing user data from session storage
    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];

    // Check if the email is already registered
    var existingEmail = userDataArray.some(function(user) {
        return user.email === email;
    });

    // Check if the first name, last name, or email is already used
    var duplicateUser = userDataArray.some(function(user) {
        return user.firstName === firstName || user.lastName === lastName || user.email === email;
    });

    // If any duplicate is found, display an error message
    if (duplicateUser) {
        document.getElementById("result").innerHTML = "A user with the same first name, last name, or email already exists";
        return false; // Prevent form submission
    }

    // If the email is already registered, display an error message
    if (existingEmail) {
        document.getElementById("result").innerHTML = "Email already registered";
        return false; // Prevent form submission
    }

    // Create a new user object
    var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    // Add the new user to the user data array
    userDataArray.push(newUser);

    // Save the updated user data array back to session storage
    sessionStorage.setItem('userData', JSON.stringify(userDataArray));

    // Redirect to the login page
    window.location.href = "student-login-page.html";

    return true; // Allow form submission
}



function loginValidation(event) {
    
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];

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
    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];
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





function initializeBookingSystem() {
    const timeSlotButtons = document.querySelectorAll('.timeslot-button');
    const availableSeatsList = document.getElementById('availableSeats');
    const chosenSlotsList = document.querySelector('.slots-box ul');

    // Replace with dynamic data
    const availableSeatsData = {
        'G304 0700 - 0730': ['Seat 1', 'Seat 4', 'Seat 15', 'Seat 29', 'Seat 30', 'Seat 31', 'Seat 32', 'Seat 39'],
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
                seatItem.innerHTML = `
                    <input type="checkbox" value="${seat.value}" unchecked>
                    <span>${selectedTimeSlot} - ${seat.value}</span>`;
                chosenSlotsList.appendChild(seatItem);
                seat.parentNode.remove();
                // Remove chosen seat from availableSeatsData
                const index = availableSeatsData[selectedTimeSlot].indexOf(seat.value);
                if (index !== -1) {
                    availableSeatsData[selectedTimeSlot].splice(index, 1);
                }
            });
        }
    });

    document.getElementById('delete').addEventListener('click', function () {
        const checkedSeats = Array.from(chosenSlotsList.querySelectorAll('input:checked'));
        checkedSeats.forEach(seat => {
            const seatItem = document.createElement('li');
            seatItem.innerHTML = `
                <input type="checkbox" value="${seat.value}">
                ${seat.value}</span>`;
            availableSeatsList.appendChild(seatItem);
            seat.parentNode.remove();
            // Add chosen seat back to availableSeatsData
            availableSeatsData[selectedTimeSlot].push(seat.value);
        });
    });

    document.getElementById('save').addEventListener('click', function () {
        const chosenSlots = Array.from(chosenSlotsList.querySelectorAll('li')).map(slot => slot.querySelector('span').innerText);
        const email = sessionStorage.getItem('loggedInUserEmail');
        const userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];
        const userIndex = userDataArray.findIndex(user => user.email === email);

        if (userIndex !== -1) {
            userDataArray[userIndex].chosenSlots = chosenSlots;
            sessionStorage.setItem('userData', JSON.stringify(userDataArray));
            alert('Chosen slots and seats saved successfully.');
        }
    });
}



function displayRegisteredStudents() {
    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];
    var studentList = document.getElementById('studentList');

    // Clear any existing content
    studentList.innerHTML = '';

    // Iterate through user data array and create list items for each user
    userDataArray.forEach(function(user) {
        var listItem = document.createElement('li');
        var slots = user.chosenSlots || []; // Get the chosen slots for the user
        var slotsText = slots.length > 0 ? slots.join(', ') : 'No slots chosen'; // Display the chosen slots or a message if none chosen
        listItem.textContent = user.firstName + " " + user.lastName + ": " + slotsText;
        studentList.appendChild(listItem);
    });
}


function displayAvailableSlots() {
    const availableSlotsContainer = document.getElementById('availableSlotsContainer');

    // Sample data for available slots and seats
    const availableSlotsData = [
        {
            slot: 'G304 0700 - 0730',
            seats: ['Seat 1', 'Seat 2', 'Seat 3']
        },
        {
            slot: 'G304 0730 - 0800',
            seats: ['Seat 4', 'Seat 5']
        },
        {
            slot: 'G304 1300 - 1330',
            seats: ['Seat 6', 'Seat 7', 'Seat 8', 'Seat 9']
        }
    ];

    // Clear previous content
    availableSlotsContainer.innerHTML = '';

    // Iterate over available slots data and create list items
    availableSlotsData.forEach(slotData => {
        const slotItem = document.createElement('li');
        slotItem.textContent = `${slotData.slot}: Seats available - ${slotData.seats.join(', ')}`;
        availableSlotsContainer.appendChild(slotItem);
    });
}

function displayUserChosenSlots() {
    const userChosenSlotsContainer = document.getElementById('userChosenSlotsContainer');
    const userEmail = sessionStorage.getItem('loggedInUserEmail');

    // Retrieve user data from session storage
    const userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];

    // Find the user based on their email
    const user = userDataArray.find(user => user.email === userEmail);

    if (user) {
        // Clear previous content
        userChosenSlotsContainer.innerHTML = '';

        // Check if the user has chosen any slots
        if (user.chosenSlots.length > 0) {
            // Iterate over the chosen slots and create list items
            user.chosenSlots.forEach(slot => {
                const slotItem = document.createElement('li');
                slotItem.textContent = slot;
                userChosenSlotsContainer.appendChild(slotItem);
            });
        } else {
            // Display a message if the user hasn't chosen any slots
            const noSlotsMessage = document.createElement('p');
            noSlotsMessage.textContent = 'No slots chosen by this user.';
            userChosenSlotsContainer.appendChild(noSlotsMessage);
        }
    } else {
        // Display a message if the user is not found
        userChosenSlotsContainer.textContent = 'User not found.';
    }
}



function displayReservedSlots() {
    // Get the container for reserved slots
    var reservedSlotsContainer = document.getElementById('reservedSlotsContainer');

    // Clear any existing content
    reservedSlotsContainer.innerHTML = '';

    // Retrieve user data from session storage
    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];

    // Iterate through user data array and create list items for each reserved slot
    userDataArray.forEach(function(user) {
        user.chosenSlots.forEach(function(slot) {
            var listItem = document.createElement('li');
            listItem.textContent = user.firstName + ' ' + user.lastName + ': ' + slot;
            reservedSlotsContainer.appendChild(listItem);
        });
    });
}






























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






