const sendRequest = async () => {
    const question = 'What is your question?'; // Example question

    try {
        const response = await fetch('http://localhost:3000/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data);
        // Process response as needed
    } catch (error) {
        console.error('Error handling response:', error);
    }
};

// Example usage
sendRequest();

