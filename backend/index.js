const express = require("express");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors(
    {
        origin: '*'
    }

));

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/api/fetch", async (req, res) => {
    const originalUrl = req.query.url;
    console.log(originalUrl);
    const url =
        `https://webcache.googleusercontent.com/search?q=cache:${originalUrl}&strip=0&vwsrc=1`;

    try {
        const response = await fetch(url);
        const html = await response.text();

        res.send(html);
    } catch (error) {
        console.error(`Error fetching HTML content: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
