const billAmount = document.querySelector(".input-bill-amount");
const cashReceived = document.querySelector(".input-payment-amount");
const btnCount = document.querySelector(".btn-count");
const btnNext = document.querySelector(".btn-next");
const paymentBlock = document.querySelector(".div-payment");
const changeBlock = document.querySelector(".div-change");
const remarks = document.querySelector(".span-remark");
const tableDiv = document.querySelector(".div-table");

// Next button logic starts here
const nextCashDiv = () => {
    if (billAmount.value && billAmount.value > 0) {
        btnNext.style.display = "none";
        paymentBlock.style.display = "block"
    } else {
        alert("No bill amount was entered");
    }
}

btnNext.addEventListener('click', nextCashDiv);

// Next button logic ends here //

// Main logic for cash register starts here

const countNotes = () => {
    let arrFinal;

    if (cashReceived.value < 0) {
        remarks.style.display = "block";
        tableDiv.style.display = "none";
        changeBlock.style.display = "block";
        remarks.textContent = "ENTER A VALID AMOUNT";

    } else if (Number(billAmount.value) > Number(cashReceived.value)) {
        remarks.style.display = "block";
        tableDiv.style.display = "none";
        changeBlock.style.display = "block";
        remarks.textContent = "CASH NOT SUFFICIENT";

    } else if (billAmount.value == cashReceived.value) {
        remarks.style.display = "block";
        tableDiv.style.display = "none";
        changeBlock.style.display = "block";
        remarks.textContent = "NO CHANGE TO RETURN";
    } else {
        let balance = cashReceived.value - billAmount.value;
        let balanceText = document.querySelectorAll("h4")[2];
        balanceText.innerHTML+=balance;
        let arrInitial = [2000, 500, 100, 50, 20, 10, 5, 2, 1];
        arrFinal = arrInitial.map((note) => {
            if (balance === 0) {
                return 0;
            } else if (balance / note > 0) {
                let number = Math.floor(balance / note);
                balance = balance - note * number;
                return number;
            }
        })
        arrFinal.forEach((number, index) => {
            let noteString = ".td-note-" + index;
            let noteCountText = document.querySelector(noteString);
            noteCountText.textContent = number;
            // console.log(noteCountText)
        });
        changeBlock.style.display = "block";
        tableDiv.style.display = "block";
        remarks.style.display = "none";
    }
}

btnCount.addEventListener('click',countNotes);

// Main logic for cash register ends here