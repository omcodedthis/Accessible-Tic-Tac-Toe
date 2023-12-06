// functions for timer.html

// start_timer() starts immediately after the page loads. timerInterval calls the arrow function every 1000ms (ie 1s), incrementing
// timePassed & updating time_shown by subtracting timePassed from TOTAL_TIME. The TOTAL_TIME is derived from the user input to the
// form. The user inputted value is passed to TOTAL_TIME in timer.html via jinja syntax. This is to allow the passing of the user
// value to the javascript function. This new time is assigned to time_shown which is thenpassed to show_time_left() to display
// the current time left.
document.addEventListener('DOMContentLoaded', function startTimer() {
    let timePassed = 0;
    let time_shown = TOTAL_TIME;
    let timerInterval = setInterval(() => {

      timePassed += 1;
      time_shown = TOTAL_TIME - timePassed;

      show_time_left(time_shown);
    }, 1000);
})


// show_time_left() calculates the hours, minute and seconds using time_shown. Zero is added to the hour, minute and second strings if
// the values are are single digit (< 10). The colors are adjusted to yellow for the last ten seconds & red when the timer hits zero.
// This time is then inserted into the inner HTML of the timer which is then shown to the user.
function show_time_left(time_shown) {
    if (time_shown <= 0)
    {
        time_shown = 0;
    }

    let timer = document.getElementById("base-timer-label");
    let circle = document.getElementById("circle");
    let hour = Math.floor(time_shown / (60 * 60));
    let  minute = (Math.floor(time_shown / 60) - ((hour - 1) * 60)) % 60;
    let second = time_shown % 60;

    if ((hour == 0) && (minute == 0) && (1 <= second) && (second <= 10))
    {
        timer.style.color = "#EED202";
        circle.setAttribute("stroke", "#EED202");
    }

    if ((hour == 0) && (minute <= 0) && (second <= 0))
    {
        minute = 0;
        second = 0;
        timer.style.color = "#D0342C";
        circle.setAttribute("stroke", "#D0342C");
    }

    if (hour < 10)
    {
        hour = "0" + hour;
    }

    if (minute < 10)
    {
        minute = "0" + minute;
    }

    if (second < 10)
    {
        second = "0" + second;
    }

    hour = hour + ":";
    minute = minute + ":";
    timer.innerHTML = hour + minute + second;
}


// functions for light/dark modes

// change_site_mode() runs when the user clicks the light/dark mode button. If the button value is "off" (default), the theme is
// changed to light & the whether the lightmode is enabled/disabled is stored into localStorage. The opposite occurs when the user
// clicks the button again.
function change_site_mode() {
    let html = document.querySelector("html");
    let toggle = document.getElementById("toggle");

    if (toggle.value == "off")
    {
        html.setAttribute("data-bs-theme", "light");
        localStorage.setItem("lightmode", "enabled");
        toggle.value = "on";
    }

    else if (toggle.value == "on")
    {
        html.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("lightmode", "disabled");
        toggle.removeAttribute("checked");
        toggle.value = "off";
    }
}


// checker() runs when the page is loaded. If lightmode is enabled the button is checked & the toggle value is set to "on". The
// opposite occurs when lightmode is disabled.
document.addEventListener('DOMContentLoaded',function checker() {
    if(localStorage.getItem('lightmode') == 'enabled')
    {
        let toggle = document.querySelector("#toggle");
        toggle.checked = true;
        toggle.value = "on";
    }

    if(localStorage.getItem('lightmode') == 'disabled')
    {
        let toggle = document.querySelector("#toggle");
        toggle.value = "off";
    }
})

// This section is run without any listeners to prevent a frame of the dark theme being shown before being converted to light mode
// when the 'DOMContentLoaded' listener is used.
if (localStorage.getItem('lightmode') == 'enabled')
{
    let html = document.querySelector("html");
    html.setAttribute("data-bs-theme", "light");
}

if (localStorage.getItem('lightmode') == 'disabled')
{
    let html = document.querySelector("html");
    html.setAttribute("data-bs-theme", "dark");
}