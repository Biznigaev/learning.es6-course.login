import "js-datepicker/dist/datepicker.min.css";
import datepicker from "js-datepicker";
import UI from "../config/ui.config";

const { formRegister, signinFields } = UI;
const { inputBirthdate } = signinFields;

datepicker(inputBirthdate, {
	formatter: (input, date, instance) =>
		input.value = date.toLocaleDateString(),
	onSelect: (instance, date) => {
		formRegister.dataset["date_of_birth_day"] = date.getDate();
		formRegister.dataset["date_of_birth_month"] = date.getMonth();
		formRegister.dataset["date_of_birth_year"] = date.getFullYear();
	}
});