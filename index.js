const express = require('express');
const geoip = require('geoip-lite');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    const geo = geoip.lookup(ip);

    console.log(ip)

    if (!geo) {
        res.redirect(302, 'https://tw.verifiedowl.com');
    } else {
        const country = geo.country;
        let redirectUrl = '';

        switch (country) {
            case 'TW':
                redirectUrl = 'https://tw.verifiedowl.com'/* + req.url*/;
                break;

            default:
                redirectUrl = 'https://tw.verifiedowl.com'/* + req.url*/; // 默认情况
        }

        res.redirect(302, redirectUrl);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});