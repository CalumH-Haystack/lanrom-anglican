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

			// Get Blob Client from name, to get the URL
			const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

			// Push blob URL
			urls.push(tempBlockBlobClient.url);
		}
	} catch {
		e => {
			context.log(e);
		};
	}

	return {
		jsonBody: {
			urls
		}
	};
}

app.http('announcements', {
	methods: ['GET'],
	authLevel: 'anonymous',
	handler: announcements
});
