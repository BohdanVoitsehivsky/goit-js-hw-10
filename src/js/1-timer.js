
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

let userSelectedDate = null;
let timerId = null;
const dateInput = document.querySelector("#datetime-picker");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

const startBtn = document.querySelector("[data-start]");
startBtn.disabled = true;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = new Date();
    if(selectedDates[0] <= now) {
        iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
});
        startBtn.disabled = true
    } else {
        userSelectedDate = selectedDates[0];
        startBtn.disabled = false;

    }
  },
};
flatpickr("#datetime-picker", options);


startBtn.addEventListener("click", handlerStart);
function handlerStart(event) {
    if(!userSelectedDate) return;
        
        startBtn.disabled = true;
        dateInput.disabled = true;
       
    
    timerId = setInterval(() => {
        const now = new Date ();
        const delta = userSelectedDate - now;

        if(delta <= 0) {
            clearInterval(timerId);
            updateTimer({days: 0, hours: 0, minutes: 0, seconds: 0});
            dateInput.disabled = false;
            startBtn.disabled = true;
            return;
        }
        const timeData = convertMs(delta);
        updateTimer(timeData);
    }, 1000)
}
function updateTimer({days, hours, minutes, seconds}) {
    daysSpan.textContent = days;
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);

}
function addLeadingZero(value) {
    return String(value).padStart(2, "0")
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







