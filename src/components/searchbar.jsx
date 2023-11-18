// import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, ConfigProvider } from 'antd';
const { Search } = Input;
import searchSong from '../utils/searchSong';
import getEmotionsFromQuery from '../utils/getEmotionsFromQuery';
import config from '../config';

const SearchBar = () => {
    const onSearch = async (value, _e, info) => {
        const infos = await searchSong(value, config.API_KEY);
        const emotions = await getEmotionsFromQuery(infos.lyrics);
        for (const emotion in emotions) emotions[emotion] = Math.round(emotions[emotion] * 10000)/100;
        console.log(infos, emotions)
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