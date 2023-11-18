// import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, ConfigProvider } from 'antd';
const { Search } = Input;
import searchSong from '../utils/searchSong';
const SearchBar = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
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