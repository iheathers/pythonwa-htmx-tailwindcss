import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { marked } from 'marked';
import he from 'he'; // HTML entity decoder

const app = express();

app.use(
    cors({
        origin: ['http://localhost:5000', 'https://pythonwa-htmx-tailwindcss-1.onrender.com'],
    })
);

console.log("again")

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


/**
 * Format timestamp and UTC offset into the desired format
 * @param {number} timestamp - Timestamp in milliseconds
 * @param {number} utcOffset - UTC offset in milliseconds
 * @returns {string} - Formatted date and time
 */
function formatTimeToGmtWithOffset(timestamp) {
    // Convert the timestamp from milliseconds to a Date object
    const date = new Date(timestamp);

    const options = {
        timeZone: 'Etc/GMT-8', // Direct GMT+8 representation
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);

    // Append the GMT+8 label
    return `${formattedDate} GMT+8`;
}


/**
 * Format venue details
 * @param {object} venue - Venue object
 * @returns {string} - Formatted venue string
 */
function formatVenue(venue) {
    if (venue && venue.name && venue.address_1) {
        return `${venue.name} @ ${venue.address_1}`;
    }
    return "Venue details unavailable";
}

app.get('/api/events', async (req, res) => {
    try {
        // Fetch events from the Meetup API
        const response = await fetch('https://api.meetup.com/Perth-Django-Users-Group/events/');
        const events = await response.json();

        // Process events to decode and parse descriptions
        const parsedEvents = events.map(event => {
            const decodedDescription = he.decode(event.description || ''); // Decode HTML entities

            // console.log("Decoded Description:", decodedDescription);

            const parsedDescription = convertMarkdown(decodedDescription); // Convert Markdown to HTML

            // console.log("Parsed Description:", parsedDescription);

            const formattedTime = formatTimeToGmtWithOffset(event.time, event.utc_offset);
            const formattedVenue = formatVenue(event.venue);

            return {
                ...event,
                description: parsedDescription,
                time: formattedTime,
                venue: formattedVenue,
            };
        });

        res.json(parsedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
