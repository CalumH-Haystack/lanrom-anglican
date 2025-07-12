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

	try {
		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		result = containerClient.deleteBlob(blobName)

	} catch {
		e => {
			context.log(e);
		};
	}

	return {
		jsonBody: {
			result
		}
	};
}

app.http('deleteAnnouncement', {
	methods: ['DELETE'],
	authLevel: 'anonymous',
	handler: deleteAnnouncement
});
