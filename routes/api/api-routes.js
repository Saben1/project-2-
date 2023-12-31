const router = require('express').Router();
const axios = require('axios');


// Route for searching books by type from API
router.get('/type', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchType = req.query.type; // Get the search type from the query parameters

        const url = 'https://www.googleapis.com/books/v1/volumes';

        const params = {
            q: `categories:${searchType}`, 
            key: apiKey
        };

        const response = await axios.get(url, { params });

        const books = response.data.items; 

        // Process the books as needed
        res.json(books); // Return the books as a JSON response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for searching books by author or book name from API
router.get('/searchbyname', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchQuery = req.params.id; // Get the search query from the query parameters

        const url = 'https://www.googleapis.com/books/v1/volumes';

        const params = {
            q: `inauthor:${searchQuery}+OR+intitle:${searchQuery}`, // Search by author or book name
            key: apiKey
        };

        const response = await axios.get(url, { params });

        const books = response.data.items; // Extract the books from the API response

        res.json(books); // Return the books as a JSON response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/// Route for searching a book by book ID from API
router.get('/id', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const bookId = req.query.bookId; // Get the book ID from the query parameters

        const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

        const params = {
            key: apiKey
        };

        const response = await axios.get(url, { params });

        const book = response.data; // Extract the book from the API response
       
        res.json(book); // Return the book as a JSON response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;