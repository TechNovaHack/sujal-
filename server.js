require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.YOUR_GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Gemini API call failed.' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
