import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { GatsbyImage } from "gatsby-plugin-image"

export const EventCarousel = () => {
	const theme = useTheme();
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

type Item = {
	alt?: string;
	href: string;
};

const items: Item[] = [
	{
		href: 'https://static.wixstatic.com/media/07894e_b417c8deaa0b4754830283c42f4e663d~mv2.jpg/v1/fill/w_952,h_517,al_c,q_85,enc_auto/1724222922196-8389626f-d50d-4108-aa44-12f358ae8961_1.jpg'
	},
	{
		href: 'https://static.wixstatic.com/media/07894e_feadba2b0b2b41ee8f0cd70ec08b443a~mv2.jpg/v1/fill/w_1129,h_802,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2024%20Christianity%20explored%20flyer.jpg'
	},
	{
		href: 'https://static.wixstatic.com/media/718c95_37e54d4f3aa54da4a4505e2978acc9bb~mv2.jpg/v1/fill/w_484,h_296,q_90/718c95_37e54d4f3aa54da4a4505e2978acc9bb~mv2.webp'
	}
];
