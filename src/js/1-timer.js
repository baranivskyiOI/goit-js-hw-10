import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const timeInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector(".timer-button");

const daysElem = document.querySelector("[data-days]")
const hoursElem = document.querySelector("[data-hours]")
const minutesElem = document.querySelector("[data-minutes]")
const secondsElem = document.querySelector("[data-seconds]")

let userDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];

        if (userDate < new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future.',
            });

            startButton.classList.remove("active-btn");
            return;
        } else { 
            startButton.classList.add("active-btn");
        }
        
        return userDate;
  },
};

flatpickr(timeInput, options); 

let isActive = false;

startButton.addEventListener("click", (e) => { 
    if (!e.target.classList.contains("active-btn") || isActive) return;

    isActive = true;

    startButton.classList.remove("active-btn");

    timeInput.setAttribute("disabled", true);

    const timer = setInterval(() => {

        const timeDifference = userDate.getTime() - Date.now();
        
        if (timeDifference <= 1000) {
            clearInterval(timer)
            isActive = true;
            timeInput.removeAttribute("disabled");
        }
        
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        
        timerRendering(days, hours, minutes, seconds)

     }, 1000);
    
});

function timerRendering(days, hours, minutes, seconds) {
    
    daysElem.textContent = days.toString().padStart(2,"0");
    hoursElem.textContent = hours.toString().padStart(2,"0");
    minutesElem.textContent = minutes.toString().padStart(2,"0");
    secondsElem.textContent = seconds.toString().padStart(2,"0");


}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}