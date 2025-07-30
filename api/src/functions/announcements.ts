import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';

export async function announcements(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const urls: Array<string> = [];
	let status = 400;

	try {
		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		for await (const blob of containerClient.listBlobsFlat()) {
			// blob

			// // Get Blob Client from name, to get the URL
			// const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

			// // Push blob URL
			// urls.push(tempBlockBlobClient.url);

			urls.push(`${containerClient.url}/${blob.name}`);
		}

		status = 200;
	} catch (error) {
			context.error(error);
	}

	return {
		jsonBody: {
			urls
		},
		status
	};
}

app.http('announcements', {
	methods: ['GET'],
	authLevel: 'anonymous',
	handler: announcements
});
