import "../css/style.css";
import "./plugins";
import UI from './config/ui.config';
import { ExtendedValidation as formValidator } from "./helpers/validate";
import { showInputError, removeInputError } from './views/form';
import { login, signup } from "./services/auth.service";
import { notify } from './views/notifications';

const fieldChecker = new formValidator();
const { formLogin, formRegister, signinFields, loginFields } = UI;
const { inputPassword, inputAcceptPolicy } = signinFields;
const inputRetryPassword = document.getElementById("signin-retry-password");
// Events
document.querySelectorAll('.toggle-forms').forEach(input => {
	input.addEventListener('click', e => {
		e.preventDefault();
		if (formRegister.parentElement.classList.contains('d-none')) {
			formRegister.parentElement.classList.remove('d-none');
			formLogin.parentElement.classList.add('d-none');
		}
		else {
			formLogin.parentElement.classList.remove('d-none');
			formRegister.parentElement.classList.add('d-none');
		}
	});
});

inputRetryPassword.addEventListener("focusout", handlePasswordRetry)
inputRetryPassword.addEventListener("focus", () =>
	removeInputError(inputRetryPassword)
);

inputPassword.addEventListener("focusout", handlePasswordRetry);

function handlePasswordRetry (e) {
	const isValidRetry = fieldChecker.testRetryPassword({
		inputPassword,
		inputRetryPassword
	});
	if (!isValidRetry) {
		showInputError(inputRetryPassword);
		return false;
	}
	return true;
};

formLogin.addEventListener('submit', e => {
	e.preventDefault();
	onLoginSubmit();
});
formRegister.addEventListener('submit', e => {
	e.preventDefault();
	onSigninSubmit();
});
[loginFields, signinFields].map(inputColletion => 
	Object.entries(inputColletion).forEach(([key, input]) =>
		input.addEventListener("focus", () => removeInputError(input))
	)
);

// Handlers
async function onLoginSubmit() {
	const isValidForm = Object.entries(loginFields).every(([key, input]) => {
    	const isValidInput = fieldChecker.validate(input);
		if (!isValidInput) {
			showInputError(input);
		}
		return isValidInput;
	});

	if (!isValidForm)
		return;

	try {
		let { inputEmail, inputPassword } = loginFields;
		await login(inputEmail.value, inputPassword.value);
		formLogin.reset();
		notify({ msg: 'Login success', className: 'alert-success' });
	} catch (err) {
		notify({ mas: 'Login faild', className: 'alert-danger' });
	}
}
async function onSigninSubmit() {
	const isValidForm = Object.entries(signinFields).every(([key, input]) => {
		let isValidInput;
		if (key == 'inputAcceptPolicy') {
			isValidInput = inputAcceptPolicy.checked !== false;
		} else {
			isValidInput = fieldChecker.validate(input);
			if (isValidInput && key == "password") {
				isValidInput = handlePasswordRetry.call();
      		}
		}
		if (!isValidInput) {
			showInputError(input);
		}
		return isValidInput;
	});
	if (!isValidForm) return;

	try {
		await signup({
			email: signinFields.inputEmail.value,
			password: signinFields.inputPassword.value,
			nickname: signinFields.inputNickname.value,
			first_name: signinFields.inputFirstname.value,
			last_name: signinFields.inputLastname.value,
			phone: signinFields.inputPhone.value,
			gender_orientation: signinFields.inputSex.value,
			city: signinFields.inputCity.value,
			country: signinFields.inputCountry.value,
			date_of_birth_day: formRegister.dataset.date_of_birth_day,
			date_of_birth_month: formRegister.dataset.date_of_birth_month,
			date_of_birth_year: formRegister.dataset.date_of_birth_year
		});
		formRegister.reset();
		notify({ msg: response.data.message, className: "alert-success" });
	} catch (err) {
		notify({ mas: 'Signup faild', className: 'alert-danger' });
	}
}