import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import list from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import './style.css';

export default function Calendar() {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Box
			sx={{
				width: '100%'
			}}
		>
			<FullCalendar
				plugins={[dayGridPlugin, list, googleCalendarPlugin]}
				initialView={isMobileView ? 'listWeek' : 'dayGridMonth'}
				headerToolbar={{
					left: 'prev,next',
					center: 'today',
					right: 'dayGridMonth,listWeek'
				}}
        buttonText={{
          prev: '<',
          next: '>',
          today: 'Today',
          month: 'Month',
          listWeek: 'Week'
        }}
				googleCalendarApiKey={process.env.GATSBY_GOOGLE_CALENDAR_API_KEY}
				events={{
					googleCalendarId: process.env.GATSBY_CALENDAR_ID
				}}
				eventClick={arg => {
					window.open(arg.event.url, '_blank');
					arg.jsEvent.preventDefault();
				}}
			/>
		</Box>
	);
}
