module.exports = getEmotionsFromQuery = async (lyrics) => {
    try {
        const response = await fetch('http://localhost:3001/getEmotions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lyrics }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};