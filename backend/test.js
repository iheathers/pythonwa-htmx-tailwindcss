import { marked } from 'marked'; // Markdown parser
import { JSDOM } from 'jsdom'; // Optional: For better sanitization
import he from 'he'; // HTML entity decoder

// Patterns equivalent to the Python regex
const P_PATTERN = /<p>(.+?)<\/p>/g;
const URL_PATTERN = /(<a href="((http|https):\/\/)?[a-zA-Z0-9./?:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9.&/?:@\-_=#]+)]\(((http|https):\/\/)?[a-zA-Z0-9./?:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9.&/?:@\-_=#]+)" class="linkified">)/g;
const END_URL_PATTERN = /<\/a>\)/g;

/**
 * Convert Markdown to HTML
 * @param {string} mdText - Markdown text
 * @returns {string} - Converted HTML
 */
function convertMarkdown(mdText) {
    // Decode any HTML entities (similar to Python's HTML parsing step)
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

// Example usage
const mdText = `<p>Welcome to our February Python WA meetup!<br/>We welcome Python enthusiasts of all skill levels. We'll be starting off with food and beverages at 5:30 pm, with talks beginning at 6pm.</p>
<p>**Talk 1: TBC**<br/>*by TBC*</p>
<p>**Thanks to our food and beverage sponsor: [<a href="https://horizondigital.au/](https://horizondigital.au/" class="linkified">https://horizondigital.au/](https://horizondigital.au/</a>)**</p>`;
console.log(convertMarkdown(mdText));
