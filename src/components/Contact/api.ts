
import axios from 'axios';

export interface IApiContact {
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
}

export const submitContact = async (data: IApiContact) => {
	const url: string = process.env.GATSBY_AZ_CONTACT_URL ?? '';
	const response = await axios.post(url, data);
  return response;
}