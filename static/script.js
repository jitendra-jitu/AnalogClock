let currentTimezoneOffset = 330; // Default timezone offset in minutes (Kolkata IST is UTC+5:30)

function updateClock() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const adjustedTime = new Date(utcTime + (currentTimezoneOffset * 60000));

    const hours = adjustedTime.getHours();
    const minutes = adjustedTime.getMinutes();
    const seconds = adjustedTime.getSeconds();
    const milliseconds = adjustedTime.getMilliseconds();

    // Update analog clock hands
    const hourDegrees = (hours % 12 + minutes / 60) * 30;
    const minuteDegrees = (minutes + seconds / 60) * 6;
    const secondDegrees = seconds * 6;
    const fourthDegrees = ((seconds * 1000 + milliseconds) / 1000) * 360;

    document.getElementById('hourHand').style.transform = `rotate(${hourDegrees}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minuteDegrees}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${secondDegrees}deg)`;
    document.getElementById('fourthHand').style.transform = `rotate(${fourthDegrees}deg)`;

    // Update digital clock display
    document.getElementById('digitalClock').textContent = adjustedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function changeTimezone() {
    const selectedTimezone = document.getElementById('timezone').value;
    const timezoneOffsets = {
        "Asia/Kolkata": 330,
        "America/New_York": -300,
        "America/Los_Angeles": -480,
        "Europe/London": 0,
        // Add more timezones as needed
    };

    currentTimezoneOffset = timezoneOffsets[selectedTimezone] || 330; // Update offset based on selection
    document.getElementById('timezoneLabel').textContent = `Current Timezone: ${selectedTimezone}`;
}

document.getElementById('changeTimezoneButton').addEventListener('click', changeTimezone);
document.getElementById('toggleClockButton').addEventListener('click', function() {
    const digitalClock = document.getElementById('digitalClock');
    const analogClock = document.getElementById('analogClock');

    if (digitalClock.style.display === "none") {
        digitalClock.style.display = "block"; // Show digital clock
        analogClock.style.display = "none"; // Hide analog clock
        this.textContent = "Switch to Analog Clock"; // Change button text
    } else {
        digitalClock.style.display = "none"; // Hide digital clock
        analogClock.style.display = "block"; // Show analog clock
        this.textContent = "Switch to Digital Clock"; // Change button text
    }
});


// Function to toggle the theme
function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('themeButton');

    // Toggle between light and dark themes
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeButton.textContent = "Switch to Light Mode"; // Update button text
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeButton.textContent = "Switch to Dark Mode"; // Update button text
    }
}

// Set default theme on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('light-theme'); // Set default to light theme
    document.getElementById('themeButton').textContent = "Switch to Dark Mode"; // Initial button text
});

// Event listener for theme button
document.getElementById('themeButton').addEventListener('click', toggleTheme);

// Start the clock
startClock();


function updateDigitalClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString();

    document.getElementById('digital-time').textContent = timeString;
    document.getElementById('digital-date').textContent = dateString;
}

// Update the digital clock every second
setInterval(updateDigitalClock, 1000);

// Initialize the digital clock on page load
updateDigitalClock();
