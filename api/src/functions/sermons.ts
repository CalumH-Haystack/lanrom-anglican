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
}

export async function sermons(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const sermons: Array<ISermonData> = [];

	try {
		const blobServiceClient = new BlobServiceClient(
			`https://lanromstorage.blob.core.windows.net`
		);

		const containerName = 'sermons';
		const containerClient = await blobServiceClient.getContainerClient(
			containerName
		);

		console.log(`Retrieved at ${Date().toLocaleString()}:`);
		for await (const blob of containerClient.listBlobsFlat()) {
			// Get Blob Client from name, to get the URL
			const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
			const properties = await tempBlockBlobClient.getProperties();
			const sermon: ISermonData = {
				url: tempBlockBlobClient.url,
				name: properties.metadata.name,
				author: properties.metadata.author,
				series: properties.metadata.series,
				date: properties.metadata.date
			};
			console.log(sermon);

			// Push newly created sermon object
			sermons.push(sermon);
		}
	} catch {
		e => {
			context.log(e);
		};
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
