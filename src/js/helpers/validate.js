import store from "../store/countries";
/***
 * @todo: при проверке телефона получить коды стран из стора стран
 */
export class ExtendedValidation {
	static instance;
	static regExpDic = {
		email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
		password: /^[0-9a-zA-Z]{4,}$/,
		nickname: /^(?!\d)(?:(?![@#])[a-zA-Z\d ]){4,16}$/,
		name: /^(?=.{1,20}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
		birthday: /^(0?[1-9]|1[0-2])\.([0-2]?[1-9]|[1-3][01])\.\d{4}$/,
		phone: /^(\+)?([0-9]){10,16}$/,
		empty: /^\S+[^ ]$/
	}
	phoneUtil;
	countryCodes;
	signinPwdSchema;
  	extDic;
	constructor() {
		if (!ExtendedValidation.instance) {
			this.countryCodes = ["RU", "US", "UA"];
			this.extDic = {
				password: value => {
					return this.testPassword(value);
				},
				phone: value => {
					return this.testPhone(value);
				},
				birthday: value => {
					return this.testBirthday(value);
				},
				country: value => {
					return this.testCountry(value);
				},
				city: value => {
					return this.testCity(value);
				}
			};
			ExtendedValidation.instance = this;
		}
		return ExtendedValidation.instance;
	}

	set signinPwdSchema(schema) {
		this.signinPwdSchema = schema;
	}

	set phoneUtil(_phoneUtil) {
		this.phoneUtil = _phoneUtil;
	}
	testCountry(value) {
		const country = store.selectedCountry;
		return (
			value.length > 0 &&
			country  !== false &&
			country.name === value
		);
	}
	testCity(value) {
		const country = store.selectedCountry;
		return (
			value.length > 0 &&
			country !== false &&
			country.findCity(value) !== false
		);
	}
	getAge(dateString) {
		const today = new Date();
		const birthDate = new Date(dateString);
		const m = today.getMonth() - birthDate.getMonth();
		let age = today.getFullYear() - birthDate.getFullYear();

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	testBirthday(value) {
		return this.getAge(value) >= 18;
	}

	testPhone(value) {
		const validCountry = this.countryCodes.filter(countryCode => {
			const number = this.phoneUtil.parseAndKeepRawInput(value, countryCode);
			return this.phoneUtil.isValidNumber(number) !== false;
		});
		return validCountry.length > 0;
	}

	testPassword(value) {
		return this.signinPwdSchema.validate(value);
	}
	testRetryPassword({ inputPassword, inputRetryPassword }) {
		if (inputPassword.value.length) {
			if (!inputRetryPassword.value.length) {
				return false;
			}
			return inputPassword.value === inputRetryPassword.value;
		}
		return true;
	}
	/**
	 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
	 * @param {HTMLInputElement} el
	 * @returns {Boolean} - Return true if input valid or doesn't has data-required attr
	 */
	validate(el) {
		const regExpName = el.dataset.required;
		const inputName = el.getAttribute("name");
		let checkResult = true;
		if (ExtendedValidation.regExpDic[regExpName]) {
      		checkResult = ExtendedValidation.regExpDic[regExpName].test(el.value);
    	}
		if (checkResult && this.extDic[inputName]) {
			checkResult = this.extDic[inputName](el.value);
		}
		return checkResult;
	}
}
