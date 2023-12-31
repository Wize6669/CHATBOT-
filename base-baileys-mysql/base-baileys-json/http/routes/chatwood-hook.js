const express = require('express');
const router = express.Router();
const { createReadStream } = require('fs');
const { join } = require('path');

// Controller
const home = async (req, res) => {
    res.status(200).send("Home");
};
const chatWoodHook = async (req, res) => {
    const providerWhatSapp = req.providerWhatSapp;
    const body = req.body;
    if(body?.private) {
        res.send(null);
        return;
    }
    const phone = body?.conversation?.meta?.sender?.phone_number.replace('+', '');
    await providerWhatSapp.sendText(`${phone}@c.us`, body.content);
    res.status(200).send(body);
};

// Routes
router.get('/', home);
router.post('/chat-wood-hook', chatWoodHook);
router.get("/get-qr", async (_, res) => {
    const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(YOUR_PATH_QR);

    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
});

module.exports = router;