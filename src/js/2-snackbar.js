

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

function promiseGeneration() {
const form = document.querySelector(".form");
form.addEventListener("submit", handlerSubmit);


function handlerSubmit(event) {
    event.preventDefault();
    

     const delay = Number(form.elements.delay.value);
        const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === "fulfilled") {
                resolve(delay);

            } else {
                reject(delay);
            }
        }, delay);
    });
    promise
    .then(delayValue => {
        iziToast.success({
            title: `Succsess`,
            message: `✅ Fulfilled promise in ${delayValue}ms`,
             position: 'topRight'
        });
    })
    .catch(delayValue => {
        iziToast.error({
            title: `Error`,
            message: `❌ Rejected promise in ${delayValue}ms`,
            position: 'topRight'

        })
    })

}
}
promiseGeneration()