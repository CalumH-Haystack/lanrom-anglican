import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';

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
			`https://lanromstorage.blob.core.windows.net`,
			new DefaultAzureCredential()
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		if(!await containerClient.getBlobClient(blobName).exists()) {
			status = 404;
			throw new Error("Image does not exist in container");
		}

		result = await containerClient.deleteBlob(blobName);
		context.debug(`result: ${result}`);
		status = 200;
	} catch (error) {
			context.error(`error: ${error}`);
			result = error;
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
	authLevel: 'function',
	handler: deleteAnnouncement
});
