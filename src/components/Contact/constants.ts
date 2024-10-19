
export const FIELD_NAMES = {
	FIRST_NAME: 'First Name',
	LAST_NAME: 'Last Name',
	EMAIL: 'Email',
	HOW_MANY: 'How many are coming?',
	SUBJECT: 'Subject',
	MESSAGE: 'Message'
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
  [FIELD_NAMES.SUBJECT]: (val: string) => {
		if (val.length === 0) {
			return 'We need a subject.';
    } else if(val.length > 30) {
			return 'You can\'t enter more than 30 characters.';
    } else return '';
	},
  [FIELD_NAMES.MESSAGE]: (val: string) => {
		if (val.length === 0) {
			return 'We need you to include a message.';
    } else if(val.length > 500) {
			return 'You can\'t enter more than 500 characters.';
    } else return '';
	},
};