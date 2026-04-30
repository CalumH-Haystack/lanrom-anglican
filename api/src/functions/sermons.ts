import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';

interface ISermonData {
	name: string;
	author: string;
	date: string;
	url: string;
	series: string;
	subject: string;
}

export async function sermons(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const sermons: Array<ISermonData> = [];
	const serviceUrl = `https://lanromstorage.blob.core.windows.net`;

	try {
		const blobServiceClient: BlobServiceClient = new BlobServiceClient(
			serviceUrl,
		);

		const containerName = 'sermons';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		context.debug(`Retrieved at ${Date().toLocaleString()}:`);
		for await (const blob of containerClient.listBlobsFlat({
			includeMetadata: true
		})) {
			// Get Blob Client from name, to get the URL
			const metadata = blob.metadata;
			const sermon: ISermonData = {
				url: serviceUrl.concat(`/${containerName}/${blob.name}`),
				name: metadata.name,
				author: metadata.author,
				series: metadata.series,
				subject: metadata.subject,
				date: metadata.date
			};

			// Push newly created sermon object
			sermons.push(sermon);
		}
	} catch (e) {
		context.error(e);
	}

	return {
		jsonBody: {
			sermons
		}
	};
}

app.http('sermons', {
	methods: ['GET'],
	authLevel: 'anonymous',
	handler: sermons
});
