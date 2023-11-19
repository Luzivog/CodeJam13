import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineDatabase } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import './menu.css'; // Import the CSS file

const IconMenu = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseEnter = (iconName) => {
    setHoveredIcon(iconName);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <div className="iconContainer">
      <Link 
        to="/" 
        className={`icon ${hoveredIcon === 'home' ? 'hovered' : ''}`}
        onMouseEnter={() => handleMouseEnter('home')}
        onMouseLeave={handleMouseLeave}
      >
        <AiOutlineHome size={45}/>
      </Link>
      <Link 
        to="/song" 
        className={`icon ${hoveredIcon === 'music' ? 'hovered' : ''}`}
        onMouseEnter={() => handleMouseEnter('music')}
        onMouseLeave={handleMouseLeave}
      >
        <BsMusicNoteBeamed size={45}/>
      </Link>
      <Link 
        to="/suggest" 
        className={`icon ${hoveredIcon === 'database' ? 'hovered' : ''}`}
        onMouseEnter={() => handleMouseEnter('database')}
        onMouseLeave={handleMouseLeave}
      >
        <AiOutlineDatabase size={45}/>
      </Link>
    </div>
  );
};

export default IconMenu;
