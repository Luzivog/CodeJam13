import React from 'react';
import PieChart from '../components/donut';
const SongPage = () => {
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
      <h1>Song Page</h1>
      <h1 className="song-title">
        Blinding Lights
      </h1>
      
      <PieChart />
      {/* Add song details here */}
    </div>
  );
};

export default SongPage;