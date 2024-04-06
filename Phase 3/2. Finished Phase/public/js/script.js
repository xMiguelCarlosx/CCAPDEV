var firstName, lastName, email, password, chosenSlot, chosenSeat, date;

//// sessionStorage.clear(); 
var sampleStudents = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password1',
        chosenSlots: ['G304 0700 - 0730', 'G304 0730 - 0800'],
        chosenSeats: ['Seat 1', 'Seat 2'],
        date: '2024-03-14' // Add date property
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password2',
        chosenSlots: ['G304 0730 - 0800', 'G304 1300 - 1330'],
        chosenSeats: ['Seat 3', 'Seat 4'],
        date: '2024-03-15' // Add date property
    },
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password3',
        chosenSlots: [],
        chosenSeats: [],
        date: '2024-03-16' // Add date property
    },
    {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        password: 'password4',
        chosenSlots: ['G304 0700 - 0730'],
        chosenSeats: ['Seat 5'],
        date: '2024-04-15' // Add date property
    },
    {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        password: 'password5',
        chosenSlots: ['G304 0730 - 0800', 'G304 1300 - 1330'],
        chosenSeats: ['Seat 6', 'Seat 7'],
        date: '2024-03-15' // Add date property
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


//LOGIN & REGISTER PAGE
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
    window.location.href = "3b-student-login-page.html";

    return true; // Allow form submission
}


async function TechloginValidation(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Retrieve the values from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const myObj = {
        email: email,
        password: password
    };

    // // Check if the email and password match the predefined credentials
    // if (email === "technician@gmail.com" && password === "DLSU123") {
    //     // Redirect to the home page if the credentials are correct
    //     window.location.href = "/techhomepage";
    //     return true;
    // } else {
    //     // Display an error message if the credentials are incorrect
    //     document.getElementById("result-login").innerHTML = "Invalid email or password.";
    //     return false;
    // }

    try {
        const response = await fetch("/Tlogin", {
            method: 'POST',
            body: JSON.stringify(myObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            // Redirect to homepage upon successful login
            window.location.href = "/techhomepage";
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



//HOMEPAGE
function sidebar_toggle_animation() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

function toggle_button_animation() {
    const sidebar = document.querySelector('.modify');
    const toggleBtn = document.querySelector('.modify-item');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Call the sidebar toggle animation function
document.addEventListener('DOMContentLoaded', () => {
    sidebar_toggle_animation();
    toggle_button_animation();
});

//RESERVE------------------------------------------------


//DASHBOARD------------------------------------------------
function update_dashboard_status() {
    const isAnonymous = sessionStorage.getItem('isAnonymous') === 'true';
    const elements = document.querySelectorAll('.anonymous-status');
    elements.forEach(element => {
        element.innerText = isAnonymous ? 'Anonymous' : 'Not anonymous';
    });

    var description = document.getElementById('profile-description');
    
    var storedDescription = sessionStorage.getItem('profile-description');

    if (storedDescription) {
        description.textContent = storedDescription;
    }
}

function displayRegisteredStudents() {
    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];
    var studentList = document.getElementById('studentList');
    var searchInput = document.querySelector('.search input[type="search"]');
    var showAllButton = document.createElement('button');
    showAllButton.textContent = 'Show All';
    showAllButton.classList.add('show-all-button');
    var searchButton = document.querySelector('.search button');

    // Clear any existing content
    studentList.innerHTML = '';

    // Event listener for search button click
    searchButton.addEventListener('click', function() {
        var searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            // If search term is empty, display all users
            displayAllUsers(userDataArray);
        } else {
            // Filter user data based on search term
            var filteredUsers = userDataArray.filter(function(user) {
                var fullName = user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase();
                return fullName.includes(searchTerm);
            });

            // Update the displayed list with filtered data
            displayFilteredUsers(filteredUsers);
        }
    });

    // Event listener for "Show All" button click
    showAllButton.addEventListener('click', function() {
        // Display all users
        displayAllUsers(userDataArray);

        // Clear the search input
        searchInput.value = '';
    });

// Function to display all users
function displayAllUsers(users) {
    // Clear any existing content
    studentList.innerHTML = '';

    // Iterate through user data array and create list items for each user
    users.forEach(function(user) {
        var slots = user.chosenSlots || [];
        var seats = user.chosenSeats || [];
        var date = user.date; // Assuming "choosenDate" is correctly set

        // Iterate over the slots to create an entry for each
        slots.forEach((slot, index) => {
            var listItem = document.createElement('li');
            var seat = seats[index] || date; // Handles missing seat info

            // Format the text as "name, seat, date, time"
            listItem.textContent = `${user.firstName} ${user.lastName}, ${seat}, ${date}, ${slot}`;
            studentList.appendChild(listItem);
        });
    });
}
    // Function to display filtered user data
    function displayFilteredUsers(filteredUsers) {
        // Clear any existing content
        studentList.innerHTML = '';

        // Display filtered users
        displayAllUsers(filteredUsers);
    }

    // Append "Show All" button next to the search button
    searchButton.parentNode.insertBefore(showAllButton, searchButton.nextSibling);
    
    // Display all users initially
    displayAllUsers(userDataArray);
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
                // Find the user's chosen date
                var chosenDate = user.date || 'Date not specified';

                // Create list item with both date and slot information
                const slotItem = document.createElement('li');
                slotItem.textContent = slot + ' on ' + chosenDate;
                userChosenSlotsContainer.appendChild(slotItem);
            });
        } else {
            // display a message if the user hasn't chosen any slots
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
        // Find the user's chosen date
        var chosenDate = user.date;

        user.chosenSlots.forEach(function(slot) {
            // Create list item with both date and slot information
            var listItem = document.createElement('li');
            listItem.textContent = user.firstName + ' ' + user.lastName + ': ' + slot + ' on ' + chosenDate;
            reservedSlotsContainer.appendChild(listItem);
        });
    });
}




