import SearchBar from '../components/searchbar';
import Slider from 'react-slick'; // Import the carousel component
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import songs from '../data.json';

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full view height
        overflow: 'hidden', // Prevent scrolling
    },
    searchContainer: {
        width: "50%",
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: "40px 0",
    },
    carouselContainer: {
        width: "50%", // Set the width to 50% to match the searchContainer
        paddingBottom: "40px",
        marginTop: "2%",
    },
    title: {
        fontSize: "75px",
        fontFamily: "Roboto",
        marginBottom: "40px",
    },
};


const cardStyles = {
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


const Home = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.searchContainer}>
                <h1 style={styles.title}>Search Jam</h1>
                <SearchBar />
            </div>
            <div style={styles.carouselContainer}>
                <Slider {...settings}>
                        {songs.slice(0,15).map((song, index) => (
                            <div key={index} style={cardStyles.card}>
                                <img 
                                    src={song.albumArt} 
                                    alt={`${song.artist_name} album art`} 
                                    style={cardStyles.image}
                                />
                                <h3 style={cardStyles.title}>{song.title}</h3>
                                <p style={cardStyles.artist}>{song.artist_name}</p>
                            </div>
                        ))}
                </Slider>
            </div>
        </div>
    );
}

export default Home;
