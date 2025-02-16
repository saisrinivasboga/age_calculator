window.onload = function() {
    // Populate days
    const daySelect = document.getElementById('day');
    for(let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        daySelect.appendChild(option);
    }

    // Populate years
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    for(let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
    }

    // Add event listener to month select to update days
    document.getElementById('month').addEventListener('change', updateDays);
    document.getElementById('year').addEventListener('change', updateDays);
}

function updateDays() {
    const daySelect = document.getElementById('day');
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    // Store the currently selected day
    const currentDay = daySelect.value;
    
    // Clear the days
    while(daySelect.options.length > 1) {
        daySelect.remove(1);
    }

    // Calculate days in month
    let daysInMonth = 31;
    if(month === 4 || month === 6 || month === 9 || month === 11) {
        daysInMonth = 30;
    } else if(month === 2) {
        daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }

    // Populate days
    for(let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        daySelect.appendChild(option);
    }

    // Try to restore the previously selected day
    if(currentDay <= daysInMonth) {
        daySelect.value = currentDay;
    }
}

function calculateAge() {
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    if(!day || !month || !year) {
        alert('Please select a complete date');
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const now = new Date();

    if (birthDate > now) {
        alert('Birth date cannot be in the future');
        return;
    }

    const difference = now - birthDate;
    
    // Calculate all units
    const years = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((difference % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((difference % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((difference % (60 * 1000)) / 1000);

    // Update the DOM
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Make result more visible
    document.getElementById('result').style.opacity = '1';

    // Update seconds in real-time
    setInterval(updateSeconds, 1000);
}

function updateSeconds() {
    let seconds = parseInt(document.getElementById('seconds').textContent);
    let minutes = parseInt(document.getElementById('minutes').textContent);
    let hours = parseInt(document.getElementById('hours').textContent);
    
    seconds++;
    
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
            if (hours >= 24) {
                // Recalculate the whole age when a day passes
                calculateAge();
                return;
            }
            document.getElementById('hours').textContent = hours;
        }
        document.getElementById('minutes').textContent = minutes;
    }
    document.getElementById('seconds').textContent = seconds;
}