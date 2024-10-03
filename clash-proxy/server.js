import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';  // Import the CORS middleware

const app = express();
const PORT = process.env.PORT || 3000;

const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk5OTUxZTg0LTliYTEtNGVhYS04NGQyLTkxMzZlNzI5Mzg1YyIsImlhdCI6MTcyNzkyMjc0OSwic3ViIjoiZGV2ZWxvcGVyLzQyMTE2MTJmLWU0MWItZTI3My0xM2MxLTBmMGY4YzRiZWI2NCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIwLjQyLjExLjIzIl0sInR5cGUiOiJjbGllbnQifV19.ioLNAIeABdi9IRQO2SaqZC_02uxdOoAQvIVfr39RpMN52Jrlxme1dstKMBZaHQIyhoI_SljeHueQLAtFyUCREQ';
const apiUrl = 'https://api.clashofclans.com/v1/clans/%23YGQGCLRP/members';

// Enable CORS only for your frontend origin
// app.use(cors({
//     origin: 'https://turbo-space-couscous-659xgq64774hr79w-5500.app.github.dev'  // Allow requests from this origin
// }));

app.use(cors()); // Allow all origins temporarily


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Clash of Clans Proxy Server!');
});

// Clan Members route
app.get('/clan-members', async (req, res) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            let html = '<h1>Clan Members</h1><ul>';
            data.items.forEach(member => {
                html += `<li><strong>Name:</strong> ${member.name} | <strong>Role:</strong> ${member.role} | <strong>Level:</strong> ${member.expLevel} | <strong>Trophies:</strong> ${member.trophies}</li>`;
            });
            html += '</ul>';
            res.send(html);
        } else {
            // Log detailed error information
            const errorText = await response.text();
            console.error('Error fetching data:', response.status, errorText);
            res.status(response.status).send(`Error fetching data from Clash of Clans API: ${errorText}`);
        }
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).send('Server Error: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});