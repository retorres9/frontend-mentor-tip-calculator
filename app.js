const bill = document.querySelector("#bill");
const number = document.querySelector("#number");
const inputs = document.querySelectorAll("input");
const tipAmountNumber = document.querySelector(".tip-amount-number");
const totalNumber = document.querySelector(".total-number");
const tipBtn = document.querySelectorAll(".tip-btn");
const resetBtn = document.querySelector("#resetBtn");
const custom = document.querySelector('#custom');

let numberAmount;
let customAmount;
let billAmount;
let tipGiven;

resetBtn.addEventListener("click", () => {
    bill.value = null;
    number.value = null;
    custom.value = null;
    removeErrorInputs();
});

tipBtn.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
        removeActiveClass();
        btn.classList.toggle("active");
        tipGiven = Number(btn.value);
    });
});

function removeActiveClass() {
    tipBtn.forEach((btn) => {
        btn.classList.remove("active");
    });
}

inputs.forEach((inp) => {
    inp.addEventListener("input", (evt) => {
        evt.target.id === "bill" ?
            (billAmount = evt.target.value) :
            evt.target.id === "number" ?
            (numberAmount = evt.target.value) :
            evt.target.id === "custom" ?
            (tipGiven = evt.target.value) :
            false;

        evt.target.id === "number" ? toggleError() : false;
        calculateTip();
    });
});

function calculateTip() {
    let result = (billAmount * tipGiven) / 100 / 5;
    !isNaN(result) ?
        (tipAmountNumber.textContent = `$${result.toFixed(2)}`) :
        (tipAmountNumber.textContent = `$0.00`);
    if (Number(number.value) > 0) {
        let resultTotal =
            (Number(bill.value) + result * Number(number.value)) /
            Number(number.value);
        isNaN(resultTotal) ? totalNumber.textContent = '$0.00' :
            totalNumber.textContent = `$${resultTotal.toFixed(2)}`;

    }
    if (Number(number.value) < 1) {
        totalNumber.textContent = "$0.00";
    }
}

function toggleError() {
    if (!number.classList.contains("error") && Number(number.value) <= 0) {
        number.classList.add("error");
    } else if (number.classList.contains("error") && Number(number.value) > 0) {
        number.classList.remove("error");
    }
}

function removeErrorInputs() {
    console.log('entra');
    inputs.forEach(inp => {
        inp.classList.remove('error');
    });
}