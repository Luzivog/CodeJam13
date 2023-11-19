import React from 'react';
import SearchBar from '../components/searchbar';
import SearchCarousel from '../components/carousel';
import { Carousel } from 'antd';
import Recommended from '../components/carousel';

const SearchPage = () => {

    return (
        <>
            <div style={{
                marginTop: "5%",
                width: "50%",
                marginLeft: "25%",
                backgroundColor: 'rgba(255, 255, 255, 0.4)', // Soft Blue with 50% opacity
                backdropFilter: 'blur(10px)', // Frosted glass blur effect
                borderRadius: '8px', // Rounded corners
                // padding: "120px 0 0 120px"
                paddingTop: "40px",
                paddingBottom: "120px",
            }}>
                <h1 style={{
                    fontSize: "75px", /* Adjust the font size as needed */
                    fontFamily: "Roboto",
                    // color: #333; /* Change the color of the title */
                    // marginBottom: "40px" /* Adds space between title and search bar */


                }}>
                    Search Jam
                </h1>
                <SearchBar />

            </div>
            <div
                style={{
                    marginTop: "5%",
                    marginLeft: "20%",
                    marginRight: "20%",
                    // marginBottom: "10%",
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Soft Blue with 50% opacity
                    backdropFilter: 'blur(10px)', // Frosted glass blur effect
                    borderRadius: '8px', // Rounded corners
                    // center the contents
                }}
            >
                <div
                    style={{
                       
                        paddingTop: "40px", // Adjust the padding as needed
                        paddingLeft: "40px",
                        paddingRight: "40px",
                    }}
                >
                    <Recommended />
                </div>
            </div>
        </>
    )
}

export default SearchPage;