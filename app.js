const express = require('express');
const https = require("https");

const app = express();

app.get("/", (req, res) => {
    const url = "https://api.kanye.rest";
    https.get(url, (response) => {
        console.log(response.statusCode);

        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const quote = JSON.parse(data).quote;
            const randomColor = getRandomColor(); // Get a random color

            res.send(`
        <h1 style="text-align:center; margin-top:150px;">Kanye West Quotes using API</h1>
        <p style="text-align:center; color:${randomColor}; font-size:24px;">${quote}</p>
      `);
        });
    }).on("error", (error) => {
        console.error("Error occurred:", error);
        res.status(500).send("An error occurred while fetching the quote.");
    });
});

app.listen(3000, () => {
    console.log("Server is up and running on port 3000.");
});

// Helper function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
