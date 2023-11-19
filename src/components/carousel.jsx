import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const cardStyles = {
    container: {
        width: "50%",
        paddingBottom: "40px",
        marginTop: "2%",
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        display: 'flex',
        padding: '20px'
    },
    image: {
        width: '80%',
        height: 'auto',
        alignSelf: 'center',
        margin: '0 auto',
        borderRadius: '8px',
    },
    title: {
        margin: '10px 0',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    artist: {
        fontSize: '14px',
        color: '#555',
    }
};

const Carousel = ({songs}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div style={cardStyles.container}>
                <Slider {...settings}>
                        {songs.slice(0,15).map((song, index) => (
                            <div key={index} style={cardStyles.card}>
                                <img 
                                    src={song.albumArt} 
                                    alt={`${song.artist_name} album art`} 
                                    style={cardStyles.image}
                                />
                                <h3 style={cardStyles.title}>{song.title}</h3>
                            </div>
                        ))}
                </Slider>
            </div>
    );
};

export default Carousel;
