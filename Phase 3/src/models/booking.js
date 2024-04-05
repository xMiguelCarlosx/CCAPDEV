
    // Define reservationTime variable outside the function
    let reservationTime = {
        startTime: null,
        endTime: null,
        selectedDate: null
    };

    const User = document.getElementById("user-name");

    const reservationForm = document.getElementById("reservationForm");

    // Function to update reservation time
    reservationForm.addEventListener('change', function () {
        reservationTime.selectedDate = reservationForm.elements["selectedDate"].value;
        reservationTime.startTime = reservationForm.elements["startTime"].value;
        reservationTime.endTime = reservationForm.elements["endTime"].value;
        console.log("Start Time:", reservationTime.startTime);
        console.log("End Time:", reservationTime.endTime);
        console.log("Selected Date:", reservationTime.selectedDate);
    });


    // Add event listener for room slots selection
    const roomSlotsSelect = document.getElementById("roomSlots");
roomSlotsSelect.addEventListener('change', function(event) {
    const selectedRoom = event.target.value;
    console.log("Selected Room:", selectedRoom);
});

// Add event listener for available seats checkboxes
const availableSeatsCheckboxes = document.querySelectorAll("#availableSeats input[type='checkbox']");
availableSeatsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(event) {
        const selectedSeats = Array.from(availableSeatsCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        console.log("Selected Seats:", selectedSeats);
    });
});



    // Event listener for saving chosen slots and date
    document.getElementById('add').addEventListener('click', async function () {
        const myObj = {
            user: User.value, // Assuming User is an input element
            chosenRoom: roomSlotsSelect.value,
            chosenSeats: Array.from(availableSeatsCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value),
            chosenTime: `${reservationTime.startTime} to ${reservationTime.endTime}`,
            chosenDate: reservationTime.selectedDate,
        };
    
        alert('Chosen slots and date saved successfully.');
    
        try {
            const response = await fetch("/reserve", {
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
    });
    

