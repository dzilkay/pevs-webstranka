const form = document.getElementById('form');
const Name= document.getElementById('Name');
const surname = document.getElementById('surname');
const sexRadios = document.querySelectorAll('input[type="radio"]')
const sexM = document.getElementById('sex-male');
const sexF = document.getElementById('sex-female');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
let isSelected = false;

form.addEventListener('submit', e => {
    e.preventDefault();

    for (const radio of sexRadios) {
        if (radio.checked) {
            isSelected = true;
            break;
        }
    }

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nameValue = Name.value.trim();
    const surNameValue = surname.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(nameValue === '') {
        setError(Name, 'Vyžaduje sa meno');
    } else {
        setSuccess(Name);
    }

    if(surNameValue === '') {
        setError(surname, 'Vyžaduje sa priezvisko');
    } else {
        setSuccess(surname);
    }

    if(!isSelected){
        document.getElementById('sex-male').checked = false;
    }else {
        document.getElementById('sex-male').checked = true;
    }

    if(usernameValue === '') {
        setError(username, 'Vyžaduje sa používateľské meno');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Vyžaduje sa email');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Zadajte platnú emailovú adresu.');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Vyžaduje sa heslo!');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Heslo musí obsahovať aspoň 8 znakov.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Prosím potvrdťe svoje heslo');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Hesla sa nezhoduju");
    } else {
        setSuccess(password2);
    }

};
