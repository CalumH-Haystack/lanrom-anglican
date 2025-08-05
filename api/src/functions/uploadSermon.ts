import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient, BlockBlobParallelUploadOptions } from '@azure/storage-blob';
import { File } from 'node:buffer';

export async function uploadSermon(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	let result = null;
	let status = 400;

	try {
		var formdata = await request.formData();
		const audio: File = formdata.get('audio') as File;
		const title = formdata.get('name') as string;
		const author = formdata.get('author') as string;
		const series = formdata.get('series') as string;
		const date = formdata.get('date') as string;
		if(!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
			status = 400;
			throw new Error('Date invalid');
		}
		if(!audio?.type?.includes("audio/")) {
			status = 400;
			throw new Error('File invalid');
		}
		let name = audio.name;

		context.debug(name);

		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`,
			new DefaultAzureCredential()
		);

		const containerName = 'sermons';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);
		context.debug("Retrieved containerClient");

		if (await containerClient.getBlobClient(name).exists()) {
			name = `${Date.now().toString()}_${name}`;
		}

		context.debug("Retrieving blockBlobClient");
		const blockBlobClient = containerClient.getBlockBlobClient(name);
		context.debug("Retrieved blockBlobClient");

		const uploadOptions: BlockBlobParallelUploadOptions = {
			metadata: {
				name: title,
				author,
				series,
				date
			}
		};

		result = await blockBlobClient.uploadData(await audio.arrayBuffer(), uploadOptions);
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

app.http('uploadSermon', {
	methods: ['POST'],
	authLevel: 'function',
	handler: uploadSermon
});
