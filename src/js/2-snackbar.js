import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { delay, state } = e.currentTarget.elements;

    const delayTime = Number(delay.value);

    createPromises(state.value, delayTime)
        .then((delay) => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
            });
        });
    
    form.reset();
});
 
function createPromises(promiseState, delay) {
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (promiseState === "fulfilled") {
                res(delay);
            } else {
                rej(del ay);
            }
        }, delay);
    });

    return promise;
}