import { EmailClient, EmailMessage, KnownEmailSendStatus } from '@azure/communication-email';
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

	const POLLER_WAIT_TIME = 2;
	try {
		context.debug('Retrieving EmailClient');

		const azClient = new EmailClient(process.env['AZ_MAIL_CONNECTION_STRING']);

		context.debug('Retrieved EmailClient');

		const message: EmailMessage = {
			senderAddress: email,
			content: {
				subject: `${firstName} ${lastName} Lunch RSVP`,
				plainText: `${firstName} ${lastName} has just RSVP'd for ${howMany} people`
			},
			recipients: {
				to: [
					{
						address: process.env['MAILTRAP_SENDER_EMAIL']
					}
				]
			},
			replyTo: [
				{
					address: email
				}
			]
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
			context.debug(
				`Successfully sent the email (operation id: ${poller.getResult().id})`
			);
			return { body: poller.getResult().id, status: 200 };
		} else {
			throw poller.getResult().error;
		}
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
