import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';

export async function lunch(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const firstName = request.params.firstName;
	const lastName = request.params.lastName;
	const email = request.params.email;
	const howMany = request.params.howMany;

	const { MailtrapClient } = require('mailtrap');

	const TOKEN = process.env["MAILTRAP_TOKEN"];
	const ENDPOINT = process.env["MAILTRAP_ENDPOINT"];

	const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

	const sender = {
		email: process.env["MAILTRAP_SENDER_EMAIL"],
		name: process.env["MAILTRAP_SENDER_NAME"]
	};

	const recipients = [
		{
			email: process.env["ORG_EMAIL"]
		},
		// Remove second email when testing in local
		{
			email: email
		}
	];

	try {
		const response = await client
			.send({
				from: sender,
				to: recipients,
				template_uuid: process.env["MAILTRAP_LUNCH_TEMPLATE_UUID"],
				template_variables: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					howMany: howMany,
				}
			})
			console.log('Response: ', response);

		return { body: response.statusText, status: response.status };
	} catch (e) {
		context.error(e.message);
		return { body: e.message, status: 500 };
	}
}

app.http('lunch', {
	methods: ['POST'],
	authLevel: 'function',
	handler: lunch
});
