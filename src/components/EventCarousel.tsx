import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';
import ImageBox from './ImageBox';

export const EventCarousel = () => {
	return (
		<Carousel
			className='SecondExample'
			animation='slide'
			duration={800}
			swipe
			sx={{
				width: '100%',
        marginBottom: '32px'
			}}
		>
			{items.map((item, index) => {
				return <Project item={item} key={index} />;
			})}
		</Carousel>
	);
};

type Item = {
	name: string;
	description: string;
	color: string;
	href: string;
};

interface ProjectProps {
	item: Item;
}

function Project({ item }: ProjectProps) {
	return (
		<Paper
			className='Project'
			style={{
				borderRadius: '0',
			}}
			elevation={0}
		>
			<ImageBox src={item.href} sx={{
				borderBottom: `1px solid #F5F5F5`,
      }} />
		</Paper>
	);
}

const items: Item[] = [
	{
		name: 'Lear Music Reader',
		description: 'A PDF Reader specially designed for musicians.',
		color: '#64ACC8',
		href: 'https://static.wixstatic.com/media/07894e_b417c8deaa0b4754830283c42f4e663d~mv2.jpg/v1/fill/w_952,h_517,al_c,q_85,enc_auto/1724222922196-8389626f-d50d-4108-aa44-12f358ae8961_1.jpg'
	},
	{
		name: 'Hash Code 2019',
		description:
			'My Solution on the 2019 Hash Code by Google Slideshow problem.',
		color: '#7D85B1',
		href: 'https://static.wixstatic.com/media/07894e_feadba2b0b2b41ee8f0cd70ec08b443a~mv2.jpg/v1/fill/w_1129,h_802,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2024%20Christianity%20explored%20flyer.jpg'
	}
];
