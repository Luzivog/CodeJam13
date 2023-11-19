import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from "react-apexcharts";

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import config from '../config';
import "./SongPage.css";

const SongPage = () => {

  const location = useLocation();
  const [infos, setInfos] = useState(location.state?.inf); // [title, artist, lyrics
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
    // position: 'bottom'
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
    //async wrapper
    (async () => {
      // if infos is empty
      var inf = location.state?.infos;
      if (!inf) {
        inf = await searchSong(id, config.API_KEY);
        setInfos(inf);
      }
      console.log("INFOS:")
      console.log(inf)


      console.log("Fetching emotions...")
      const response = await fetch('http://localhost:3001/getEmotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ lyrics: inf.lyrics })
      });

      const reader = response.body.getReader();
      var i = 0
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkAsString = new TextDecoder("utf-8").decode(value);
        if (chunkAsString.split('\n')[1] != "") {
          console.log(chunkAsString.split('\n')[1])
          const chunkAsJson = JSON.parse(chunkAsString.split('\n')[1]);
          setEmotions(Object.values(chunkAsJson));
        } else {
          console.log(chunkAsString.split('\n')[0])
          const chunkAsJson = JSON.parse(chunkAsString.split('\n')[0]);
          setEmotions(Object.values(chunkAsJson));
        }
      };
      console.log('Done')
    })();
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Soft Blue with 50% opacity
        backdropFilter: 'blur(10px)', // Frosted glass blur effect
        borderRadius: '8px', // Rounded corners
        width: "50%",
        marginLeft: "25%",
        padding: "40px",
        marginTop: "5%",
      }}
    >

      {infos && <h1 className="animate-character">
        {infos.title}
      </h1>}

      {/* <PieChart /> */}
      {emotions.length != 0 ? <Chart
        style={{
          marginLeft: "25%",
        }}
        options={options}
        series={emotions}
        type="donut"
        width="500"
      /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 180 }} spin />} />}

      {/* Add song details here */}
    </div>
  );
};

export default SongPage;
