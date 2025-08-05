import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';
import { File } from 'node:buffer';

export async function editSermon(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	let result = null;
	let status = 400;

	const fileName = request.params.fileName;
	const name = request.params.name;
	const author = request.params.author;
	const series = request.params.series;
	const date = request.params.date;

	context.debug(fileName, name, author, series, date);

	try {

		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`,
			new DefaultAzureCredential()
		);

		const containerName = 'sermons';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);
		context.debug("Retrieved containerClient");

		context.debug("Retrieving blockBlobClient");
		const blockBlobClient = containerClient.getBlockBlobClient(fileName);
		context.debug("Retrieved blockBlobClient");

		result = await blockBlobClient.setMetadata({
			name,
			author,
			series,
			date
		});

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

app.http('editSermon', {
	methods: ['PUT'],
	authLevel: 'function',
	handler: editSermon
});
