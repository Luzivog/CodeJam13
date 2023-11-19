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
  const [infos, setInfos] = useState(location.state?.infos);
  const [emotions, setEmotions] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  var options = {
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
    colors: ['#008ffb', '#00D8B6', '#feb019', '#ff4560', '#775dd0', '#00e396'],
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

      const infos = location.state?.infos;
      if (!infos) {
        infos = await searchSong(id, config.API_KEY);
        setInfos(infos);
      };
      console.log("Fetching emotions...")
      const response = await fetch('http://localhost:3001/getEmotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ lyrics: infos.lyrics })
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

        {infos && <h1 className="animate-character">
          {infos.title}
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
