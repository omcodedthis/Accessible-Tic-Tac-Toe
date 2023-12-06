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
