import axios from 'axios';

export interface IApiLunch {
	firstName: string;
	lastName: string;
	email: string;
	howMany: string;
}

export const submitLunch = async (data: IApiLunch) => {
	const url: string = process.env.GATSBY_AZ_LUNCH_URL ?? '';
	const response = await axios.post(url, data, {
		headers: {
			'x-functions-key': process.env.GATSBY_AZ_API_KEY
		}
	});
	return response;
};
