import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import baseSongs from '../data.json';
import IconMenu from '../components/menu';

const styles = {
    songItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        margin: '10px auto',
        padding: '10px',
        width: 'max-content',
        maxWidth: '90%',
    },
    albumArt: {
        width: '60px',
        height: '60px',
        borderRadius: '5px',
        marginRight: '15px',
    },
    songInfo: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    songTitle: {
        margin: '0',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    artistName: {
        margin: '5px 0 0',
        fontSize: '14px',
    },
    noSongsMessage: {
        textAlign: 'center',
        marginTop: '50px',
        fontSize: '20px',
        color: '#606060',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        letterSpacing: '0.5px',
    },
    emotionButton: {
        padding: '15px 30px',
        margin: '10px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        fontSize: '18px',
    },
    dataPageContainer: {
        textAlign: 'center', 
        marginTop: '20px'
    }
};

const SongItem = ({ song }) => {
    return (
        <div style={styles.songItem}>
            <img src={song.albumArt} alt={song.title} style={styles.albumArt} />
            <div style={styles.songInfo}>
                <h3 style={styles.songTitle}>{song.title}</h3>
                <p style={styles.artistName}>{song.artist_name}</p>
            </div>
        </div>
    );
};

const NoSongsMessage = () => {
    return (
        <div style={styles.noSongsMessage}>
            <p>No songs match your emotions. Try different filters!</p>
        </div>
    );
};

const DataPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const [emotions, setEmotions] = useState({
        sadness: false,
        joy: false,
        love: false,
        anger: false,
        fear: false,
        surprise: false
    });

    const [displayedSongs, setDisplayedSongs] = useState([]);
    const [lastIndex, setLastIndex] = useState(0);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        const filteredSongs = baseSongs.filter(song => {
            for (const emotion in emotions) {
                if (emotions[emotion] && song.emotions[emotion] < 30) return false;
            };
            return true;
        });

        setDisplayedSongs(filteredSongs.slice(0, 20));
        setLastIndex(20);
    }, [emotions]);

    const loadMoreSongs = () => {
        const nextSongs = baseSongs.slice(lastIndex, lastIndex + 20);
        setDisplayedSongs(prevSongs => [...prevSongs, ...nextSongs]);
        setLastIndex(prevIndex => prevIndex + 20);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMoreSongs();
            }
        }, { threshold: 1.0 });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [lastIndex]);

    const handleToggle = (emotion) => {
        setEmotions(prevEmotions => ({
            ...prevEmotions,
            [emotion]: !prevEmotions[emotion]
        }));
    };

    return (
        <div style={styles.dataPageContainer}>
            <IconMenu />
            {Object.keys(emotions).map((emotion, index) => (
                <button 
                    key={index} 
                    onClick={() => handleToggle(emotion)}
                    style={{
                        ...styles.emotionButton,
                        backgroundColor: emotions[emotion] ? '#4CAF50' : '#f44336',
                        color: 'white',
                    }}
                    onMouseOver={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'}
                    onMouseOut={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
                >
                    {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </button>
            ))}
            <div style={{'paddingBottom': '2%'}}>
                {displayedSongs.length > 0 
                    ? displayedSongs.map(song => <SongItem key={song.title} song={song} />)
                    : <NoSongsMessage />
                }
                <div ref={loadMoreRef} style={{ height: '20px', margin: '10px' }}></div>
            </div>
        </div>
    );
};

export default DataPage;
