import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5500',
    })
);

app.get('/api/events', async (req, res) => {
    try {
        const response = await fetch('https://api.meetup.com/Perth-Django-Users-Group/events/');
        const events = await response.json();

        res.json(events)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
