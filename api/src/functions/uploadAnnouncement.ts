import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import { File } from 'node:buffer';

export async function uploadAnnouncement(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	let result = null;
	let status = 400;

	try {
		var formdata = await request.formData();
		let image = formdata.get('image') as File;
		let name = image.name;

		context.debug(image.name);

		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);
		context.debug("Retrieved containerClient");

		if (await containerClient.getBlobClient(name).exists()) {
			name = `${Date.now().toString}_${name}`;
		}

		// const blockBlobClient = containerClient.getBlockBlobClient(name);
		// context.debug("Retrieved blockBlobClient");

		// result = blockBlobClient.uploadData(image);

		result = await containerClient.uploadBlockBlob(name, image, image.size);
		context.debug(result);
		status = 200;
	} catch (error) {
		context.error(error);

		result = error;
	}

	return {
		jsonBody: {
			result
		},
		status
	};
}

app.http('uploadAnnouncement', {
	methods: ['POST'],
	authLevel: 'anonymous',
	handler: uploadAnnouncement
});
