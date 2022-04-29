let form__edit = document.querySelector(".js-account-edit");

let list__account = document.querySelector(".js-account-list");

let js__account_form = document.querySelector(".account__address-form");


let cancel__form = document.querySelector(".form-canel");




form__edit.addEventListener("click", (e)=>{
    list__account.style.display = "none";

    js__account_form.style.display = "block";

});
cancel__form.addEventListener("click",(e)=>{
    e.preventDefault();

    list__account.style.display = "block";

    js__account_form.style.display = "none";

});




