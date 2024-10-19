import { REGEX } from "../../utils/constants";

export const FIELD_NAMES = {
	FIRST_NAME: 'First Name',
	LAST_NAME: 'Last Name',
	EMAIL: 'Email',
	HOW_MANY: 'How many are coming?'
};

export const VALIDATIONS = {
	[FIELD_NAMES.FIRST_NAME]: (val: string) => {
		if (val.length === 0) {
			return 'We need your first name.';
		} else if(val.length > 30) {
			return 'You can\'t enter more than 30 characters.';
    } else return '';
	},
	[FIELD_NAMES.LAST_NAME]: (val: string) => {
		if (val.length === 0) {
			return 'We need your last name.';
		} else if(val.length > 30) {
			return 'You can\'t enter more than 30 characters.';
    } else return '';
	},
  [FIELD_NAMES.EMAIL]: (val: string) => {
    if(!val.match(REGEX.EMAIL) || val.length === 0 || val.length > 64) {
			return 'We need a valid email address.';
    } else return '';
	},
  [FIELD_NAMES.HOW_MANY]: (val: string) => {
    if(val.length === 0) {
			return 'We need to know how many are coming';
    } else if(Number.isNaN(parseInt(val))) {
			return 'We need a valid number of people (eg. 1 or 5).';
    } else return '';
	},
};