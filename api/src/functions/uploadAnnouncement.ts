import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import { File } from 'node:buffer';

export async function announcements(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	let result = null;

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

		if(await containerClient.getBlobClient(name).exists()) {
			`${Date.now().toString}_${name}`;
		}

		result = await containerClient.uploadBlockBlob(name, image, image.size);

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

app.http('announcements', {
	methods: ['GET'],
	authLevel: 'anonymous',
	handler: announcements
});
