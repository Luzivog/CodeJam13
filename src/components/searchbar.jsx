// import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, ConfigProvider } from 'antd';
const { Search } = Input;
import searchSong from '../utils/searchSong';
import getEmotionsFromQuery from '../utils/getEmotionsFromQuery';
import config from '../config';
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    // const history = useNavigate();
    const navigate = useNavigate();
    const onSearch = async (value, _e, info) => {

        console.log("Fetching song infos...")
        const infos = await searchSong(value, config.API_KEY);
        console.log(infos);

        navigate(`/song?id=${infos.id}`, { state: { infos } });

        if (!infos) return console.log("No song found");

        //go to url with song id using react-router 


        // console.log("Fetching emotions...")
        // const response = await fetch('http://localhost:3001/getEmotions', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json',},
        //     body: JSON.stringify({ lyrics: infos.lyrics })
        // });

        // const reader = response.body.getReader();
        // while(true) {
        //     const {done, value} = await reader.read();
        //     if (done) break;

        //     const chunkAsString = new TextDecoder("utf-8").decode(value);
        //     console.log(chunkAsString)
        //     const chunkAsJson = JSON.parse(chunkAsString);
        //     console.log('Current average:', chunkAsJson);
        // };
        // console.log('Done')
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        fontSize: 20,
                        // lineHeight: "80px",
                        // activeBg: "#a641411f",
                        colorBgContainer: "rgba(0, 0, 0, 0);",

                    },
                },
            }}
        >
            <Search
                placeholder="Blinding Lights"
                // allowClear
                onSearch={onSearch}
                enterButton="Search"
                size="large"
                style={{
                    // height: "40px",
                    width: "60%",
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Soft Blue with 50% opacity
                    backdropFilter: 'blur(10px)', // Frosted glass blur effect
                    borderRadius: '8px', // Rounded corners
                    // padding: '8px', // Padding for the input
                }}
            />
        </ConfigProvider>
    )
}

export default SearchBar;