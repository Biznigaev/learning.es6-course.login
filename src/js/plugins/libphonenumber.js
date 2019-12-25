import libphonenumber, { PhoneNumberUtil } from "google-libphonenumber";
import { ExtendedValidation as formValidator } from "../helpers/validate";

const fieldChecker = new formValidator();
fieldChecker.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();