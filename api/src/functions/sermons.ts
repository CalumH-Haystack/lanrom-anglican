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

		for await (const blob of containerClient.listBlobsFlat()) {
			console.log('Retrieved: \n');

			// Get Blob Client from name, to get the URL
			const tempBlockBlobClient = await containerClient.getBlockBlobClient(
				blob.name
			);
			const getTags = await tempBlockBlobClient.getTags();
			const sermon: ISermonData = {
				url: tempBlockBlobClient.url,
				name: getTags.tags['name'],
				author: getTags.tags['author'],
				series: getTags.tags['series'],
				date: getTags.tags['date']
			};
			console.log(sermon, '\n');

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
