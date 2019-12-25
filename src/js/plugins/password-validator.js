import passwordValidator from "password-validator";
import { ExtendedValidation as formValidator } from "../helpers/validate";

const schema = new passwordValidator();
schema
    .is().min(6)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

const fieldChecker = new formValidator();
fieldChecker.signinPwdSchema = schema;
