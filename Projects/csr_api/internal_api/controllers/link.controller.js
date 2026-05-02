const Link = require("../models/Link");
const getRequestBody = require("../helpers/bodyParser");

function generateShortCode(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i<length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}

async function shortenUrl(req, res) {
    try {
        const body = await getRequestBody(req);

        if (!body.originalUrl) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Original URL is required" }));
        }

        let shortCode = generateShortCode();

        while (await Link.findOne({ shortCode })) {
            shortCode = generateShortCode();
        }

        const newLink = await Link.create({
            originalUrl: body.originalUrl,
            shortCode,
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newLink));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error", error: error.message }));
    }
}

async function getAllLinks(req, res) {
    try{
        const link = await Link.find().sort({ createdAt: -1});

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(link));
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error", error: error.message}));
    }
}

async function getLinkAnalytics(req, res, code){
    try{
        const link = await Link.findOne({ shortCode: code});

        if(!link){
            res.writeHead(404, { "Content-Type": "application/json"});
            return res.end(JSON.stringify({message: "Short link not found"}));
        }

        res.writeHead(200, {"Content-Type": "application/json" });
        res.end(JSON.stringify(link));
    }
    catch(error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error", error: error.message }));
    }
}

async function redirectToOriginal(req, res, code) {
    try{
        const link = await Link.findOne({ shortCode: code });

        if (!link) {
            res.writeHead(404, { "Content-type": "text/plain" });
            return res.end("Short Url not found");
        }
        link.clicks += 1;
        await link.save();

        res.writeHead(302, {Location: link.originalUrl });
        res.end();
    }catch (error) {
        res.writeHead(500, {"Content-Type": "text/plain" });
        res.end("Server error");
    }
}

module.exports = {
  shortenUrl,
  getAllLinks,
  getLinkAnalytics,
  redirectToOriginal,
};