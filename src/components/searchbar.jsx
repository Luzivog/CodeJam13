import React from 'react';
import { Input, Space, ConfigProvider } from 'antd';
const { Search } = Input;
import searchSong from '../utils/searchSong';
import config from '../config';
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const navigate = useNavigate();
    const onSearch = async (value, _e, info) => {

        console.log("Fetching song infos...")
        const infos = await searchSong(value, config.API_KEY);
        navigate(`/song?id=${infos.id}`, { state: { infos } });
    };  
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        fontSize: 20,

                        colorBgContainer: "rgba(0, 0, 0, 0);",

                    },
                },
            }}
        >
            <Search
                placeholder="Blinding Lights"
                onSearch={onSearch}
                enterButton="Search"
                size="large"
                style={{
                    width: "60%",
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                }}
            />
        </ConfigProvider>
    )
}

export default SearchBar;