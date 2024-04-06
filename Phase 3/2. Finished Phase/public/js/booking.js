function initializeBookingSystem() {
    // Define reservationTime variable outside the function
    let reservationTime = {
        startTime: null,
        endTime: null,
        selectedDate: null
    };

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

    const roomSlotButtons = document.querySelectorAll('.roomslot-button');
    const availableSeatsList = document.getElementById('availableSeats');
    const chosenSlotsList = document.querySelector('.slots-box ul');

    // Replace with dynamic data
    const availableSeatsData = {
        'G301': ['Seat 1', 'Seat 2', 'Seat 3', 'Seat 4', 'Seat 5', 'Seat 6', 'Seat 7', 'Seat 8'],
        'G302': ['Seat 1', 'Seat 2', 'Seat 3', 'Seat 4', 'Seat 5', 'Seat 6', 'Seat 7', 'Seat 8'],
        'G303': ['Seat 1', 'Seat 2', 'Seat 3', 'Seat 4', 'Seat 5', 'Seat 6', 'Seat 7', 'Seat 8']
    };

    let selectedSlot = null;

    // Function to update available seats list
    roomSlotButtons.forEach(button => {
        button.addEventListener('click', function () {
            availableSeatsList.innerHTML = '';

            roomSlotButtons.forEach(btn => btn.classList.remove('clicked'));

            button.classList.add('clicked');
            selectedSlot = button.querySelector('span').innerText;

            const availableSeats = availableSeatsData[selectedSlot] || [];

            availableSeats.forEach(seat => {
                const seatItem = document.createElement('li');
                seatItem.innerHTML = `
                    <input type="checkbox" value="${seat}">
                    ${seat}`;
                availableSeatsList.appendChild(seatItem);
            });
        });
    });

    // Event listener for adding seats
    document.getElementById('add').addEventListener('click', function () {
        const selectedDate = reservationTime.selectedDate;
        if (selectedSlot && reservationTime.startTime && reservationTime.endTime && selectedDate) {
            const checkedSeats = Array.from(availableSeatsList.querySelectorAll('input:checked'));
            checkedSeats.forEach(seat => {
                const seatItem = document.createElement('li');
                const slotInfo = `${selectedSlot} - ${seat.value} - ${reservationTime.selectedDate} - ${reservationTime.startTime} to ${reservationTime.endTime}`;
                seatItem.innerHTML = `
                    <input type="checkbox" value="${seat.value}">
                    <span>${slotInfo}</span>`;
                chosenSlotsList.appendChild(seatItem);

                // Remove chosen seat from availableSeatsData
                const index = availableSeatsData[selectedSlot].indexOf(seat.value);
                if (index !== -1) {
                    availableSeatsData[selectedSlot].splice(index, 1);
                }
                seat.parentNode.remove();
            });
        } else {
            alert("Please select a date, slot, start time, and end time.");
        }
    });

    // Event listener for deleting seats
    document.getElementById('delete').addEventListener('click', function () {
        const checkedSeats = Array.from(chosenSlotsList.querySelectorAll('input:checked'));
        checkedSeats.forEach(seat => {
            const seatItem = document.createElement('li');
            seatItem.innerHTML = `
                <input type="checkbox" value="${seat.value}">
                ${seat.value}</span>`;
            availableSeatsList.appendChild(seatItem);
            seat.parentNode.remove();
        });
    });

    // Event listener for saving chosen slots and date
    document.getElementById('save').addEventListener('click', async function () {
        // Merge chosen slots, selected date, and reservation time
        const chosenSlots = Array.from(chosenSlotsList.querySelectorAll('li')).map(slot => slot.textContent.trim());

        alert('Chosen slots and date saved successfully.');

        const myObj = {
            ChosenSlot: chosenSlots,
        };

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
}
