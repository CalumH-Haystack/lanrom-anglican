import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';

export async function deleteAnnouncement(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const blobName: string = request.params.blobName;
	let result = null;
	let status = 400;

	try {
		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		const result = await containerClient.deleteBlob(blobName);
		context.log(`result: ${JSON.stringify(result)}`);
		status = 200;
	} catch {
		e => {
			context.log(`error: ${JSON.stringify(result)}`);
			result = e;
		};
	}

	return {
		jsonBody: {
			result
		},
		status
	};
}

app.http('deleteAnnouncement', {
	methods: ['DELETE'],
	authLevel: 'anonymous',
	handler: deleteAnnouncement
});
