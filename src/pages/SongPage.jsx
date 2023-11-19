import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from "react-apexcharts";

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import config from '../config';
import "./SongPage.css";
import IconMenu from '../components/menu';

const SongPage = () => {

	const location = useLocation();
	const [infos, setInfos] = useState();
	const [emotions, setEmotions] = useState([]);

	const queryParams = new URLSearchParams(location.search);
	const songName = queryParams.get('songName');

	const options = {
		animations: {
			enabled: true,
			easing: 'easeinout',
			speed: 50,
			animateGradually: {
				enabled: true,
				delay: 50
			},
			dynamicAnimation: {
				enabled: true,
				speed: 350
			},
		},
		labels: ["Sadness", "Joy", "Love", "Anger", "Fear", "Surprise"],
		dataLabels: {
			enabled: false
		},
		colors: ['#008ffb', '#FFC833', '#FF33A6', '#ff5733', '#775dd0', '#964B00'],
		chart: {
			type: 'donut',
		},
		legend: {
			fontSize: '24px',
			customLegendItems: ["Sadness", "Joy", "Love", "Anger", "Fear", "Surprise"],
		},
		horizontalAlign: 'left',
		stroke: {
			show: false
		},

		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
			}
		}]
	};

	useEffect(() => {

		(async () => {
			let info = infos;
			if (!infos) {
				info = await searchSong(songName, config.API_KEY);
				console.log(info);
				setInfos(info);
			} else {
				info = infos;
			};
			console.log(info.lyrics);
			console.log("Fetching emotions...")
			const response = await fetch('http://localhost:3001/getEmotions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ lyrics: info.lyrics })
			});

			const reader = response.body.getReader();
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunkAsString = new TextDecoder("utf-8").decode(value);
				const chunkAsJson = JSON.parse(chunkAsString);
				console.log(chunkAsJson)
				setEmotions(Object.values(chunkAsJson));
				console.log('Current average:', chunkAsJson);
			};
			console.log('Done')
		})();
	}, []);

	return (
		<div>
			<IconMenu />
			<div
				style={{
					backgroundColor: 'rgba(255, 255, 255, 0.4)',
					backdropFilter: 'blur(10px)',
					borderRadius: '8px',
					width: "50%",
					marginLeft: "25%",
					padding: "40px",
					marginTop: "5%",
				}}
			>

				{<h1 className="animate-character">
					{songName}
				</h1>}

				{emotions.length != 0 ? <Chart
					style={{
						marginLeft: "25%",
						width: "60%",
					}}
					options={options}
					series={emotions}
					type="donut"
				/> : <Spin indicator={<LoadingOutlined style={{ fontSize: 180 }} spin />} />}

			</div>
		</div>
	);
};

export default SongPage;
