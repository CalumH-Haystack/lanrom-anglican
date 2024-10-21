import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';

export async function contact(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const firstName = request.params.firstName;
	const lastName = request.params.lastName;
	const email = request.params.email;
	const subject = request.params.subject;
	const body = request.params.body;

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
				template_uuid: process.env["MAILTRAP_CONTACT_TEMPLATE_UUID"],
				template_variables: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					subject: subject,
					body: body
				}
			})

		return { body: response.statusText, status: response.status };
	} catch (e) {
		context.error(e.message);
		return { body: e.message, status: 500 };
	}
}

app.http('contact', {
	methods: ['POST'],
	authLevel: 'function',
	handler: contact
});
