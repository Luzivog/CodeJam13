import SearchBar from '../components/searchbar';
import songs from '../data.json';
import Carousel from '../components/carousel';
import IconMenu from '../components/menu';


const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'hidden',
    },
    searchContainer: {
        width: "50%",
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        paddingBottom: "40px",
    },
    title: {
        fontSize: "75px",
        fontFamily: "Roboto",
        marginBottom: "40px",
    },
};

const Home = () => {

    return (
        <div style={styles.mainContainer}>
            <IconMenu />
            <div style={styles.searchContainer}>
                <h1 style={styles.title}>Search Jam</h1>
                <SearchBar />
            </div>
            <Carousel songs={songs} />
        </div>
    );
}

export default Home;
