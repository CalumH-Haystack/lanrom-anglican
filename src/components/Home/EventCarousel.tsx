import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, useTheme } from '@mui/material';
import axios from 'axios';
import { GatsbyImage } from "gatsby-plugin-image"

export const EventCarousel = () => {
	const [imageUrls, setImageUrls] = useState(new Array<string>());

	const fetchUrls = async () => {
		await axios
			.get(process.env.GATSBY_AZ_ANNOUNCEMENTS_URL ?? '', {
				headers: {
					'x-functions-key': process.env.GATSBY_AZ_FUNCTION_KEY
				}
			})
			.then(res => {
				const urls: Array<string> = res.data?.urls ?? [];
				console.log(urls);

				setImageUrls(urls);
			})
			.catch((e) => console.error(e));
	};

	useEffect(() => {
		fetchUrls();
	}, []);

	return (
		<>
			<Carousel
				animation='slide'
				duration={800}
				swipe
				sx={{
					width: '100%',
					marginBottom: '32px'
				}}
				autoPlay
				stopAutoPlayOnHover
			>
				{imageUrls.map((imgUrl, index) => {
					return (
						<Paper
							className='Project'
							style={{
								borderRadius: '0'
							}}
							elevation={0}
						>
							<GatsbyImage alt={`Carousel Image No. ${index + 1}`} image={{
								layout: 'fullWidth',
								width: 16,
								height: 9,
								images: {
									fallback: {
										src: imgUrl
									}
								}
							}} />
						</Paper>
					);
				})}
			</Carousel>
		</>
	);
};
