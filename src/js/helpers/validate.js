import passwordValidator from "password-validator";
import libphonenumber from "google-libphonenumber";
/***
 * @todo: оформить получение городов и стран через сервис и их последующую валидацию
 * @todo: объединение сервиса auth: login, register
 */
class ExtendedValidation {
  constructor() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.countryCodes = ["RU", "US", "UA"];

    this.signinPwdSchema = new passwordValidator();
    this.signinPwdSchema
      .is()
      .min(8)
      .is()
      .max(16)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces();

    this.regExpDic = {
      email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
      password: /^[0-9a-zA-Z]{4,}$/,
      nickname: /^(?!\d)(?:(?![@#])[a-zA-Z\d ]){4,16}$/,
      name: /^(?=.{1,20}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      birthday: /^(0?[1-9]|1[0-2])\.([0-2]?[1-9]|[1-3][01])\.\d{4}$/,
      phone: /^(\+)?([0-9]){10,16}$/,
      empty: /^\S+[^ ]$/
    };

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
  }
  /**
   * @todo: проверить, что значение содержится в store-e стран
   */
  testCountry(value) {
    return value != "Choose...";
  }
  /**
   * @todo: проверить, что значение содержится в store-e городов выбранной страны
   */
  testCity(value) {
    return value != "Choose...";
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
    if (fieldChecker.regExpDic[regExpName]) {
      checkResult = fieldChecker.regExpDic[regExpName].test(el.value);
    }
    if (checkResult && fieldChecker.extDic[inputName]) {
      checkResult = fieldChecker.extDic[inputName](el.value);
    }
    return checkResult;
  }
}
export const fieldChecker = new ExtendedValidation();
