import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { DefaultAzureCredential } from '@azure/identity';
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
		let image: File = formdata.get('image') as File;
		if(!image?.type?.includes("image/")) {
			status = 400;
			throw new Error('File invalid');
		}
		let name = image.name;

		context.debug(name);

		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`,
			new DefaultAzureCredential()
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);
		context.debug("Retrieved containerClient");

		// if (await containerClient.getBlobClient(name).exists()) {
		// 	name = `${Date.now().toString}_${name}`;
		// }

		context.debug("Retrieving blockBlobClient");
		const blockBlobClient = containerClient.getBlockBlobClient(name);
		context.debug("Retrieved blockBlobClient");

		result = await blockBlobClient.uploadData(await image.arrayBuffer());
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
	authLevel: 'function',
	handler: uploadAnnouncement
});
