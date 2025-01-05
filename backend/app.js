import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { marked } from 'marked';
import he from 'he'; // HTML entity decoder

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5500',
    })
);

// Regex patterns
const P_PATTERN = /<p>(.+?)<\/p>/g;
const URL_PATTERN = /(<a href="((http|https):\/\/)?[a-zA-Z0-9./?:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9.&/?:@\-_=#]+)]\(((http|https):\/\/)?[a-zA-Z0-9./?:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9.&/?:@\-_=#]+)" class="linkified">)/g;
const END_URL_PATTERN = /<\/a>\)/g;

/**
 * Convert Markdown and fix HTML in the description
 * @param {string} mdText - Markdown text
 * @returns {string} - Converted HTML
 */
function convertMarkdown(mdText) {
    // Decode any HTML entities
    const decodedText = he.decode(mdText);

    // Extract paragraphs based on P_PATTERN
    const paragraphs = [...decodedText.matchAll(P_PATTERN)];
    let html = "";

    paragraphs.forEach(match => {
        let mdPara = match[1]; // Extract the group inside <p>...</p>

        // Replace URL patterns
        let fixedMd = mdPara.replace(URL_PATTERN, ""); // Remove the <a> href part
        fixedMd = fixedMd.replace(END_URL_PATTERN, ")"); // Fix closing parentheses

        // Convert to HTML using marked
        const htmlContent = marked.parse(fixedMd);
        html += htmlContent + "\n";
    });

    return html;
}

app.get('/api/events', async (req, res) => {
    try {
        // Fetch events from the Meetup API
        const response = await fetch('https://api.meetup.com/Perth-Django-Users-Group/events/');
        const events = await response.json();

        // Process events to decode and parse descriptions
        const parsedEvents = events.map(event => {
            const decodedDescription = he.decode(event.description || ''); // Decode HTML entities

            console.log("Decoded Description:", decodedDescription);

            const parsedDescription = convertMarkdown(decodedDescription); // Convert Markdown to HTML

            console.log("Parsed Description:", parsedDescription);

            return {
                ...event,
                description: parsedDescription,
            };
        });

        res.json(parsedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
