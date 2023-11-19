import React, {useEffect, useState} from 'react';
import { Input, Space, ConfigProvider } from 'antd';
const { Search } = Input;
import searchSong from '../utils/searchSong';
import config from '../config';
import { useNavigate } from "react-router-dom";
import './seachbar.css';


const SearchBar = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState('normal');
    const [loading, setLoading] = useState(false);

    const onSearch = async (value, _e, info) => {
        console.log("Fetching song infos...")
        setLoading(true);
        const infos = await searchSong(value, config.API_KEY);
        setLoading(false);
        if (!infos) {
            setStatus('error');
            setTimeout(() => setStatus('normal'), 500);
            return;
        };
        navigate(`/song?songName=${infos.title}`, { state: { infos } });
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
                status={status}
                style={{
                    width: "60%",
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    animation: status === 'error' ? 'shake 0.5s' : 'none',
                }}
                loading={loading}
            />
        </ConfigProvider>
    )
}

export default SearchBar;