import * as React from 'react';
import App from '../../components/App/App';
import { HeadFC } from 'gatsby';
import { SermonPlayer } from '../../components/Sermons/components';

const Sermons = () => {
	return (
		<App>
			<SermonPlayer />
		</App>
	);
};

export default Sermons;
export const Head: HeadFC = () => (
	<title>Sermon Archive</title>
);
