import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import {
	EmailClient,
	EmailMessage,
	KnownEmailSendStatus
} from '@azure/communication-email';

export async function contact(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	try {
		const firstName = request.params.firstName;
		const lastName = request.params.lastName;
		const subject = request.params.subject;
		const body = request.params.message;
		const email = request.params.email;

		// const POLLER_WAIT_TIME = Number(process.env['AZ_MAIL_POLLER_WAIT_TIME']);
		// const POLLER_TIMEOUT = Number(process.env['AZ_MAIL_POLLER_TIMEOUT']);

		context.debug('Retrieving EmailClient');

		const azClient = new EmailClient(process.env['AZ_MAIL_CONNECTION_STRING']);

		context.debug('Retrieved EmailClient');

		const message: EmailMessage = {
			senderAddress: process.env['MAILTRAP_SENDER_EMAIL'],
			content: {
				subject: `${firstName} ${lastName} Re: ${subject}`,
				plainText: body
			},
			recipients: {
				to: [
					{
						address: process.env['MAILTRAP_RECEIVER_EMAIL']
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

		const response: string = `ID: ${poller.getResult().id}, Status: ${poller.getResult().status}, Error: ${poller.getResult().error}`;

		return { body: response, status: 200 };

		// context.debug('isStarted');

		// let timeElapsed = 0;
		// while (!poller.isDone()) {
		// 	poller.poll();
		// 	context.debug('Email send polling in progress');

		// 	await new Promise(resolve =>
		// 		setTimeout(resolve, POLLER_WAIT_TIME * 1000)
		// 	);
		// 	timeElapsed += POLLER_WAIT_TIME;

		// 	if (timeElapsed > POLLER_TIMEOUT * POLLER_WAIT_TIME) {
		// 		throw 'Polling timed out.';
		// 	}
		// }

		// if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
		// 	context.debug(
		// 		`Successfully sent the email (operation id: ${poller.getResult().id})`
		// 	);
		// 	return { body: poller.getResult().id, status: 200 };
		// } else {
		// 	throw poller.getResult().error;
		// }
	} catch (e) {
		context.error(e);
		return { body: e.message, status: 500 };
	}
}

app.http('contact', {
	methods: ['POST'],
	authLevel: 'anonymous',
	handler: contact
});
