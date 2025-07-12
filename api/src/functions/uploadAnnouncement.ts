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

		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);

		const containerName = 'announcements';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		if (await containerClient.getBlobClient(name).exists()) {
			`${Date.now().toString}_${name}`;
		}

		result = await containerClient.uploadBlockBlob(name, image, image.size);
		context.log(result);
		status = 200;
	} catch {
		e => {
			context.error(e);
			
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

app.http('uploadAnnouncement', {
	methods: ['POST'],
	authLevel: 'anonymous',
	handler: uploadAnnouncement
});
