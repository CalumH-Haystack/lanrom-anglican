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
	let result = {};
	let status = 400;
	context.log(`blobName: ${blobName}`);

	try {
		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);
		context.log(`blobServiceClient: ${JSON.stringify(blobServiceClient)}`);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);
		context.log(`containerClient: ${JSON.stringify(containerClient)}`);

		result = await containerClient.deleteBlob(blobName);
		context.log(`result: ${JSON.stringify(result)}`);
		status = 200;
	} catch {
		e => {
			context.log(`error: ${JSON.stringify(result)}`);
			result = e;
		};
	}
	context.log(`result: ${JSON.stringify(result)}`);

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
