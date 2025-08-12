import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';

export async function contact(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const firstName = request.params.firstName;
	const lastName = request.params.lastName;
	const subject = request.params.subject;
	const body = request.params.body;

	context.debug('Retrieving EmailClient');

	const azClient = new EmailClient(process.env['AZ_MAIL_CONNECTION_STRING']);

	context.debug('Retrieved EmailClient');

	const POLLER_WAIT_TIME = 10;
	try {
		const message = {
			senderAddress:
				'DoNotReply@e526ad64-dc57-4308-9397-0607d51be6b6.azurecomm.net',
			content: {
				subject: `${firstName} ${lastName} Re: ${subject}`,
				plainText: body
			},
			recipients: {
				to: [
					{
						address: 'calumhay@haystackdev.au',
						displayName: 'CalumHay@Haystack'
					}
				]
			}
		};

		context.debug('Beginning send');

		const poller = await azClient.beginSend(message);

		context.debug('Send begun');

		if (!poller.getOperationState().isStarted) {
			throw 'Poller was not started.';
		}

		context.debug('isStarted');

		let timeElapsed = 0;
		while (!poller.isDone()) {
			poller.poll();
			context.debug('Email send polling in progress');

			await new Promise(resolve =>
				setTimeout(resolve, POLLER_WAIT_TIME * 1000)
			);
			timeElapsed += 10;

			if (timeElapsed > 6 * POLLER_WAIT_TIME) {
				throw 'Polling timed out.';
			}
		}

		if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
			console.log(
				`Successfully sent the email (operation id: ${poller.getResult().id})`
			);
			return { body: poller.getResult().id, status: 200 };
		} else {
			throw poller.getResult().error;
		}
	} catch (e) {
		console.error(e);
		return { body: e.message, status: 500 };
	}

	// const { MailtrapClient } = require('mailtrap');

	// const TOKEN = process.env["MAILTRAP_TOKEN"];
	// const ENDPOINT = process.env["MAILTRAP_ENDPOINT"];

	// const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

	// const sender = {
	// 	email: process.env["MAILTRAP_SENDER_EMAIL"],
	// 	name: process.env["MAILTRAP_SENDER_NAME"]
	// };

	// const recipients = [
	// 	{
	// 		email: process.env["ORG_EMAIL"]
	// 	},
	// ];

	// try {
	// 	const response = await client
	// 		.send({
	// 			from: sender,
	// 			to: recipients,
	// 			template_uuid: process.env["MAILTRAP_CONTACT_TEMPLATE_UUID"],
	// 			template_variables: {
	// 				firstName: firstName,
	// 				lastName: lastName,
	// 				subject: subject,
	// 				body: body
	// 			}
	// 		})

	// 	return { body: response.statusText, status: response.status };
	// } catch (e) {
	// 	context.error(e.message);
	// 	return { body: e.message, status: 500 };
	// }
}

app.http('contact', {
	methods: ['POST'],
	authLevel: 'function',
	handler: contact
});