/*SETTINGS-------------------------- */
function update_settings() {
    const isAnonymous = sessionStorage.getItem('isAnonymous') === 'true';
    const elements = document.querySelectorAll('.anonymous-status');
    elements.forEach(element => {
        element.innerText = isAnonymous ? 'Currently reserving as anonymous' : 'Not reserving as anonymous';
    });

    var description = document.getElementById('profile-description');
    
    var storedDescription = sessionStorage.getItem('profile-description');

    if (storedDescription) {
        description.textContent = storedDescription;
    }
}

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
    var editFunction = document.getElementById('edit-function');
    var saveFunction = document.getElementById('save-function');

    // Set the maximum character limit
    var maxCharacters = 200; // Adjust this value as needed

    description.contentEditable = 'true';
    editFunction.style.display = 'none';
    saveFunction.style.display = 'inline-block';

    // Add an input event listener to check character count
    description.addEventListener('input', function () {
        var currentCharacters = description.textContent.length;

        // Check if the character limit is reached
        if (currentCharacters > maxCharacters) {
            // Trim the content to the maximum allowed characters
            description.textContent = description.textContent.substring(0, maxCharacters);
        }
    });
}

function save_profile_description() {
    var description = document.getElementById('profile-description');
    description.contentEditable = 'false';
    document.getElementById('edit-function').style.display = 'inline-block';
    document.getElementById('save-function').style.display = 'none';
    sessionStorage.setItem('profile-description', description.textContent);
}

function clear_profile_description() {
    var description = document.getElementById('profile-description');
    description.textContent = "";
}


function check_anonymous_status() {
    document.querySelector('.check-button').addEventListener('click', function () {
        sessionStorage.setItem('isAnonymous', true);
        // Update the display on the settings page
        document.querySelector('.anonymous-status').innerText = "Currently reserving as anonymous";
    });

    document.querySelector('.x-button').addEventListener('click', function () {
        sessionStorage.setItem('isAnonymous', false);
        // Update the display on the settings page
        document.querySelector('.anonymous-status').innerText = "Not reserving as anonymous";
    });
}


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


/*TECHNICIAN'S HOMEPAGE AND RESERVATION-------------------------- */
function findStudent() {
    var firstName = document.getElementById("FirstName").value.trim().toLowerCase();
    var lastName = document.getElementById("LastName").value.trim().toLowerCase();
    var userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];

    var student = userDataArray.find(function (user) {
        return user.firstName.toLowerCase() === firstName && user.lastName.toLowerCase() === lastName;
    });

    if (student) {
        window.location.href = "5a-reserve.html?firstName=" + encodeURIComponent(student.firstName) + "&lastName=" + encodeURIComponent(student.lastName);
    } else {
        alert("Student not found.");
    }
}

function initializeTechnicianBookingSystem() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const fullName = firstName + " " + lastName;
    const userDataArray = JSON.parse(sessionStorage.getItem('userData')) || [];
    const student = userDataArray.find(user => user.firstName === firstName && user.lastName === lastName);

    if (student) {
        const chosenSlotsList = document.querySelector('.slots-box ul');
        chosenSlotsList.innerHTML = '';

        student.chosenSlots.forEach(slot => {
            const slotItem = document.createElement('li');
            slotItem.textContent = `${slot} - ${student.chosenSeats.join(', ')}`;
            chosenSlotsList.appendChild(slotItem);
        });        

        const availableSeatsList = document.getElementById('availableSeats');
        const timeSlotButtons = document.querySelectorAll('.timeslot-button');
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
    } else {
        alert("Student not found.");
    }
}
